const {Enum, uint8, DecodeStream, EncodeStream} = require('../');
const should = require('chai').should();
const concat = require('concat-stream');

describe('Enum', function() {
  const e = new Enum(uint8, ['foo', 'bar', 'baz']);
  it('should have the right size', () => e.size().should.equal(1));

  it('should decode', function() {
    const stream = new DecodeStream(Buffer.from([1, 2, 0]));
    e.decode(stream).should.equal('bar');
    e.decode(stream).should.equal('baz');
    return e.decode(stream).should.equal('foo');
  });

  it('should encode', function(done) {
    const stream = new EncodeStream;
    stream.pipe(concat(function(buf) {
      buf.should.deep.equal(Buffer.from([1, 2, 0]));
      return done();
    })
    );

    e.encode(stream, 'bar');
    e.encode(stream, 'baz');
    e.encode(stream, 'foo');
    return stream.end();
  });

  return it('should throw on unknown option', function() {
    const stream = new EncodeStream;
    return should.throw(() => e.encode(stream, 'unknown'));
  });
});
