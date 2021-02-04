class DataMap {
  constructor(m) {
    this.map = new Map(m);
  }

  insert(key, value) {
    this.map.set(key, value);
  }

  alter(f, key) {
    const value = this.map.get(key) || new Nothing();

    this.map.set(key, f(value));
  }

  delete(key) {
    this.map.delete(key);
  }

  lookup(key) {
    return this.map.get(key) || new Nothing();
  }

  size() {
    return this.map.size;
  }
}

class Nothing { }

export default DataMap;
export { Nothing };
