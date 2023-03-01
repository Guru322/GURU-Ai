const {Buffer:BufferT, DecodeStream, EncodeStream, uint8} = require('../');
const should = require('chai').should();
const concat = require('concat-stream');

describe('Buffer', function() {
  describe('decode', function() {
    it('should decode', function() {
      const stream = new DecodeStream(Buffer.from([0xab, 0xff, 0x1f, 0xb6]));
      const buf = new BufferT(2);
      buf.decode(stream).should.deep.equal(Buffer.from([0xab, 0xff]));
      return buf.decode(stream).should.deep.equal(Buffer.from([0x1f, 0xb6]));
  });

    return it('should decode with parent key length', function() {
      const stream = new DecodeStream(Buffer.from([0xab, 0xff, 0x1f, 0xb6]));
      const buf = new BufferT('len');
      buf.decode(stream, {len: 3}).should.deep.equal(Buffer.from([0xab, 0xff, 0x1f]));
      return buf.decode(stream, {len: 1}).should.deep.equal(Buffer.from([0xb6]));
  });
});

  describe('size', function() {
    it('should return size', function() {
      const buf = new BufferT(2);
      return buf.size(Buffer.from([0xab, 0xff])).should.equal(2);
    });

    return it('should use defined length if no value given', function() {
      const array = new BufferT(10);
      return array.size().should.equal(10);
    });
  });

  return describe('encode', function() {
    it('should encode', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0xab, 0xff, 0x1f, 0xb6]));
        return done();
      })
      );

      const buf = new BufferT(2);
      buf.encode(stream, Buffer.from([0xab, 0xff]));
      buf.encode(stream, Buffer.from([0x1f, 0xb6]));
      return stream.end();
    });

    return it('should encode length before buffer', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([2, 0xab, 0xff]));
        return done();
      })
      );

      const buf = new BufferT(uint8);
      buf.encode(stream, Buffer.from([0xab, 0xff]));
      return stream.end();
    });
  });
});
