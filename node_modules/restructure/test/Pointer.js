const {Pointer, VoidPointer, uint8, DecodeStream, EncodeStream, Struct} = require('../');
const should = require('chai').should();
const concat = require('concat-stream');

describe('Pointer', function() {
  describe('decode', function() {
    it('should handle null pointers', function() {
      const stream = new DecodeStream(Buffer.from([0]));
      const pointer = new Pointer(uint8, uint8);
      return should.not.exist(pointer.decode(stream, {_startOffset: 50}));
    });

    it('should use local offsets from start of parent by default', function() {
      const stream = new DecodeStream(Buffer.from([1, 53]));
      const pointer = new Pointer(uint8, uint8);
      return pointer.decode(stream, {_startOffset: 0}).should.equal(53);
    });

    it('should support immediate offsets', function() {
      const stream = new DecodeStream(Buffer.from([1, 53]));
      const pointer = new Pointer(uint8, uint8, {type: 'immediate'});
      return pointer.decode(stream).should.equal(53);
    });

    it('should support offsets relative to the parent', function() {
      const stream = new DecodeStream(Buffer.from([0, 0, 1, 53]));
      stream.pos = 2;
      const pointer = new Pointer(uint8, uint8, {type: 'parent'});
      return pointer.decode(stream, {parent: {_startOffset: 2}}).should.equal(53);
    });

    it('should support global offsets', function() {
      const stream = new DecodeStream(Buffer.from([1, 2, 4, 0, 0, 0, 53]));
      const pointer = new Pointer(uint8, uint8, {type: 'global'});
      stream.pos = 2;
      return pointer.decode(stream, {parent: {parent: {_startOffset: 2}}}).should.equal(53);
    });

    it('should support offsets relative to a property on the parent', function() {
      const stream = new DecodeStream(Buffer.from([1, 0, 0, 0, 0, 53]));
      const pointer = new Pointer(uint8, uint8, {relativeTo: ctx => ctx.parent.ptr});
      return pointer.decode(stream, {_startOffset: 0, parent: {ptr: 4}}).should.equal(53);
    });

    it('should throw when passing a non function relativeTo option', function() {
      return should.throw(() => new Pointer(uint8, uint8, {relativeTo: 'parent.ptr'}));
    });

    it('should support returning pointer if there is no decode type', function() {
      const stream = new DecodeStream(Buffer.from([4]));
      const pointer = new Pointer(uint8, 'void');
      return pointer.decode(stream, {_startOffset: 0}).should.equal(4);
    });

    return it('should support decoding pointers lazily', function() {
      const stream = new DecodeStream(Buffer.from([1, 53]));
      const struct = new Struct({
        ptr: new Pointer(uint8, uint8, {lazy: true})});

      const res = struct.decode(stream);
      Object.getOwnPropertyDescriptor(res, 'ptr').get.should.be.a('function');
      Object.getOwnPropertyDescriptor(res, 'ptr').enumerable.should.equal(true);
      return res.ptr.should.equal(53);
    });
  });

  describe('size', function() {
    it('should add to local pointerSize', function() {
      const pointer = new Pointer(uint8, uint8);
      const ctx = {pointerSize: 0};
      pointer.size(10, ctx).should.equal(1);
      return ctx.pointerSize.should.equal(1);
    });

    it('should add to immediate pointerSize', function() {
      const pointer = new Pointer(uint8, uint8, {type: 'immediate'});
      const ctx = {pointerSize: 0};
      pointer.size(10, ctx).should.equal(1);
      return ctx.pointerSize.should.equal(1);
    });

    it('should add to parent pointerSize', function() {
      const pointer = new Pointer(uint8, uint8, {type: 'parent'});
      const ctx = {parent: {pointerSize: 0}};
      pointer.size(10, ctx).should.equal(1);
      return ctx.parent.pointerSize.should.equal(1);
    });

    it('should add to global pointerSize', function() {
      const pointer = new Pointer(uint8, uint8, {type: 'global'});
      const ctx = {parent: {parent: {parent: {pointerSize: 0}}}};
      pointer.size(10, ctx).should.equal(1);
      return ctx.parent.parent.parent.pointerSize.should.equal(1);
    });

    it('should handle void pointers', function() {
      const pointer = new Pointer(uint8, 'void');
      const ctx = {pointerSize: 0};
      pointer.size(new VoidPointer(uint8, 50), ctx).should.equal(1);
      return ctx.pointerSize.should.equal(1);
    });

    it('should throw if no type and not a void pointer', function() {
      const pointer = new Pointer(uint8, 'void');
      const ctx = {pointerSize: 0};
      return should.throw(() => pointer.size(30, ctx).should.equal(1));
    });

    return it('should return a fixed size without a value', function() {
      const pointer = new Pointer(uint8, uint8);
      return pointer.size().should.equal(1);
    });
  });

  return describe('encode', function() {
    it('should handle null pointers', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0]));
        return done();
      })
      );

      const ptr = new Pointer(uint8, uint8);
      const ctx = {
        pointerSize: 0,
        startOffset: 0,
        pointerOffset: 0,
        pointers: []
      };

      ptr.encode(stream, null, ctx);
      ctx.pointerSize.should.equal(0);

      return stream.end();
    });

    it('should handle local offsets', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([1]));
        return done();
      })
      );

      const ptr = new Pointer(uint8, uint8);
      const ctx = {
        pointerSize: 0,
        startOffset: 0,
        pointerOffset: 1,
        pointers: []
      };

      ptr.encode(stream, 10, ctx);
      ctx.pointerOffset.should.equal(2);
      ctx.pointers.should.deep.equal([
        { type: uint8, val: 10, parent: ctx }
      ]);

      return stream.end();
    });

    it('should handle immediate offsets', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0]));
        return done();
      })
      );

      const ptr = new Pointer(uint8, uint8, {type: 'immediate'});
      const ctx = {
        pointerSize: 0,
        startOffset: 0,
        pointerOffset: 1,
        pointers: []
      };

      ptr.encode(stream, 10, ctx);
      ctx.pointerOffset.should.equal(2);
      ctx.pointers.should.deep.equal([
        { type: uint8, val: 10, parent: ctx }
      ]);

      return stream.end();
    });

    it('should handle immediate offsets', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([0]));
        return done();
      })
      );

      const ptr = new Pointer(uint8, uint8, {type: 'immediate'});
      const ctx = {
        pointerSize: 0,
        startOffset: 0,
        pointerOffset: 1,
        pointers: []
      };

      ptr.encode(stream, 10, ctx);
      ctx.pointerOffset.should.equal(2);
      ctx.pointers.should.deep.equal([
        { type: uint8, val: 10, parent: ctx }
      ]);

      return stream.end();
    });

    it('should handle offsets relative to parent', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([2]));
        return done();
      })
      );

      const ptr = new Pointer(uint8, uint8, {type: 'parent'});
      const ctx = {
        parent: {
          pointerSize: 0,
          startOffset: 3,
          pointerOffset: 5,
          pointers: []
        }
      };

      ptr.encode(stream, 10, ctx);
      ctx.parent.pointerOffset.should.equal(6);
      ctx.parent.pointers.should.deep.equal([
        { type: uint8, val: 10, parent: ctx }
      ]);

      return stream.end();
    });

    it('should handle global offsets', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([5]));
        return done();
      })
      );

      const ptr = new Pointer(uint8, uint8, {type: 'global'});
      const ctx = {
        parent: {
          parent: {
            parent: {
              pointerSize: 0,
              startOffset: 3,
              pointerOffset: 5,
              pointers: []
            }
          }
        }
      };

      ptr.encode(stream, 10, ctx);
      ctx.parent.parent.parent.pointerOffset.should.equal(6);
      ctx.parent.parent.parent.pointers.should.deep.equal([
        { type: uint8, val: 10, parent: ctx }
      ]);

      return stream.end();
    });

    it('should support offsets relative to a property on the parent', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([6]));
        return done();
      })
      );

      const ptr = new Pointer(uint8, uint8, {relativeTo: ctx => ctx.ptr});
      const ctx = {
        pointerSize: 0,
        startOffset: 0,
        pointerOffset: 10,
        pointers: [],
        val: {
          ptr: 4
        }
      };

      ptr.encode(stream, 10, ctx);
      ctx.pointerOffset.should.equal(11);
      ctx.pointers.should.deep.equal([
        { type: uint8, val: 10, parent: ctx }
      ]);

      return stream.end();
    });

    it('should support void pointers', function(done) {
      const stream = new EncodeStream;
      stream.pipe(concat(function(buf) {
        buf.should.deep.equal(Buffer.from([1]));
        return done();
      })
      );

      const ptr = new Pointer(uint8, 'void');
      const ctx = {
        pointerSize: 0,
        startOffset: 0,
        pointerOffset: 1,
        pointers: []
      };

      ptr.encode(stream, new VoidPointer(uint8, 55), ctx);
      ctx.pointerOffset.should.equal(2);
      ctx.pointers.should.deep.equal([
        { type: uint8, val: 55, parent: ctx }
      ]);

      return stream.end();
    });

    return it('should throw if not a void pointer instance', function() {
      const stream = new EncodeStream;
      const ptr = new Pointer(uint8, 'void');
      const ctx = {
        pointerSize: 0,
        startOffset: 0,
        pointerOffset: 1,
        pointers: []
      };

      return should.throw(() => ptr.encode(stream, 44, ctx));
    });
  });
});
