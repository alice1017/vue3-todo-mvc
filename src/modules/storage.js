
export class LocalStorageManager {

  constructor(key) {
    this.storage = window.localStorage;
    this.storageKey = key;
  }

  set(object) {
    this.storage.setItem(this.storageKey, this.jsonize(object));
  }

  get() {
    const rawData = this.storage.getItem(this.storageKey);
    return this.jsonish(rawData);
  }

  hasValue() {
    const data = this.get();
    if (data) {
      return true;
    }
    else {
      return false;
    }
  }

  jsonize(object) {
    return JSON.stringify(object);
  }

  jsonish(data) {
    try {
      return JSON.parse(data);
    }
    catch {
      return data;
    }
  }

}
