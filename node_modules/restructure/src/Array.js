const {Number:NumberT} = require('./Number');
const utils = require('./utils');

class ArrayT {
  constructor(type, length, lengthType = 'count') {
    this.type = type;
    this.length = length;
    this.lengthType = lengthType;
  }

  decode(stream, parent) {
    let length;
    const { pos } = stream;

    const res = [];
    let ctx = parent;

    if (this.length != null) {
      length = utils.resolveLength(this.length, stream, parent);
    }

    if (this.length instanceof NumberT) {
      // define hidden properties
      Object.defineProperties(res, {
        parent:         { value: parent },
        _startOffset:   { value: pos },
        _currentOffset: { value: 0, writable: true },
        _length:        { value: length }
      });

      ctx = res;
    }

    if ((length == null) || (this.lengthType === 'bytes')) {
      const target = (length != null) ?
        stream.pos + length
      : (parent != null ? parent._length : undefined) ?
        parent._startOffset + parent._length
      :
        stream.length;

      while (stream.pos < target) {
        res.push(this.type.decode(stream, ctx));
      }

    } else {
      for (let i = 0, end = length; i < end; i++) {
        res.push(this.type.decode(stream, ctx));
      }
    }

    return res;
  }

  size(array, ctx) {
    if (!array) {
      return this.type.size(null, ctx) * utils.resolveLength(this.length, null, ctx);
    }

    let size = 0;
    if (this.length instanceof NumberT) {
      size += this.length.size();
      ctx = {parent: ctx};
    }

    for (let item of array) {
      size += this.type.size(item, ctx);
    }

    return size;
  }

  encode(stream, array, parent) {
    let ctx = parent;
    if (this.length instanceof NumberT) {
      ctx = {
        pointers: [],
        startOffset: stream.pos,
        parent
      };

      ctx.pointerOffset = stream.pos + this.size(array, ctx);
      this.length.encode(stream, array.length);
    }

    for (let item of array) {
      this.type.encode(stream, item, ctx);
    }

    if (this.length instanceof NumberT) {
      let i = 0;
      while (i < ctx.pointers.length) {
        const ptr = ctx.pointers[i++];
        ptr.type.encode(stream, ptr.val);
      }
    }

  }
}

module.exports = ArrayT;
