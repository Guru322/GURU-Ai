const utils = require('./utils');

class Struct {
  constructor(fields = {}) {
    this.fields = fields;
  }

  decode(stream, parent, length = 0) {
    const res = this._setup(stream, parent, length);
    this._parseFields(stream, res, this.fields);

    if (this.process != null) {
      this.process.call(res, stream);
    }
    return res;
  }

  _setup(stream, parent, length) {
    const res = {};

    // define hidden properties
    Object.defineProperties(res, {
      parent:         { value: parent },
      _startOffset:   { value: stream.pos },
      _currentOffset: { value: 0, writable: true },
      _length:        { value: length }
    });

    return res;
  }

  _parseFields(stream, res, fields) {
    for (let key in fields) {
      var val;
      const type = fields[key];
      if (typeof type === 'function') {
        val = type.call(res, res);
      } else {
        val = type.decode(stream, res);
      }

      if (val !== undefined) {
        if (val instanceof utils.PropertyDescriptor) {
          Object.defineProperty(res, key, val);
        } else {
          res[key] = val;
        }
      }

      res._currentOffset = stream.pos - res._startOffset;
    }

  }

  size(val, parent, includePointers) {
    if (val == null) { val = {}; }
    if (includePointers == null) { includePointers = true; }
    const ctx = {
      parent,
      val,
      pointerSize: 0
    };

    let size = 0;
    for (let key in this.fields) {
      const type = this.fields[key];
      if (type.size != null) {
        size += type.size(val[key], ctx);
      }
    }

    if (includePointers) {
      size += ctx.pointerSize;
    }

    return size;
  }

  encode(stream, val, parent) {
    let type;
    if (this.preEncode != null) {
      this.preEncode.call(val, stream);
    }

    const ctx = {
      pointers: [],
      startOffset: stream.pos,
      parent,
      val,
      pointerSize: 0
    };

    ctx.pointerOffset = stream.pos + this.size(val, ctx, false);

    for (let key in this.fields) {
      type = this.fields[key];
      if (type.encode != null) {
        type.encode(stream, val[key], ctx);
      }
    }

    let i = 0;
    while (i < ctx.pointers.length) {
      const ptr = ctx.pointers[i++];
      ptr.type.encode(stream, ptr.val, ptr.parent);
    }

  }
}

module.exports = Struct;
