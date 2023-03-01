const {Struct, String:StringT, Pointer, uint8, DecodeStream, EncodeStream} = require('../');
const should = require('chai').should();
const concat = require('concat-stream');

describe('Struct', function() {
  describe('decode', function() {
    it('should decode into an object', function() {
      const stream = new DecodeStream(Buffer.from('\x05devon\x15'));
      const struct = new Struct({
        name: new StringT(uint8),
        age: uint8
      });

      return struct.decode(stream).should.deep.equal({
        name: 'devon',
        age: 21
      });
    });

    it('should support process hook', function() {
      const stream = new DecodeStream(Buffer.from('\x05devon\x20'));
      const struct = new Struct({
        name: new StringT(uint8),
        age: uint8
      });

      struct.process = function() {
        return this.canDrink = this.age >= 21;
      };

      return struct.decode(stream).should.deep.equal({
        name: 'devon',
        age: 32,
        canDrink: true
      });
    });

    return it('should support function keys', function() {
      const stream = new DecodeStream(Buffer.from('\x05devon\x20'));
      const struct = new Struct({
        name: new StringT(uint8),
        age: uint8,
        canDrink() { return this.age >= 21; }
      });

      return struct.decode(stream).should.deep.equal({
        name: 'devon',
        age: 32,
        canDrink: true
      });
    });
  });

  describe('size', function() {
    it('should compute the correct size', function() {
      const struct = new Struct({
        name: new StringT(uint8),
        age: uint8
      });

      return struct.size({name: 'devon', age: 21}).should.equal(7);
    });

    it('should compute the correct size with pointers', function() {
      const struct = new Struct({
        name: new StringT(uint8),
        age: uint8,
        ptr: new Pointer(uint8, new StringT(uint8))
      });

      const size = struct.size({
        name: 'devon',
        age: 21,
        ptr: 'hello'
      });

      return size.should.equal(14);
    });

    it('should get the correct size when no value is given', function() {
      const struct = new Struct({
        name: new StringT(4),
        age: uint8
      });

      return struct.size().should.equal(5);
    });

    return it('should throw when getting non-fixed length size and no value is given', function() {
      const struct = new Struct({
        name: new StringT(uint8),
        age: uint8
      });

      return should.throw(() => struct.size()
      , /not a fixed size/i);
    });
  });

  return describe('encode', function() {
    it('should encode objects to buffers', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from('\x05devon\x15'));
        return done();
      })
      );

      const struct = new Struct({
        name: new StringT(uint8),
        age: uint8
      });

      struct.encode(stream, {
        name: 'devon',
        age: 21
      }
      );

      return stream.end();
    });

    it('should support preEncode hook', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from('\x05devon\x15'));
        return done();
      })
      );

      const struct = new Struct({
        nameLength: uint8,
        name: new StringT('nameLength'),
        age: uint8
      });

      struct.preEncode = function() {
        return this.nameLength = this.name.length;
      };

      struct.encode(stream, {
        name: 'devon',
        age: 21
      }
      );

      return stream.end();
    });

    return it('should encode pointer data after structure', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from('\x05devon\x15\x08\x05hello'));
        return done();
      })
      );

      const struct = new Struct({
        name: new StringT(uint8),
        age: uint8,
        ptr: new Pointer(uint8, new StringT(uint8))
      });

      struct.encode(stream, {
        name: 'devon',
        age: 21,
        ptr: 'hello'
      }
      );

      return stream.end();
    });
  });
});

