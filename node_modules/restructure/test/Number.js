const {
  uint8,
  uint16, uint16be, uint16le,
  uint24, uint24be, uint24le,
  uint32, uint32be, uint32le,
  int8,
  int16, int16be, int16le,
  int24, int24be, int24le,
  int32, int32be, int32le,
  float, floatbe, floatle,
  double, doublebe, doublele,
  fixed16, fixed16be, fixed16le,
  fixed32, fixed32be, fixed32le,
  DecodeStream, EncodeStream
} = require('../');
const should = require('chai').should();
const concat = require('concat-stream');

describe('Number', function() {
  describe('uint8', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0xab, 0xff]));
      uint8.decode(stream).should.equal(0xab);
      return uint8.decode(stream).should.equal(0xff);
    });

    it('should have a size', () => uint8.size().should.equal(1));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0xab, 0xff]));
        return done();
      })
      );

      uint8.encode(stream, 0xab);
      uint8.encode(stream, 0xff);
      return stream.end();
    });
  });

  describe('uint16', () =>
    it('is an alias for uint16be', () => uint16.should.equal(uint16be))
  );

  describe('uint16be', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0xab, 0xff]));
      return uint16be.decode(stream).should.equal(0xabff);
    });

    it('should have a size', () => uint16be.size().should.equal(2));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0xab, 0xff]));
        return done();
      })
      );

      uint16be.encode(stream, 0xabff);
      return stream.end();
    });
  });

  describe('uint16le', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0xff, 0xab]));
      return uint16le.decode(stream).should.equal(0xabff);
    });

    it('should have a size', () => uint16le.size().should.equal(2));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0xff, 0xab]));
        return done();
      })
      );

      uint16le.encode(stream, 0xabff);
      return stream.end();
    });
  });

  describe('uint24', () =>
    it('is an alias for uint24be', () => uint24.should.equal(uint24be))
  );

  describe('uint24be', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0xff, 0xab, 0x24]));
      return uint24be.decode(stream).should.equal(0xffab24);
    });

    it('should have a size', () => uint24be.size().should.equal(3));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0xff, 0xab, 0x24]));
        return done();
      })
      );

      uint24be.encode(stream, 0xffab24);
      return stream.end();
    });
  });

  describe('uint24le', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0x24, 0xab, 0xff]));
      return uint24le.decode(stream).should.equal(0xffab24);
    });

    it('should have a size', () => uint24le.size().should.equal(3));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0x24, 0xab, 0xff]));
        return done();
      })
      );

      uint24le.encode(stream, 0xffab24);
      return stream.end();
    });
  });

  describe('uint32', () =>
    it('is an alias for uint32be', () => uint32.should.equal(uint32be))
  );

  describe('uint32be', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0xff, 0xab, 0x24, 0xbf]));
      return uint32be.decode(stream).should.equal(0xffab24bf);
    });

    it('should have a size', () => uint32be.size().should.equal(4));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0xff, 0xab, 0x24, 0xbf]));
        return done();
      })
      );

      uint32be.encode(stream, 0xffab24bf);
      return stream.end();
    });
  });

  describe('uint32le', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0xbf, 0x24, 0xab, 0xff]));
      return uint32le.decode(stream).should.equal(0xffab24bf);
    });

    it('should have a size', () => uint32le.size().should.equal(4));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0xbf, 0x24, 0xab, 0xff]));
        return done();
      })
      );

      uint32le.encode(stream, 0xffab24bf);
      return stream.end();
    });
  });

  describe('int8', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0x7f, 0xff]));
      int8.decode(stream).should.equal(127);
      return int8.decode(stream).should.equal(-1);
    });

    it('should have a size', () => int8.size().should.equal(1));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0x7f, 0xff]));
        return done();
      })
      );

      int8.encode(stream, 127);
      int8.encode(stream, -1);
      return stream.end();
    });
  });

  describe('int16', () =>
    it('is an alias for int16be', () => int16.should.equal(int16be))
  );

  describe('int16be', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0xff, 0xab]));
      return int16be.decode(stream).should.equal(-85);
    });

    it('should have a size', () => int16be.size().should.equal(2));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0xff, 0xab]));
        return done();
      })
      );

      int16be.encode(stream, -85);
      return stream.end();
    });
  });

  describe('int16le', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0xab, 0xff]));
      return int16le.decode(stream).should.equal(-85);
    });

    it('should have a size', () => int16le.size().should.equal(2));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0xab, 0xff]));
        return done();
      })
      );

      int16le.encode(stream, -85);
      return stream.end();
    });
  });

  describe('int24', () =>
    it('is an alias for int24be', () => int24.should.equal(int24be))
  );

  describe('int24be', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0xff, 0xab, 0x24]));
      return int24be.decode(stream).should.equal(-21724);
    });

    it('should have a size', () => int24be.size().should.equal(3));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0xff, 0xab, 0x24]));
        return done();
      })
      );

      int24be.encode(stream, -21724);
      return stream.end();
    });
  });

  describe('int24le', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0x24, 0xab, 0xff]));
      return int24le.decode(stream).should.equal(-21724);
    });

    it('should have a size', () => int24le.size().should.equal(3));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0x24, 0xab, 0xff]));
        return done();
      })
      );

      int24le.encode(stream, -21724);
      return stream.end();
    });
  });

  describe('int32', () =>
    it('is an alias for int32be', () => int32.should.equal(int32be))
  );

  describe('int32be', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0xff, 0xab, 0x24, 0xbf]));
      return int32be.decode(stream).should.equal(-5561153);
    });

    it('should have a size', () => int32be.size().should.equal(4));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0xff, 0xab, 0x24, 0xbf]));
        return done();
      })
      );

      int32be.encode(stream, -5561153);
      return stream.end();
    });
  });

  describe('int32le', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0xbf, 0x24, 0xab, 0xff]));
      return int32le.decode(stream).should.equal(-5561153);
    });

    it('should have a size', () => int32le.size().should.equal(4));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0xbf, 0x24, 0xab, 0xff]));
        return done();
      })
      );

      int32le.encode(stream, -5561153);
      return stream.end();
    });
  });

  describe('float', () =>
    it('is an alias for floatbe', () => float.should.equal(floatbe))
  );

  describe('floatbe', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0x43, 0x7a, 0x8c, 0xcd]));
      return floatbe.decode(stream).should.be.closeTo(250.55, 0.005);
    });

    it('should have a size', () => floatbe.size().should.equal(4));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0x43, 0x7a, 0x8c, 0xcd]));
        return done();
      })
      );

      floatbe.encode(stream, 250.55);
      return stream.end();
    });
  });

  describe('floatle', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0xcd, 0x8c, 0x7a, 0x43]));
      return floatle.decode(stream).should.be.closeTo(250.55, 0.005);
    });

    it('should have a size', () => floatle.size().should.equal(4));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0xcd, 0x8c, 0x7a, 0x43]));
        return done();
      })
      );

      floatle.encode(stream, 250.55);
      return stream.end();
    });
  });

  describe('double', () =>
    it('is an alias for doublebe', () => double.should.equal(doublebe))
  );

  describe('doublebe', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0x40, 0x93, 0x4a, 0x3d, 0x70, 0xa3, 0xd7, 0x0a]));
      return doublebe.decode(stream).should.be.equal(1234.56);
    });

    it('should have a size', () => doublebe.size().should.equal(8));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0x40, 0x93, 0x4a, 0x3d, 0x70, 0xa3, 0xd7, 0x0a]));
        return done();
      })
      );

      doublebe.encode(stream, 1234.56);
      return stream.end();
    });
  });

  describe('doublele', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0x0a, 0xd7, 0xa3, 0x70, 0x3d, 0x4a, 0x93, 0x40]));
      return doublele.decode(stream).should.be.equal(1234.56);
    });

    it('should have a size', () => doublele.size().should.equal(8));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0x0a, 0xd7, 0xa3, 0x70, 0x3d, 0x4a, 0x93, 0x40]));
        return done();
      })
      );

      doublele.encode(stream, 1234.56);
      return stream.end();
    });
  });

  describe('fixed16', () =>
    it('is an alias for fixed16be', () => fixed16.should.equal(fixed16be))
  );

  describe('fixed16be', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0x19, 0x57]));
      return fixed16be.decode(stream).should.be.closeTo(25.34, 0.005);
    });

    it('should have a size', () => fixed16be.size().should.equal(2));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0x19, 0x57]));
        return done();
      })
      );

      fixed16be.encode(stream, 25.34);
      return stream.end();
    });
  });

  describe('fixed16le', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0x57, 0x19]));
      return fixed16le.decode(stream).should.be.closeTo(25.34, 0.005);
    });

    it('should have a size', () => fixed16le.size().should.equal(2));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0x57, 0x19]));
        return done();
      })
      );

      fixed16le.encode(stream, 25.34);
      return stream.end();
    });
  });

  describe('fixed32', () =>
    it('is an alias for fixed32be', () => fixed32.should.equal(fixed32be))
  );

  describe('fixed32be', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0x00, 0xfa, 0x8c, 0xcc]));
      return fixed32be.decode(stream).should.be.closeTo(250.55, 0.005);
    });

    it('should have a size', () => fixed32be.size().should.equal(4));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0x00, 0xfa, 0x8c, 0xcc]));
        return done();
      })
      );

      fixed32be.encode(stream, 250.55);
      return stream.end();
    });
  });

  return describe('fixed32le', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0xcc, 0x8c, 0xfa, 0x00]));
      return fixed32le.decode(stream).should.be.closeTo(250.55, 0.005);
    });

    it('should have a size', () => fixed32le.size().should.equal(4));

    return it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0xcc, 0x8c, 0xfa, 0x00]));
        return done();
      })
      );

      fixed32le.encode(stream, 250.55);
      return stream.end();
    });
  });
});
