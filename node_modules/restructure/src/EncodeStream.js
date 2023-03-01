let iconv;
const stream = require('stream');
const DecodeStream = require('./DecodeStream');
try { iconv = require('iconv-lite'); } catch (error) {}

class EncodeStream extends stream.Readable {
  constructor(bufferSize =  65536) {
    super(...arguments);
    this.buffer = Buffer.alloc(bufferSize);
    this.bufferOffset = 0;
    this.pos = 0;
  }

  // do nothing, required by node
  _read() {}

  ensure(bytes) {
    if ((this.bufferOffset + bytes) > this.buffer.length) {
      return this.flush();
    }
  }

  flush() {
    if (this.bufferOffset > 0) {
      this.push(Buffer.from(this.buffer.slice(0, this.bufferOffset)));
      return this.bufferOffset = 0;
    }
  }

  writeBuffer(buffer) {
    this.flush();
    this.push(buffer);
    return this.pos += buffer.length;
  }

  writeString(string, encoding = 'ascii') {
    switch (encoding) {
      case 'utf16le': case 'ucs2': case 'utf8': case 'ascii':
        return this.writeBuffer(Buffer.from(string, encoding));

      case 'utf16be':
        var buf = Buffer.from(string, 'utf16le');

        // swap the bytes
        for (let i = 0, end = buf.length - 1; i < end; i += 2) {
          const byte = buf[i];
          buf[i] = buf[i + 1];
          buf[i + 1] = byte;
        }

        return this.writeBuffer(buf);

      default:
        if (iconv) {
          return this.writeBuffer(iconv.encode(string, encoding));
        } else {
          throw new Error('Install iconv-lite to enable additional string encodings.');
        }
    }
  }

  writeUInt24BE(val) {
    this.ensure(3);
    this.buffer[this.bufferOffset++] = (val >>> 16) & 0xff;
    this.buffer[this.bufferOffset++] = (val >>> 8)  & 0xff;
    this.buffer[this.bufferOffset++] = val & 0xff;
    return this.pos += 3;
  }

  writeUInt24LE(val) {
    this.ensure(3);
    this.buffer[this.bufferOffset++] = val & 0xff;
    this.buffer[this.bufferOffset++] = (val >>> 8) & 0xff;
    this.buffer[this.bufferOffset++] = (val >>> 16) & 0xff;
    return this.pos += 3;
  }

  writeInt24BE(val) {
    if (val >= 0) {
      return this.writeUInt24BE(val);
    } else {
      return this.writeUInt24BE(val + 0xffffff + 1);
    }
  }

  writeInt24LE(val) {
    if (val >= 0) {
      return this.writeUInt24LE(val);
    } else {
      return this.writeUInt24LE(val + 0xffffff + 1);
    }
  }

  fill(val, length) {
    if (length < this.buffer.length) {
      this.ensure(length);
      this.buffer.fill(val, this.bufferOffset, this.bufferOffset + length);
      this.bufferOffset += length;
      return this.pos += length;
    } else {
      const buf = Buffer.alloc(length);
      buf.fill(val);
      return this.writeBuffer(buf);
    }
  }

  end() {
    this.flush();
    return this.push(null);
  }
}

for (let key in Buffer.prototype) {
  if (key.slice(0, 5) === 'write') {
    const bytes = +DecodeStream.TYPES[key.replace(/write|[BL]E/g, '')];
    EncodeStream.prototype[key] = function(value) {
      this.ensure(bytes);
      this.buffer[key](value, this.bufferOffset);
      this.bufferOffset += bytes;
      return this.pos += bytes;
    };
  }
}

module.exports = EncodeStream;
