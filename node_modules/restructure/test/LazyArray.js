const {LazyArray, Pointer, uint8, uint16, DecodeStream, EncodeStream} = require('../');
const should = require('chai').should();
const concat = require('concat-stream');

describe('LazyArray', function() {
  describe('decode', function() {
    it('should decode items lazily', function() {
      const stream = new DecodeStream(Buffer.from([1, 2, 3, 4, 5]));
      const array = new LazyArray(uint8, 4);

      const arr = array.decode(stream);
      arr.should.not.be.an.instanceof(Array);
      arr.should.have.length(4);
      stream.pos.should.equal(4);

      arr.get(0).should.equal(1);
      arr.get(1).should.equal(2);
      arr.get(2).should.equal(3);
      arr.get(3).should.equal(4);

      should.not.exist(arr.get(-1));
      return should.not.exist(arr.get(5));
    });

    it('should be able to convert to an array', function() {
      const stream = new DecodeStream(Buffer.from([1, 2, 3, 4, 5]));
      const array = new LazyArray(uint8, 4);

      const arr = array.decode(stream);
      return arr.toArray().should.deep.equal([1, 2, 3, 4]);
  });

    it('should have an inspect method', function() {
      const stream = new DecodeStream(Buffer.from([1, 2, 3, 4, 5]));
      const array = new LazyArray(uint8, 4);

      const arr = array.decode(stream);
      return arr.inspect().should.equal('[ 1, 2, 3, 4 ]');
    });

    return it('should decode length as number before array', function() {
      const stream = new DecodeStream(Buffer.from([4, 1, 2, 3, 4, 5]));
      const array = new LazyArray(uint8, uint8);
      const arr = array.decode(stream);

      return arr.toArray().should.deep.equal([1, 2, 3, 4]);
  });
});

  describe('size', () =>
    it('should work with LazyArrays', function() {
      const stream = new DecodeStream(Buffer.from([1, 2, 3, 4, 5]));
      const array = new LazyArray(uint8, 4);
      const arr = array.decode(stream);

      return array.size(arr).should.equal(4);
    })
  );

  return describe('encode', () =>
    it('should work with LazyArrays', function(done) {
      const stream = new DecodeStream(Buffer.from([1, 2, 3, 4, 5]));
      const array = new LazyArray(uint8, 4);
      const arr = array.decode(stream);

      const enc = new EncodeStream;
      enc.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([1, 2, 3, 4]));
        return done();
      })
      );

      array.encode(enc, arr);
      return enc.end();
    })
  );
});
