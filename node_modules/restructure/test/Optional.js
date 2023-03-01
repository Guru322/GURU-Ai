const {Optional, uint8, DecodeStream, EncodeStream} = require('../');
const should = require('chai').should();
const concat = require('concat-stream');

describe('Optional', function() {
  describe('decode', function() {
    it('should not decode when condition is falsy', function() {
      const stream = new DecodeStream(Buffer.from([0]));
      const optional = new Optional(uint8, false);
      should.not.exist(optional.decode(stream));
      return stream.pos.should.equal(0);
    });

    it('should not decode when condition is a function and falsy', function() {
      const stream = new DecodeStream(Buffer.from([0]));
      const optional = new Optional(uint8, function() { return false; });
      should.not.exist(optional.decode(stream));
      return stream.pos.should.equal(0);
    });

    it('should decode when condition is omitted', function() {
      const stream = new DecodeStream(Buffer.from([0]));
      const optional = new Optional(uint8);
      should.exist(optional.decode(stream));
      return stream.pos.should.equal(1);
    });

    it('should decode when condition is truthy', function() {
      const stream = new DecodeStream(Buffer.from([0]));
      const optional = new Optional(uint8, true);
      should.exist(optional.decode(stream));
      return stream.pos.should.equal(1);
    });

    return it('should decode when condition is a function and truthy', function() {
      const stream = new DecodeStream(Buffer.from([0]));
      const optional = new Optional(uint8, function() { return true; });
      should.exist(optional.decode(stream));
      return stream.pos.should.equal(1);
    });
  });

  describe('size', function() {
    it('should return 0 when condition is falsy', function() {
      const stream = new DecodeStream(Buffer.from([0]));
      const optional = new Optional(uint8, false);
      return optional.size().should.equal(0);
    });

    it('should return 0 when condition is a function and falsy', function() {
      const stream = new DecodeStream(Buffer.from([0]));
      const optional = new Optional(uint8, function() { return false; });
      return optional.size().should.equal(0);
    });

    it('should return given type size when condition is omitted', function() {
      const stream = new DecodeStream(Buffer.from([0]));
      const optional = new Optional(uint8);
      return optional.size().should.equal(1);
    });

    it('should return given type size when condition is truthy', function() {
      const stream = new DecodeStream(Buffer.from([0]));
      const optional = new Optional(uint8, true);
      return optional.size().should.equal(1);
    });

    return it('should return given type size when condition is a function and truthy', function() {
      const stream = new DecodeStream(Buffer.from([0]));
      const optional = new Optional(uint8, function() { return true; });
      return optional.size().should.equal(1);
    });
  });

  return describe('encode', function() {
    it('should not encode when condition is falsy', function(done) {
      const stream = new EncodeStream;
      const optional = new Optional(uint8, false);
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal([]);
        return done();
      })
      );

      optional.encode(stream, 128);
      return stream.end();
    });

    it('should not encode when condition is a function and falsy', function(done) {
      const stream = new EncodeStream;
      const optional = new Optional(uint8, function() { return false; });
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal([]);
        return done();
      })
      );

      optional.encode(stream, 128);
      return stream.end();
    });

    it('should encode when condition is omitted', function(done) {
      const stream = new EncodeStream;
      const optional = new Optional(uint8);
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([128]));
        return done();
      })
      );

      optional.encode(stream, 128);
      return stream.end();
    });

    it('should encode when condition is truthy', function(done) {
      const stream = new EncodeStream;
      const optional = new Optional(uint8, true);
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([128]));
        return done();
      })
      );

      optional.encode(stream, 128);
      return stream.end();
    });

    return it('should encode when condition is a function and truthy', function(done) {
      const stream = new EncodeStream;
      const optional = new Optional(uint8, function() { return true; });
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([128]));
        return done();
      })
      );

      optional.encode(stream, 128);
      return stream.end();
    });
  });
});
