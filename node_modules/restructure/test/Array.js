const {Array:ArrayT, Pointer, uint8, uint16, DecodeStream, EncodeStream} = require('../');
const should = require('chai').should();
const concat = require('concat-stream');

describe('Array', function() {
  describe('decode', function() {
    it('should decode fixed length', function() {
      const stream = new DecodeStream(Buffer.from([1, 2, 3, 4, 5]));
      const array = new ArrayT(uint8, 4);
      return array.decode(stream).should.deep.equal([1, 2, 3, 4]);
  });

    it('should decode fixed amount of bytes', function() {
      const stream = new DecodeStream(Buffer.from([1, 2, 3, 4, 5]));
      const array = new ArrayT(uint16, 4, 'bytes');
      return array.decode(stream).should.deep.equal([258, 772]);
  });

    it('should decode length from parent key', function() {
      const stream = new DecodeStream(Buffer.from([1, 2, 3, 4, 5]));
      const array = new ArrayT(uint8, 'len');
      return array.decode(stream, {len: 4}).should.deep.equal([1, 2, 3, 4]);
  });

    it('should decode amount of bytes from parent key', function() {
      const stream = new DecodeStream(Buffer.from([1, 2, 3, 4, 5]));
      const array = new ArrayT(uint16, 'len', 'bytes');
      return array.decode(stream, {len: 4}).should.deep.equal([258, 772]);
  });

    it('should decode length as number before array', function() {
      const stream = new DecodeStream(Buffer.from([4, 1, 2, 3, 4, 5]));
      const array = new ArrayT(uint8, uint8);
      return array.decode(stream).should.deep.equal([1, 2, 3, 4]);
  });

    it('should decode amount of bytes as number before array', function() {
      const stream = new DecodeStream(Buffer.from([4, 1, 2, 3, 4, 5]));
      const array = new ArrayT(uint16, uint8, 'bytes');
      return array.decode(stream).should.deep.equal([258, 772]);
  });

    it('should decode length from function', function() {
      const stream = new DecodeStream(Buffer.from([1, 2, 3, 4, 5]));
      const array = new ArrayT(uint8, function() { return 4; });
      return array.decode(stream).should.deep.equal([1, 2, 3, 4]);
  });

    it('should decode amount of bytes from function', function() {
      const stream = new DecodeStream(Buffer.from([1, 2, 3, 4, 5]));
      const array = new ArrayT(uint16, (function() { return 4; }), 'bytes');
      return array.decode(stream).should.deep.equal([258, 772]);
  });

    it('should decode to the end of the parent if no length is given', function() {
      const stream = new DecodeStream(Buffer.from([1, 2, 3, 4, 5]));
      const array = new ArrayT(uint8);
      return array.decode(stream, {_length: 4, _startOffset: 0}).should.deep.equal([1, 2, 3, 4]);
  });

    return it('should decode to the end of the stream if no parent and length is given', function() {
      const stream = new DecodeStream(Buffer.from([1, 2, 3, 4]));
      const array = new ArrayT(uint8);
      return array.decode(stream).should.deep.equal([1, 2, 3, 4]);
  });
});

  describe('size', function() {
    it('should use array length', function() {
      const array = new ArrayT(uint8, 10);
      return array.size([1, 2, 3, 4]).should.equal(4);
    });

    it('should add size of length field before string', function() {
      const array = new ArrayT(uint8, uint8);
      return array.size([1, 2, 3, 4]).should.equal(5);
    });

    return it('should use defined length if no value given', function() {
      const array = new ArrayT(uint8, 10);
      return array.size().should.equal(10);
    });
  });

  return describe('encode', function() {
    it('should encode using array length', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([1, 2, 3, 4]));
        return done();
      })
      );

      const array = new ArrayT(uint8, 10);
      array.encode(stream, [1, 2, 3, 4]);
      return stream.end();
    });

    it('should encode length as number before array', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([4, 1, 2, 3, 4]));
        return done();
      })
      );

      const array = new ArrayT(uint8, uint8);
      array.encode(stream, [1, 2, 3, 4]);
      return stream.end();
    });

    return it('should add pointers after array if length is encoded at start', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([4, 5, 6, 7, 8, 1, 2, 3, 4]));
        return done();
      })
      );

      const array = new ArrayT(new Pointer(uint8, uint8), uint8);
      array.encode(stream, [1, 2, 3, 4]);
      return stream.end();
    });
  });
});
