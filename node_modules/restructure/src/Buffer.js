const utils = require('./utils');
const {Number:NumberT} = require('./Number');

class BufferT {
  constructor(length) {
    this.length = length;
  }
  decode(stream, parent) {
    const length = utils.resolveLength(this.length, stream, parent);
    return stream.readBuffer(length);
  }

  size(val, parent) {
    if (!val) {
      return utils.resolveLength(this.length, null, parent);
    }

    return val.length;
  }

  encode(stream, buf, parent) {
    if (this.length instanceof NumberT) {
      this.length.encode(stream, buf.length);
    }

    return stream.writeBuffer(buf);
  }
}

module.exports = BufferT;
