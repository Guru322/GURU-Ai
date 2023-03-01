const {EncodeStream} = require('../');
const should = require('chai').should();
const concat = require('concat-stream');

describe('EncodeStream', function() {
  it('should write a buffer', function(done) {
    const stream = new EncodeStream;
    stream.pipe(concat(function(buf) {
      buf.should.deep.equal(Buffer.from([1,2,3]));
      return done();
    })
    );

    stream.writeBuffer(Buffer.from([1,2,3]));
    return stream.end();
  });

  it('should writeUInt16BE', function(done) {
    const stream = new EncodeStream;
    stream.pipe(concat(function(buf) {
      buf.should.deep.equal(Buffer.from([0xab, 0xcd]));
      return done();
    })
    );

    stream.writeUInt16BE(0xabcd);
    return stream.end();
  });

  it('should writeUInt16LE', function(done) {
    const stream = new EncodeStream;
    stream.pipe(concat(function(buf) {
      buf.should.deep.equal(Buffer.from([0xab, 0xcd]));
      return done();
    })
    );

    stream.writeUInt16LE(0xcdab);
    return stream.end();
  });

  it('should writeUInt24BE', function(done) {
    const stream = new EncodeStream;
    stream.pipe(concat(function(buf) {
      buf.should.deep.equal(Buffer.from([0xab, 0xcd, 0xef]));
      return done();
    })
    );

    stream.writeUInt24BE(0xabcdef);
    return stream.end();
  });

  it('should writeUInt24LE', function(done) {
    const stream = new EncodeStream;
    stream.pipe(concat(function(buf) {
      buf.should.deep.equal(Buffer.from([0xef, 0xcd, 0xab]));
      return done();
    })
    );

    stream.writeUInt24LE(0xabcdef);
    return stream.end();
  });

  it('should writeInt24BE', function(done) {
    const stream = new EncodeStream;
    stream.pipe(concat(function(buf) {
      buf.should.deep.equal(Buffer.from([0xff, 0xab, 0x24, 0xab, 0xcd, 0xef]));
      return done();
    })
    );

    stream.writeInt24BE(-21724);
    stream.writeInt24BE(0xabcdef);
    return stream.end();
  });

  it('should writeInt24LE', function(done) {
    const stream = new EncodeStream;
    stream.pipe(concat(function(buf) {
      buf.should.deep.equal(Buffer.from([0x24, 0xab, 0xff, 0xef, 0xcd, 0xab]));
      return done();
    })
    );

    stream.writeInt24LE(-21724);
    stream.writeInt24LE(0xabcdef);
    return stream.end();
  });

  it('should fill', function(done) {
    const stream = new EncodeStream;
    stream.pipe(concat(function(buf) {
      buf.should.deep.equal(Buffer.from([10, 10, 10, 10, 10]));
      return done();
    })
    );

    stream.fill(10, 5);
    return stream.end();
  });

  return describe('writeString', function() {
    it('should encode ascii by default', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from('some text', 'ascii'));
        return done();
      })
      );

      stream.writeString('some text');
      return stream.end();
    });

    it('should encode ascii', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from('some text', 'ascii'));
        return done();
      })
      );

      stream.writeString('some text');
      return stream.end();
    });

    it('should encode utf8', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from('unicode! 👍', 'utf8'));
        return done();
      })
      );

      stream.writeString('unicode! 👍', 'utf8');
      return stream.end();
    });

    it('should encode utf16le', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from('unicode! 👍', 'utf16le'));
        return done();
      })
      );

      stream.writeString('unicode! 👍', 'utf16le');
      return stream.end();
    });

    it('should encode ucs2', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from('unicode! 👍', 'ucs2'));
        return done();
      })
      );

      stream.writeString('unicode! 👍', 'ucs2');
      return stream.end();
    });

    it('should encode utf16be', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(out) {
        const buf = Buffer.from('unicode! 👍', 'utf16le');
        for (let i = 0, end = buf.length - 1; i < end; i += 2) {
          const byte = buf[i];
          buf[i] = buf[i + 1];
          buf[i + 1] = byte;
        }

        out.should.deep.equal(buf);
        return done();
      })
      );

      stream.writeString('unicode! 👍', 'utf16be');
      return stream.end();
    });

    return it('should encode macroman', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(out) {
        const buf = Buffer.from([0x8a, 0x63, 0x63, 0x65, 0x6e, 0x74, 0x65, 0x64, 0x20, 0x63, 0x68, 0x87, 0x72, 0x61, 0x63, 0x74, 0x65, 0x72, 0x73]);
        out.should.deep.equal(buf);
        return done();
      })
      );

      stream.writeString('äccented cháracters', 'mac');
      return stream.end();
    });
  });
});
