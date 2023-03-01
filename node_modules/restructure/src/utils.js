const {Number:NumberT} = require('./Number');

exports.resolveLength = function(length, stream, parent) {
  let res;
  if (typeof length === 'number') {
    res = length;

  } else if (typeof length === 'function') {
    res = length.call(parent, parent);

  } else if (parent && (typeof length === 'string')) {
    res = parent[length];

  } else if (stream && length instanceof NumberT) {
    res = length.decode(stream);
  }

  if (isNaN(res)) {
    throw new Error('Not a fixed size');
  }

  return res;
};

class PropertyDescriptor {
  constructor(opts = {}) {
    this.enumerable = true;
    this.configurable = true;

    for (let key in opts) {
      const val = opts[key];
      this[key] = val;
    }
  }
}

exports.PropertyDescriptor = PropertyDescriptor;
