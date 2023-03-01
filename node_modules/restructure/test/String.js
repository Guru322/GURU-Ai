const {String:StringT, uint8, DecodeStream, EncodeStream} = require('../');
const should = require('chai').should();
const concat = require('concat-stream');

describe('String', function() {
  describe('decode', function() {
    it('should decode fixed length', function() {
      const stream = new DecodeStream(Buffer.from('testing'));
      const string = new StringT(7);
      return string.decode(stream).should.equal('testing');
    });

    it('should decode length from parent key', function() {
      const stream = new DecodeStream(Buffer.from('testing'));
      const string = new StringT('len');
      return string.decode(stream, {len: 7}).should.equal('testing');
    });

    it('should decode length as number before string', function() {
      const stream = new DecodeStream(Buffer.from('\x07testing'));
      const string = new StringT(uint8);
      return string.decode(stream).should.equal('testing');
    });

    it('should decode utf8', function() {
      const stream = new DecodeStream(Buffer.from('🍻'));
      const string = new StringT(4, 'utf8');
      return string.decode(stream).should.equal('🍻');
    });

    it('should decode encoding computed from function', function() {
      const stream = new DecodeStream(Buffer.from('🍻'));
      const string = new StringT(4, function() { return 'utf8'; });
      return string.decode(stream).should.equal('🍻');
    });

    it('should decode null-terminated string and read past terminator', function() {
      const stream = new DecodeStream(Buffer.from('🍻\x00'));
      const string = new StringT(null, 'utf8');
      string.decode(stream).should.equal('🍻');
      return stream.pos.should.equal(5);
    });

    return it('should decode remainder of buffer when null-byte missing', function() {
      const stream = new DecodeStream(Buffer.from('🍻'));
      const string = new StringT(null, 'utf8');
      return string.decode(stream).should.equal('🍻');
    });
  });

  describe('size', function() {
    it('should use string length', function() {
      const string = new StringT(7);
      return string.size('testing').should.equal(7);
    });

    it('should use correct encoding', function() {
      const string = new StringT(10, 'utf8');
      return string.size('🍻').should.equal(4);
    });

    it('should use encoding from function', function() {
      const string = new StringT(10, function() { return 'utf8'; });
      return string.size('🍻').should.equal(4);
    });

    it('should add size of length field before string', function() {
      const string = new StringT(uint8, 'utf8');
      return string.size('🍻').should.equal(5);
    });

    it('should work with utf16be encoding', function() {
      const string = new StringT(10, 'utf16be');
      return string.size('🍻').should.equal(4);
    });

    it('should take null-byte into account', function() {
      const string = new StringT(null, 'utf8');
      return string.size('🍻').should.equal(5);
    });

    return it('should use defined length if no value given', function() {
      const array = new StringT(10);
      return array.size().should.equal(10);
    });
  });

  return describe('encode', function() {
    it('should encode using string length', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from('testing'));
        return done();
      })
      );

      const string = new StringT(7);
      string.encode(stream, 'testing');
      return stream.end();
    });

    it('should encode length as number before string', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from('\x07testing'));
        return done();
      })
      );

      const string = new StringT(uint8);
      string.encode(stream, 'testing');
      return stream.end();
    });

    it('should encode length as number before string utf8', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from('\x0ctesting 😜', 'utf8'));
        return done();
      })
      );

      const string = new StringT(uint8, 'utf8');
      string.encode(stream, 'testing 😜');
      return stream.end();
    });

    it('should encode utf8', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from('🍻'));
        return done();
      })
      );

      const string = new StringT(4, 'utf8');
      string.encode(stream, '🍻');
      return stream.end();
    });

    it('should encode encoding computed from function', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from('🍻'));
        return done();
      })
      );

      const string = new StringT(4, function() { return 'utf8'; });
      string.encode(stream, '🍻');
      return stream.end();
    });

    return it('should encode null-terminated string', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from('🍻\x00'));
        return done();
      })
      );

      const string = new StringT(null, 'utf8');
      string.encode(stream, '🍻');
      return stream.end();
    });
  });
});
