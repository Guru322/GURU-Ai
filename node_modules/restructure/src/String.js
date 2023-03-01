const {Number:NumberT} = require('./Number');
const utils = require('./utils');

class StringT {
  constructor(length, encoding = 'ascii') {
    this.length = length;
    this.encoding = encoding;
  }

  decode(stream, parent) {
    let length, pos;

    if (this.length != null) {
      length = utils.resolveLength(this.length, stream, parent);
    } else {
      let buffer;
      ({buffer, length, pos} = stream);

      while ((pos < length) && (buffer[pos] !== 0x00)) {
        ++pos;
      }

      length = pos - stream.pos;
    }

    let { encoding } = this;
    if (typeof encoding === 'function') {
      encoding = encoding.call(parent, parent) || 'ascii';
    }

    const string = stream.readString(length, encoding);

    if ((this.length == null) && (stream.pos < stream.length)) {
      stream.pos++;
    }

    return string;
  }

  size(val, parent) {
    // Use the defined value if no value was given
    if (!val) {
      return utils.resolveLength(this.length, null, parent);
    }

    let { encoding } = this;
    if (typeof encoding === 'function') {
      encoding = encoding.call(parent != null ? parent.val : undefined, parent != null ? parent.val : undefined) || 'ascii';
    }

    if (encoding === 'utf16be') {
      encoding = 'utf16le';
    }

    let size = Buffer.byteLength(val, encoding);
    if (this.length instanceof NumberT) {
      size += this.length.size();
    }

    if ((this.length == null)) {
      size++;
    }

    return size;
  }

  encode(stream, val, parent) {
    let { encoding } = this;
    if (typeof encoding === 'function') {
      encoding = encoding.call(parent != null ? parent.val : undefined, parent != null ? parent.val : undefined) || 'ascii';
    }

    if (this.length instanceof NumberT) {
      this.length.encode(stream, Buffer.byteLength(val, encoding));
    }

    stream.writeString(val, encoding);

    if ((this.length == null)) {
      return stream.writeUInt8(0x00);
    }
  }
}

module.exports = StringT;
