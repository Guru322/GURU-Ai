const {Boolean, uint8, DecodeStream, EncodeStream} = require('../');
const should = require('chai').should();
const concat = require('concat-stream');

describe('Boolean', function() {
  describe('decode', function() {
    it('should decode 0 as false', function() {
      const stream = new DecodeStream(Buffer.from([0]));
      const boolean = new Boolean(uint8);
      return boolean.decode(stream).should.equal(false);
    });

    return it('should decode 1 as true', function() {
      const stream = new DecodeStream(Buffer.from([1]));
      const boolean = new Boolean(uint8);
      return boolean.decode(stream).should.equal(true);
    });
  });

  describe('size', () =>
    it('should return given type size', function() {
      const stream = new DecodeStream(Buffer.from([0]));
      const boolean = new Boolean(uint8);
      return boolean.size().should.equal(1);
    })
  );

  return describe('encode', function() {
    it('should encode false as 0', function(done) {
      const stream = new EncodeStream;
      const boolean = new Boolean(uint8);
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0]));
        return done();
      })
      );

      boolean.encode(stream, false);
      return stream.end();
    });

    return it('should encode true as 1', function(done) {
      const stream = new EncodeStream;
      const boolean = new Boolean(uint8);
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([1]));
        return done();
      })
      );

      boolean.encode(stream, true);
      return stream.end();
    });
  });
});
