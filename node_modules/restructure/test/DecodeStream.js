const {DecodeStream} = require('../');
const should = require('chai').should();

describe('DecodeStream', function() {
  it('should read a buffer', function() {
    const buf = Buffer.from([1,2,3]);
    const stream = new DecodeStream(buf);
    return stream.readBuffer(buf.length).should.deep.equal(Buffer.from([1,2,3]));
});

  it('should readUInt16BE', function() {
    const buf = Buffer.from([0xab, 0xcd]);
    const stream = new DecodeStream(buf);
    return stream.readUInt16BE().should.deep.equal(0xabcd);
  });

  it('should readUInt16LE', function() {
    const buf = Buffer.from([0xab, 0xcd]);
    const stream = new DecodeStream(buf);
    return stream.readUInt16LE().should.deep.equal(0xcdab);
  });

  it('should readUInt24BE', function() {
    const buf = Buffer.from([0xab, 0xcd, 0xef]);
    const stream = new DecodeStream(buf);
    return stream.readUInt24BE().should.deep.equal(0xabcdef);
  });

  it('should readUInt24LE', function() {
    const buf = Buffer.from([0xab, 0xcd, 0xef]);
    const stream = new DecodeStream(buf);
    return stream.readUInt24LE().should.deep.equal(0xefcdab);
  });

  it('should readInt24BE', function() {
    const buf = Buffer.from([0xff, 0xab, 0x24]);
    const stream = new DecodeStream(buf);
    return stream.readInt24BE().should.deep.equal(-21724);
  });

  it('should readInt24LE', function() {
    const buf = Buffer.from([0x24, 0xab, 0xff]);
    const stream = new DecodeStream(buf);
    return stream.readInt24LE().should.deep.equal(-21724);
  });

  return describe('readString', function() {
    it('should decode ascii by default', function() {
      const buf = Buffer.from('some text', 'ascii');
      const stream = new DecodeStream(buf);
      return stream.readString(buf.length).should.equal('some text');
    });

    it('should decode ascii', function() {
      const buf = Buffer.from('some text', 'ascii');
      const stream = new DecodeStream(buf);
      return stream.readString(buf.length, 'ascii').should.equal('some text');
    });

    it('should decode utf8', function() {
      const buf = Buffer.from('unicode! 👍', 'utf8');
      const stream = new DecodeStream(buf);
      return stream.readString(buf.length, 'utf8').should.equal('unicode! 👍');
    });

    it('should decode utf16le', function() {
      const buf = Buffer.from('unicode! 👍', 'utf16le');
      const stream = new DecodeStream(buf);
      return stream.readString(buf.length, 'utf16le').should.equal('unicode! 👍');
    });

    it('should decode ucs2', function() {
      const buf = Buffer.from('unicode! 👍', 'ucs2');
      const stream = new DecodeStream(buf);
      return stream.readString(buf.length, 'ucs2').should.equal('unicode! 👍');
    });

    it('should decode utf16be', function() {
      const buf = Buffer.from('unicode! 👍', 'utf16le');
      for (let i = 0, end = buf.length - 1; i < end; i += 2) {
        const byte = buf[i];
        buf[i] = buf[i + 1];
        buf[i + 1] = byte;
      }

      const stream = new DecodeStream(buf);
      return stream.readString(buf.length, 'utf16be').should.equal('unicode! 👍');
    });

    it('should decode macroman', function() {
      const buf = Buffer.from([0x8a, 0x63, 0x63, 0x65, 0x6e, 0x74, 0x65, 0x64, 0x20, 0x63, 0x68, 0x87, 0x72, 0x61, 0x63, 0x74, 0x65, 0x72, 0x73]);
      const stream = new DecodeStream(buf);
      return stream.readString(buf.length, 'mac').should.equal('äccented cháracters');
    });

    return it('should return a buffer for unsupported encodings', function() {
      const stream = new DecodeStream(Buffer.from([1, 2, 3]));
      return stream.readString(3, 'unsupported').should.deep.equal(Buffer.from([1, 2, 3]));
  });
});
});
