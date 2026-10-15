// --remote-debugging-pipe 위의 CDP. 메시지는 NUL 로 구분한 JSON. flatten 세션 라우팅.

export class CDPError extends Error {
  constructor(message, code = 'CDP_ERROR', data) {
    super(message);
    this.name = 'CDPError';
    this.code = code;
    this.data = data;
  }
}

export class CDP {
  constructor(writable, readable) {
    this.out = writable;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
    this.closed = false;
    this.buf = [];
    readable.on('data', (chunk) => this._onData(chunk));
    const onEnd = () => this._close(new CDPError('브라우저와의 연결이 끊겼다', 'CDP_CLOSED'));
    readable.on('end', onEnd);
    readable.on('close', onEnd);
    readable.on('error', onEnd);
    writable.on('error', onEnd);
  }

  _onData(chunk) {
    let start = 0;
    for (;;) {
      const idx = chunk.indexOf(0, start);
      if (idx < 0) break;
      this.buf.push(chunk.subarray(start, idx));
      const text = Buffer.concat(this.buf).toString('utf8');
      this.buf = [];
      start = idx + 1;
      let msg;
      try {
        msg = JSON.parse(text);
      } catch {
        continue;
      }
      this._dispatch(msg);
    }
    if (start < chunk.length) this.buf.push(chunk.subarray(start));
  }

  _dispatch(msg) {
    if (msg.id !== undefined) {
      const p = this.pending.get(msg.id);
      if (!p) return;
      this.pending.delete(msg.id);
      clearTimeout(p.timer);
      if (msg.error) p.reject(new CDPError(`${p.method}: ${msg.error.message}`, 'CDP_ERROR', msg.error.data));
      else p.resolve(msg.result || {});
      return;
    }
    if (!msg.method) return;
    for (const key of [`${msg.sessionId || ''}|${msg.method}`, `*|${msg.method}`]) {
      const set = this.listeners.get(key);
      if (!set) continue;
      for (const fn of [...set]) {
        try {
          fn(msg.params || {}, msg.sessionId);
        } catch {
          // 리스너 에러는 연결을 깨지 않는다
        }
      }
    }
  }

  _close(err) {
    if (this.closed) return;
    this.closed = true;
    for (const p of this.pending.values()) {
      clearTimeout(p.timer);
      p.reject(err);
    }
    this.pending.clear();
    for (const fn of this.listeners.get('*|__closed') || []) fn(err);
  }

  send(method, params = {}, opts = {}) {
    if (this.closed) return Promise.reject(new CDPError('브라우저와의 연결이 끊겼다', 'CDP_CLOSED'));
    const id = this.nextId++;
    const msg = { id, method, params };
    if (opts.sessionId) msg.sessionId = opts.sessionId;
    const timeout = opts.timeout ?? 30000;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new CDPError(`${method}: ${timeout}ms 안에 응답이 없다`, 'CDP_TIMEOUT'));
      }, timeout);
      timer.unref?.();
      this.pending.set(id, { resolve, reject, timer, method });
      try {
        this.out.write(JSON.stringify(msg) + '\0');
      } catch (e) {
        clearTimeout(timer);
        this.pending.delete(id);
        reject(new CDPError(`쓰기 실패: ${e.message}`, 'CDP_CLOSED'));
      }
    });
  }

  // sessionId 를 주지 않으면('*') 모든 세션의 이벤트를 받는다. 해제 함수를 돌려준다.
  on(method, fn, sessionId = '*') {
    const key = `${sessionId === '*' ? '*' : sessionId || ''}|${method}`;
    if (!this.listeners.has(key)) this.listeners.set(key, new Set());
    this.listeners.get(key).add(fn);
    return () => this.listeners.get(key)?.delete(fn);
  }

  onClose(fn) {
    return this.on('__closed', fn, '*');
  }

  waitFor(method, { sessionId = '*', timeout = 30000, predicate } = {}) {
    return new Promise((resolve, reject) => {
      let off = () => {};
      const timer = setTimeout(() => {
        off();
        reject(new CDPError(`${method} 이벤트를 ${timeout}ms 안에 받지 못했다`, 'CDP_TIMEOUT'));
      }, timeout);
      timer.unref?.();
      off = this.on(
        method,
        (params, sid) => {
          if (predicate && !predicate(params, sid)) return;
          clearTimeout(timer);
          off();
          resolve(params);
        },
        sessionId,
      );
    });
  }

  // 세션에 묶은 얇은 래퍼.
  session(sessionId) {
    return {
      id: sessionId,
      send: (method, params, opts = {}) => this.send(method, params, { ...opts, sessionId }),
      on: (method, fn) => this.on(method, fn, sessionId),
      waitFor: (method, opts = {}) => this.waitFor(method, { ...opts, sessionId }),
    };
  }
}
