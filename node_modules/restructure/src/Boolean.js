class BooleanT {
  constructor(type) {
    this.type = type;
  }

  decode(stream, parent) {
    return !!this.type.decode(stream, parent);
  }

  size(val, parent) {
    return this.type.size(val, parent);
  }

  encode(stream, val, parent) {
    return this.type.encode(stream, +val, parent);
  }
}

module.exports = BooleanT;
