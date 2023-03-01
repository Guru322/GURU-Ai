const {Bitfield, uint8, DecodeStream, EncodeStream} = require('../');
const should = require('chai').should();
const concat = require('concat-stream');

describe('Bitfield', function() {
  const bitfield = new Bitfield(uint8, ['Jack', 'Kack', 'Lack', 'Mack', 'Nack', 'Oack', 'Pack', 'Quack']);
  const JACK  = 1 << 0;
  const KACK  = 1 << 1;
  const LACK  = 1 << 2;
  const MACK  = 1 << 3;
  const NACK  = 1 << 4;
  const OACK  = 1 << 5;
  const PACK  = 1 << 6;
  const QUACK = 1 << 7;

  it('should have the right size', () => bitfield.size().should.equal(1));

  it('should decode', function() {
    const stream = new DecodeStream(Buffer.from([JACK | MACK | PACK | NACK | QUACK]));
    return bitfield.decode(stream).should.deep.equal({
      Jack: true, Kack: false, Lack: false, Mack: true, Nack: true, Oack: false, Pack: true, Quack: true});
  });

  return it('should encode', function(done) {
    const stream = new EncodeStream;
    stream.pipe(concat(function(buf) {
      buf.should.deep.equal(Buffer.from([JACK | MACK | PACK | NACK | QUACK]));
      return done();
    })
    );

    bitfield.encode(stream, {Jack: true, Kack: false, Lack: false, Mack: true, Nack: true, Oack: false, Pack: true, Quack: true});
    return stream.end();
  });
});
