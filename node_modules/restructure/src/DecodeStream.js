let iconv;
try { iconv = require('iconv-lite'); } catch (error) {}

class DecodeStream {
  constructor(buffer) {
    this.buffer = buffer;
    this.pos = 0;
    this.length = this.buffer.length;
  }

  readString(length, encoding = 'ascii') {
    switch (encoding) {
      case 'utf16le': case 'ucs2': case 'utf8': case 'ascii':
        return this.buffer.toString(encoding, this.pos, (this.pos += length));

      case 'utf16be':
        var buf = Buffer.from(this.readBuffer(length));

        // swap the bytes
        for (let i = 0, end = buf.length - 1; i < end; i += 2) {
          const byte = buf[i];
          buf[i] = buf[i + 1];
          buf[i + 1] = byte;
        }

        return buf.toString('utf16le');

      default:
        buf = this.readBuffer(length);
        if (iconv) {
          try {
            return iconv.decode(buf, encoding);
          } catch (error1) {}
        }

        return buf;
    }
  }

  readBuffer(length) {
    return this.buffer.slice(this.pos, (this.pos += length));
  }

  readUInt24BE() {
    return (this.readUInt16BE() << 8) + this.readUInt8();
  }

  readUInt24LE() {
    return this.readUInt16LE() + (this.readUInt8() << 16);
  }

  readInt24BE() {
    return (this.readInt16BE() << 8) + this.readUInt8();
  }

  readInt24LE() {
    return this.readUInt16LE() + (this.readInt8() << 16);
  }
}

DecodeStream.TYPES = {
  UInt8: 1,
  UInt16: 2,
  UInt24: 3,
  UInt32: 4,
  Int8: 1,
  Int16: 2,
  Int24: 3,
  Int32: 4,
  Float: 4,
  Double: 8
};

for (let key in Buffer.prototype) {
  if (key.slice(0, 4) === 'read') {
    const bytes = DecodeStream.TYPES[key.replace(/read|[BL]E/g, '')];
    DecodeStream.prototype[key] = function() {
      const ret = this.buffer[key](this.pos);
      this.pos += bytes;
      return ret;
    };
  }
}

module.exports = DecodeStream;
