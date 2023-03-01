const {VersionedStruct, String:StringT, Pointer, uint8, DecodeStream, EncodeStream} = require('../');
const should = require('chai').should();
const concat = require('concat-stream');

describe('VersionedStruct', function() {
  describe('decode', function() {
    it('should get version from number type', function() {
      const struct = new VersionedStruct(uint8, {
        0: {
          name: new StringT(uint8, 'ascii'),
          age: uint8
        },
        1: {
          name: new StringT(uint8, 'utf8'),
          age: uint8,
          gender: uint8
        }
      }
      );

      let stream = new DecodeStream(Buffer.from('\x00\x05devon\x15'));
      struct.decode(stream).should.deep.equal({
        version: 0,
        name: 'devon',
        age: 21
      });

      stream = new DecodeStream(Buffer.from('\x01\x0adevon 👍\x15\x00', 'utf8'));
      return struct.decode(stream).should.deep.equal({
        version: 1,
        name: 'devon 👍',
        age: 21,
        gender: 0
      });
    });

    it('should throw for unknown version', function() {
      const struct = new VersionedStruct(uint8, {
        0: {
          name: new StringT(uint8, 'ascii'),
          age: uint8
        },
        1: {
          name: new StringT(uint8, 'utf8'),
          age: uint8,
          gender: uint8
        }
      }
      );

      const stream = new DecodeStream(Buffer.from('\x05\x05devon\x15'));
      return should.throw(() => struct.decode(stream));
    });

    it('should support common header block', function() {
      const struct = new VersionedStruct(uint8, {
        header: {
          age: uint8,
          alive: uint8
        },
        0: {
          name: new StringT(uint8, 'ascii')
        },
        1: {
          name: new StringT(uint8, 'utf8'),
          gender: uint8
        }
      }
      );

      let stream = new DecodeStream(Buffer.from('\x00\x15\x01\x05devon'));
      struct.decode(stream).should.deep.equal({
        version: 0,
        age: 21,
        alive: 1,
        name: 'devon'
      });

      stream = new DecodeStream(Buffer.from('\x01\x15\x01\x0adevon 👍\x00', 'utf8'));
      return struct.decode(stream).should.deep.equal({
        version: 1,
        age: 21,
        alive: 1,
        name: 'devon 👍',
        gender: 0
      });
    });

    it('should support parent version key', function() {
      const struct = new VersionedStruct('version', {
        0: {
          name: new StringT(uint8, 'ascii'),
          age: uint8
        },
        1: {
          name: new StringT(uint8, 'utf8'),
          age: uint8,
          gender: uint8
        }
      }
      );

      let stream = new DecodeStream(Buffer.from('\x05devon\x15'));
      struct.decode(stream, {version: 0}).should.deep.equal({
        version: 0,
        name: 'devon',
        age: 21
      });

      stream = new DecodeStream(Buffer.from('\x0adevon 👍\x15\x00', 'utf8'));
      return struct.decode(stream, {version: 1}).should.deep.equal({
        version: 1,
        name: 'devon 👍',
        age: 21,
        gender: 0
      });
    });

    it('should support parent version nested key', function() {
      const struct = new VersionedStruct('obj.version', {
        0: {
          name: new StringT(uint8, 'ascii'),
          age: uint8
        },
        1: {
          name: new StringT(uint8, 'utf8'),
          age: uint8,
          gender: uint8
        }
      }
      );

      let stream = new DecodeStream(Buffer.from('\x05devon\x15'));
      struct.decode(stream, {obj: {version: 0}}).should.deep.equal({
        version: 0,
        name: 'devon',
        age: 21
      });

      stream = new DecodeStream(Buffer.from('\x0adevon 👍\x15\x00', 'utf8'));
      return struct.decode(stream, {obj: {version: 1}}).should.deep.equal({
        version: 1,
        name: 'devon 👍',
        age: 21,
        gender: 0
      });
    });

    it('should support sub versioned structs', function() {
      const struct = new VersionedStruct(uint8, {
        0: {
          name: new StringT(uint8, 'ascii'),
          age: uint8
        },
        1: new VersionedStruct(uint8, {
          0: {
            name: new StringT(uint8)
          },
          1: {
            name: new StringT(uint8),
            isDesert: uint8
          }
        }
        )
      }
      );

      let stream = new DecodeStream(Buffer.from('\x00\x05devon\x15'));
      struct.decode(stream, {version: 0}).should.deep.equal({
        version: 0,
        name: 'devon',
        age: 21
      });

      stream = new DecodeStream(Buffer.from('\x01\x00\x05pasta'));
      struct.decode(stream, {version: 0}).should.deep.equal({
        version: 0,
        name: 'pasta'
      });

      stream = new DecodeStream(Buffer.from('\x01\x01\x09ice cream\x01'));
      return struct.decode(stream, {version: 0}).should.deep.equal({
        version: 1,
        name: 'ice cream',
        isDesert: 1
      });
    });

    return it('should support process hook', function() {
      const struct = new VersionedStruct(uint8, {
        0: {
          name: new StringT(uint8, 'ascii'),
          age: uint8
        },
        1: {
          name: new StringT(uint8, 'utf8'),
          age: uint8,
          gender: uint8
        }
      }
      );

      struct.process = function() {
        return this.processed = true;
      };

      const stream = new DecodeStream(Buffer.from('\x00\x05devon\x15'));
      return struct.decode(stream).should.deep.equal({
        version: 0,
        name: 'devon',
        age: 21,
        processed: true
      });
    });
  });

  describe('size', function() {
    it('should compute the correct size', function() {
      const struct = new VersionedStruct(uint8, {
        0: {
          name: new StringT(uint8, 'ascii'),
          age: uint8
        },
        1: {
          name: new StringT(uint8, 'utf8'),
          age: uint8,
          gender: uint8
        }
      }
      );

      let size = struct.size({
        version: 0,
        name: 'devon',
        age: 21
      });

      size.should.equal(8);

      size = struct.size({
        version: 1,
        name: 'devon 👍',
        age: 21,
        gender: 0
      });

      return size.should.equal(14);
    });

    it('should throw for unknown version', function() {
      const struct = new VersionedStruct(uint8, {
        0: {
          name: new StringT(uint8, 'ascii'),
          age: uint8
        },
        1: {
          name: new StringT(uint8, 'utf8'),
          age: uint8,
          gender: uint8
        }
      }
      );

      return should.throw(() =>
        struct.size({
          version: 5,
          name: 'devon',
          age: 21
        })
      );
    });

    it('should support common header block', function() {
      const struct = new VersionedStruct(uint8, {
        header: {
          age: uint8,
          alive: uint8
        },
        0: {
          name: new StringT(uint8, 'ascii')
        },
        1: {
          name: new StringT(uint8, 'utf8'),
          gender: uint8
        }
      }
      );

      let size = struct.size({
        version: 0,
        age: 21,
        alive: 1,
        name: 'devon'
      });

      size.should.equal(9);

      size = struct.size({
        version: 1,
        age: 21,
        alive: 1,
        name: 'devon 👍',
        gender: 0
      });

      return size.should.equal(15);
    });

    it('should compute the correct size with pointers', function() {
      const struct = new VersionedStruct(uint8, {
        0: {
          name: new StringT(uint8, 'ascii'),
          age: uint8
        },
        1: {
          name: new StringT(uint8, 'utf8'),
          age: uint8,
          ptr: new Pointer(uint8, new StringT(uint8))
        }
      }
      );

      const size = struct.size({
        version: 1,
        name: 'devon',
        age: 21,
        ptr: 'hello'
      });

      return size.should.equal(15);
    });

    return it('should throw if no value is given', function() {
      const struct = new VersionedStruct(uint8, {
        0: {
          name: new StringT(4, 'ascii'),
          age: uint8
        },
        1: {
          name: new StringT(4, 'utf8'),
          age: uint8,
          gender: uint8
        }
      }
      );

      return should.throw(() => struct.size()
      , /not a fixed size/i);
    });
  });

  return describe('encode', function() {
    it('should encode objects to buffers', function(done) {
      const struct = new VersionedStruct(uint8, {
        0: {
          name: new StringT(uint8, 'ascii'),
          age: uint8
        },
        1: {
          name: new StringT(uint8, 'utf8'),
          age: uint8,
          gender: uint8
        }
      }
      );

      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from('\x00\x05devon\x15\x01\x0adevon 👍\x15\x00', 'utf8'));
        return done();
      })
      );

      struct.encode(stream, {
        version: 0,
        name: 'devon',
        age: 21
      }
      );

      struct.encode(stream, {
        version: 1,
        name: 'devon 👍',
        age: 21,
        gender: 0
      }
      );

      return stream.end();
    });

    it('should throw for unknown version', function() {
      const struct = new VersionedStruct(uint8, {
        0: {
          name: new StringT(uint8, 'ascii'),
          age: uint8
        },
        1: {
          name: new StringT(uint8, 'utf8'),
          age: uint8,
          gender: uint8
        }
      }
      );

      const stream = new EncodeStream;
      return should.throw(() =>
        struct.encode(stream, {
          version: 5,
          name: 'devon',
          age: 21
        }
        )
      );
    });

    it('should support common header block', function(done) {
      const struct = new VersionedStruct(uint8, {
        header: {
          age: uint8,
          alive: uint8
        },
        0: {
          name: new StringT(uint8, 'ascii')
        },
        1: {
          name: new StringT(uint8, 'utf8'),
          gender: uint8
        }
      }
      );

      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from('\x00\x15\x01\x05devon\x01\x15\x01\x0adevon 👍\x00', 'utf8'));
        return done();
      })
      );

      struct.encode(stream, {
        version: 0,
        age: 21,
        alive: 1,
        name: 'devon'
      }
      );

      struct.encode(stream, {
        version: 1,
        age: 21,
        alive: 1,
        name: 'devon 👍',
        gender: 0
      }
      );

      return stream.end();
    });

    it('should encode pointer data after structure', function(done) {
      const struct = new VersionedStruct(uint8, {
        0: {
          name: new StringT(uint8, 'ascii'),
          age: uint8
        },
        1: {
          name: new StringT(uint8, 'utf8'),
          age: uint8,
          ptr: new Pointer(uint8, new StringT(uint8))
        }
      }
      );

      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from('\x01\x05devon\x15\x09\x05hello', 'utf8'));
        return done();
      })
      );

      struct.encode(stream, {
        version: 1,
        name: 'devon',
        age: 21,
        ptr: 'hello'
      }
      );

      return stream.end();
    });

    return it('should support preEncode hook', function(done) {
      const struct = new VersionedStruct(uint8, {
        0: {
          name: new StringT(uint8, 'ascii'),
          age: uint8
        },
        1: {
          name: new StringT(uint8, 'utf8'),
          age: uint8,
          gender: uint8
        }
      }
      );

      struct.preEncode = function() {
        return this.version = (this.gender != null) ? 1 : 0;
      };

      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from('\x00\x05devon\x15\x01\x0adevon 👍\x15\x00', 'utf8'));
        return done();
      })
      );

      struct.encode(stream, {
        name: 'devon',
        age: 21
      }
      );

      struct.encode(stream, {
        name: 'devon 👍',
        age: 21,
        gender: 0
      }
      );

      return stream.end();
    });
  });
});
