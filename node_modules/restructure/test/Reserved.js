const {Reserved, uint8, uint16, DecodeStream, EncodeStream} = require('../');
const should = require('chai').should();
const concat = require('concat-stream');

describe('Reserved', function() {
  it('should have a default count of 1', function() {
    const reserved = new Reserved(uint8);
    return reserved.size().should.equal(1);
  });

  it('should allow custom counts and types', function() {
    const reserved = new Reserved(uint16, 10);
    return reserved.size().should.equal(20);
  });

  it('should decode', function() {
    const stream = new DecodeStream(Buffer.from([0, 0]));
    const reserved = new Reserved(uint16);
    should.not.exist(reserved.decode(stream));
    return stream.pos.should.equal(2);
  });

  return it('should encode', function(done) {
    const stream = new EncodeStream;
    const reserved = new Reserved(uint16);
    stream.pipe(concat(function(buf) {
      buf.should.deep.equal(Buffer.from([0, 0]));
      return done();
    })
    );

    reserved.encode(stream);
    return stream.end();
  });
});
