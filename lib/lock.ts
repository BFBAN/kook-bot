declare class LockConf {
  key: string;
  maxCount: number;
  nowCount: number;
}

class Lock {
  list: Map<string, LockConf> = new Map();

  conf: LockConf = new LockConf();

  constructor(conf: LockConf) {
    if (conf) {
      this.conf = conf;
    }
  }

  /**
   * 添加
   * @param key
   */
  public push(key: string) {
    // 存在时，在原有增加计表
    if (this.list.has(key)) {
      const _basewaitLockConf: LockConf | undefined = this.list.get(key);
      let _waitUpdateLockConf = new LockConf();

      if (!_basewaitLockConf) {
        return false;
      }

      _waitUpdateLockConf.key = key;
      _waitUpdateLockConf.nowCount = _basewaitLockConf.nowCount += 1;
      _waitUpdateLockConf.maxCount = _basewaitLockConf.maxCount;

      this.list.set(key, _waitUpdateLockConf);
      return true;
    }

    // 不存在，新增记录
    let i = new LockConf();
    i.key = key;
    i.maxCount = 2;
    i.nowCount += 1;
    this.list.set(key, i);
    return true;
  }

  /**
   * 移除
   * @param key
   */
  public rem(key: string) {
    if (!this.list.has(key)) {
      return false;
    }

    this.list.delete(key);
    return true;
  }

  public remAll() {
    this.list.clear();
    return true;
  }

  public keys() {
    return this.list.keys();
  }

  /**
   * 是否上锁
   * @param key
   */
  public isLock(key: any) {
    if (!this.list.has(key)) {
      return false;
    }

    let keyData = this.list.get(key);
    if (keyData && keyData.nowCount > keyData.maxCount) {
      return true;
    }
    return false;
  }
}

export {
  Lock,
  LockConf
};
