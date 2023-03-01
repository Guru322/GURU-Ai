import stream from 'stream';
import fs from 'fs';
import zlib from 'zlib';
import CryptoJS from 'crypto-js';
import fontkit from 'fontkit';
import { EventEmitter } from 'events';
import LineBreaker from 'linebreak';
import PNG from 'png-js';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/*
PDFAbstractReference - abstract class for PDF reference
*/
var PDFAbstractReference = /*#__PURE__*/function () {
  function PDFAbstractReference() {
    _classCallCheck(this, PDFAbstractReference);
  }

  _createClass(PDFAbstractReference, [{
    key: "toString",
    value: function toString() {
      throw new Error('Must be implemented by subclasses');
    }
  }]);

  return PDFAbstractReference;
}();

var PDFTree = /*#__PURE__*/function () {
  function PDFTree() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, PDFTree);

    this._items = {}; // disable /Limits output for this tree

    this.limits = typeof options.limits === 'boolean' ? options.limits : true;
  }

  _createClass(PDFTree, [{
    key: "add",
    value: function add(key, val) {
      return this._items[key] = val;
    }
  }, {
    key: "get",
    value: function get(key) {
      return this._items[key];
    }
  }, {
    key: "toString",
    value: function toString() {
      var _this = this;

      // Needs to be sorted by key
      var sortedKeys = Object.keys(this._items).sort(function (a, b) {
        return _this._compareKeys(a, b);
      });
      var out = ['<<'];

      if (this.limits && sortedKeys.length > 1) {
        var first = sortedKeys[0],
            last = sortedKeys[sortedKeys.length - 1];
        out.push("  /Limits ".concat(PDFObject.convert([this._dataForKey(first), this._dataForKey(last)])));
      }

      out.push("  /".concat(this._keysName(), " ["));

      var _iterator = _createForOfIteratorHelper(sortedKeys),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          out.push("    ".concat(PDFObject.convert(this._dataForKey(key)), " ").concat(PDFObject.convert(this._items[key])));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      out.push(']');
      out.push('>>');
      return out.join('\n');
    }
  }, {
    key: "_compareKeys",
    value: function _compareKeys() {
      throw new Error('Must be implemented by subclasses');
    }
  }, {
    key: "_keysName",
    value: function _keysName() {
      throw new Error('Must be implemented by subclasses');
    }
  }, {
    key: "_dataForKey",
    value: function _dataForKey() {
      throw new Error('Must be implemented by subclasses');
    }
  }]);

  return PDFTree;
}();

var pad = function pad(str, length) {
  return (Array(length + 1).join('0') + str).slice(-length);
};

var escapableRe = /[\n\r\t\b\f()\\]/g;
var escapable = {
  '\n': '\\n',
  '\r': '\\r',
  '\t': '\\t',
  '\b': '\\b',
  '\f': '\\f',
  '\\': '\\\\',
  '(': '\\(',
  ')': '\\)'
}; // Convert little endian UTF-16 to big endian

var swapBytes = function swapBytes(buff) {
  var l = buff.length;

  if (l & 0x01) {
    throw new Error('Buffer length must be even');
  } else {
    for (var i = 0, end = l - 1; i < end; i += 2) {
      var a = buff[i];
      buff[i] = buff[i + 1];
      buff[i + 1] = a;
    }
  }

  return buff;
};

var PDFObject = /*#__PURE__*/function () {
  function PDFObject() {
    _classCallCheck(this, PDFObject);
  }

  _createClass(PDFObject, null, [{
    key: "convert",
    value: function convert(object) {
      var encryptFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      // String literals are converted to the PDF name type
      if (typeof object === 'string') {
        return "/".concat(object); // String objects are converted to PDF strings (UTF-16)
      } else if (object instanceof String) {
        var string = object; // Detect if this is a unicode string

        var isUnicode = false;

        for (var i = 0, end = string.length; i < end; i++) {
          if (string.charCodeAt(i) > 0x7f) {
            isUnicode = true;
            break;
          }
        } // If so, encode it as big endian UTF-16


        var stringBuffer;

        if (isUnicode) {
          stringBuffer = swapBytes(Buffer.from("\uFEFF".concat(string), 'utf16le'));
        } else {
          stringBuffer = Buffer.from(string.valueOf(), 'ascii');
        } // Encrypt the string when necessary


        if (encryptFn) {
          string = encryptFn(stringBuffer).toString('binary');
        } else {
          string = stringBuffer.toString('binary');
        } // Escape characters as required by the spec


        string = string.replace(escapableRe, function (c) {
          return escapable[c];
        });
        return "(".concat(string, ")"); // Buffers are converted to PDF hex strings
      } else if (Buffer.isBuffer(object)) {
        return "<".concat(object.toString('hex'), ">");
      } else if (object instanceof PDFAbstractReference || object instanceof PDFTree) {
        return object.toString();
      } else if (object instanceof Date) {
        var _string = "D:".concat(pad(object.getUTCFullYear(), 4)) + pad(object.getUTCMonth() + 1, 2) + pad(object.getUTCDate(), 2) + pad(object.getUTCHours(), 2) + pad(object.getUTCMinutes(), 2) + pad(object.getUTCSeconds(), 2) + 'Z'; // Encrypt the string when necessary


        if (encryptFn) {
          _string = encryptFn(Buffer.from(_string, 'ascii')).toString('binary'); // Escape characters as required by the spec

          _string = _string.replace(escapableRe, function (c) {
            return escapable[c];
          });
        }

        return "(".concat(_string, ")");
      } else if (Array.isArray(object)) {
        var items = object.map(function (e) {
          return PDFObject.convert(e, encryptFn);
        }).join(' ');
        return "[".concat(items, "]");
      } else if ({}.toString.call(object) === '[object Object]') {
        var out = ['<<'];

        for (var key in object) {
          var val = object[key];
          out.push("/".concat(key, " ").concat(PDFObject.convert(val, encryptFn)));
        }

        out.push('>>');
        return out.join('\n');
      } else if (typeof object === 'number') {
        return PDFObject.number(object);
      } else {
        return "".concat(object);
      }
    }
  }, {
    key: "number",
    value: function number(n) {
      if (n > -1e21 && n < 1e21) {
        return Math.round(n * 1e6) / 1e6;
      }

      throw new Error("unsupported number: ".concat(n));
    }
  }]);

  return PDFObject;
}();

var PDFReference = /*#__PURE__*/function (_PDFAbstractReference) {
  _inherits(PDFReference, _PDFAbstractReference);

  var _super = _createSuper(PDFReference);

  function PDFReference(document, id) {
    var _this;

    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, PDFReference);

    _this = _super.call(this);
    _this.document = document;
    _this.id = id;
    _this.data = data;
    _this.gen = 0;
    _this.compress = _this.document.compress && !_this.data.Filter;
    _this.uncompressedLength = 0;
    _this.buffer = [];
    return _this;
  }

  _createClass(PDFReference, [{
    key: "write",
    value: function write(chunk) {
      if (!Buffer.isBuffer(chunk)) {
        chunk = Buffer.from(chunk + '\n', 'binary');
      }

      this.uncompressedLength += chunk.length;

      if (this.data.Length == null) {
        this.data.Length = 0;
      }

      this.buffer.push(chunk);
      this.data.Length += chunk.length;

      if (this.compress) {
        return this.data.Filter = 'FlateDecode';
      }
    }
  }, {
    key: "end",
    value: function end(chunk) {
      if (chunk) {
        this.write(chunk);
      }

      return this.finalize();
    }
  }, {
    key: "finalize",
    value: function finalize() {
      this.offset = this.document._offset;
      var encryptFn = this.document._security ? this.document._security.getEncryptFn(this.id, this.gen) : null;

      if (this.buffer.length) {
        this.buffer = Buffer.concat(this.buffer);

        if (this.compress) {
          this.buffer = zlib.deflateSync(this.buffer);
        }

        if (encryptFn) {
          this.buffer = encryptFn(this.buffer);
        }

        this.data.Length = this.buffer.length;
      }

      this.document._write("".concat(this.id, " ").concat(this.gen, " obj"));

      this.document._write(PDFObject.convert(this.data, encryptFn));

      if (this.buffer.length) {
        this.document._write('stream');

        this.document._write(this.buffer);

        this.buffer = []; // free up memory

        this.document._write('\nendstream');
      }

      this.document._write('endobj');

      this.document._refEnd(this);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "".concat(this.id, " ").concat(this.gen, " R");
    }
  }]);

  return PDFReference;
}(PDFAbstractReference);

/*
PDFPage - represents a single page in the PDF document
By Devon Govett
*/
var DEFAULT_MARGINS = {
  top: 72,
  left: 72,
  bottom: 72,
  right: 72
};
var SIZES = {
  '4A0': [4767.87, 6740.79],
  '2A0': [3370.39, 4767.87],
  A0: [2383.94, 3370.39],
  A1: [1683.78, 2383.94],
  A2: [1190.55, 1683.78],
  A3: [841.89, 1190.55],
  A4: [595.28, 841.89],
  A5: [419.53, 595.28],
  A6: [297.64, 419.53],
  A7: [209.76, 297.64],
  A8: [147.4, 209.76],
  A9: [104.88, 147.4],
  A10: [73.7, 104.88],
  B0: [2834.65, 4008.19],
  B1: [2004.09, 2834.65],
  B2: [1417.32, 2004.09],
  B3: [1000.63, 1417.32],
  B4: [708.66, 1000.63],
  B5: [498.9, 708.66],
  B6: [354.33, 498.9],
  B7: [249.45, 354.33],
  B8: [175.75, 249.45],
  B9: [124.72, 175.75],
  B10: [87.87, 124.72],
  C0: [2599.37, 3676.54],
  C1: [1836.85, 2599.37],
  C2: [1298.27, 1836.85],
  C3: [918.43, 1298.27],
  C4: [649.13, 918.43],
  C5: [459.21, 649.13],
  C6: [323.15, 459.21],
  C7: [229.61, 323.15],
  C8: [161.57, 229.61],
  C9: [113.39, 161.57],
  C10: [79.37, 113.39],
  RA0: [2437.8, 3458.27],
  RA1: [1729.13, 2437.8],
  RA2: [1218.9, 1729.13],
  RA3: [864.57, 1218.9],
  RA4: [609.45, 864.57],
  SRA0: [2551.18, 3628.35],
  SRA1: [1814.17, 2551.18],
  SRA2: [1275.59, 1814.17],
  SRA3: [907.09, 1275.59],
  SRA4: [637.8, 907.09],
  EXECUTIVE: [521.86, 756.0],
  FOLIO: [612.0, 936.0],
  LEGAL: [612.0, 1008.0],
  LETTER: [612.0, 792.0],
  TABLOID: [792.0, 1224.0]
};

var PDFPage = /*#__PURE__*/function () {
  function PDFPage(document) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PDFPage);

    this.document = document;
    this.size = options.size || 'letter';
    this.layout = options.layout || 'portrait'; // process margins

    if (typeof options.margin === 'number') {
      this.margins = {
        top: options.margin,
        left: options.margin,
        bottom: options.margin,
        right: options.margin
      }; // default to 1 inch margins
    } else {
      this.margins = options.margins || DEFAULT_MARGINS;
    } // calculate page dimensions


    var dimensions = Array.isArray(this.size) ? this.size : SIZES[this.size.toUpperCase()];
    this.width = dimensions[this.layout === 'portrait' ? 0 : 1];
    this.height = dimensions[this.layout === 'portrait' ? 1 : 0];
    this.content = this.document.ref(); // Initialize the Font, XObject, and ExtGState dictionaries

    this.resources = this.document.ref({
      ProcSet: ['PDF', 'Text', 'ImageB', 'ImageC', 'ImageI']
    }); // The page dictionary

    this.dictionary = this.document.ref({
      Type: 'Page',
      Parent: this.document._root.data.Pages,
      MediaBox: [0, 0, this.width, this.height],
      Contents: this.content,
      Resources: this.resources
    });
    this.markings = [];
  } // Lazily create these objects


  _createClass(PDFPage, [{
    key: "fonts",
    get: function get() {
      var data = this.resources.data;
      return data.Font != null ? data.Font : data.Font = {};
    }
  }, {
    key: "xobjects",
    get: function get() {
      var data = this.resources.data;
      return data.XObject != null ? data.XObject : data.XObject = {};
    }
  }, {
    key: "ext_gstates",
    get: function get() {
      var data = this.resources.data;
      return data.ExtGState != null ? data.ExtGState : data.ExtGState = {};
    }
  }, {
    key: "patterns",
    get: function get() {
      var data = this.resources.data;
      return data.Pattern != null ? data.Pattern : data.Pattern = {};
    }
  }, {
    key: "colorSpaces",
    get: function get() {
      var data = this.resources.data;
      return data.ColorSpace || (data.ColorSpace = {});
    }
  }, {
    key: "annotations",
    get: function get() {
      var data = this.dictionary.data;
      return data.Annots != null ? data.Annots : data.Annots = [];
    }
  }, {
    key: "structParentTreeKey",
    get: function get() {
      var data = this.dictionary.data;
      return data.StructParents != null ? data.StructParents : data.StructParents = this.document.createStructParentTreeNextKey();
    }
  }, {
    key: "maxY",
    value: function maxY() {
      return this.height - this.margins.bottom;
    }
  }, {
    key: "write",
    value: function write(chunk) {
      return this.content.write(chunk);
    }
  }, {
    key: "end",
    value: function end() {
      this.dictionary.end();
      this.resources.end();
      return this.content.end();
    }
  }]);

  return PDFPage;
}();

var PDFNameTree = /*#__PURE__*/function (_PDFTree) {
  _inherits(PDFNameTree, _PDFTree);

  var _super = _createSuper(PDFNameTree);

  function PDFNameTree() {
    _classCallCheck(this, PDFNameTree);

    return _super.apply(this, arguments);
  }

  _createClass(PDFNameTree, [{
    key: "_compareKeys",
    value: function _compareKeys(a, b) {
      return a.localeCompare(b);
    }
  }, {
    key: "_keysName",
    value: function _keysName() {
      return "Names";
    }
  }, {
    key: "_dataForKey",
    value: function _dataForKey(k) {
      return new String(k);
    }
  }]);

  return PDFNameTree;
}(PDFTree);

/**
 * Check if value is in a range group.
 * @param {number} value
 * @param {number[]} rangeGroup
 * @returns {boolean}
 */
function inRange(value, rangeGroup) {
  if (value < rangeGroup[0]) return false;
  var startRange = 0;
  var endRange = rangeGroup.length / 2;

  while (startRange <= endRange) {
    var middleRange = Math.floor((startRange + endRange) / 2); // actual array index

    var arrayIndex = middleRange * 2; // Check if value is in range pointed by actual index

    if (value >= rangeGroup[arrayIndex] && value <= rangeGroup[arrayIndex + 1]) {
      return true;
    }

    if (value > rangeGroup[arrayIndex + 1]) {
      // Search Right Side Of Array
      startRange = middleRange + 1;
    } else {
      // Search Left Side Of Array
      endRange = middleRange - 1;
    }
  }

  return false;
}

/**
 * A.1 Unassigned code points in Unicode 3.2
 * @link https://tools.ietf.org/html/rfc3454#appendix-A.1
 */

var unassigned_code_points = [0x0221, 0x0221, 0x0234, 0x024f, 0x02ae, 0x02af, 0x02ef, 0x02ff, 0x0350, 0x035f, 0x0370, 0x0373, 0x0376, 0x0379, 0x037b, 0x037d, 0x037f, 0x0383, 0x038b, 0x038b, 0x038d, 0x038d, 0x03a2, 0x03a2, 0x03cf, 0x03cf, 0x03f7, 0x03ff, 0x0487, 0x0487, 0x04cf, 0x04cf, 0x04f6, 0x04f7, 0x04fa, 0x04ff, 0x0510, 0x0530, 0x0557, 0x0558, 0x0560, 0x0560, 0x0588, 0x0588, 0x058b, 0x0590, 0x05a2, 0x05a2, 0x05ba, 0x05ba, 0x05c5, 0x05cf, 0x05eb, 0x05ef, 0x05f5, 0x060b, 0x060d, 0x061a, 0x061c, 0x061e, 0x0620, 0x0620, 0x063b, 0x063f, 0x0656, 0x065f, 0x06ee, 0x06ef, 0x06ff, 0x06ff, 0x070e, 0x070e, 0x072d, 0x072f, 0x074b, 0x077f, 0x07b2, 0x0900, 0x0904, 0x0904, 0x093a, 0x093b, 0x094e, 0x094f, 0x0955, 0x0957, 0x0971, 0x0980, 0x0984, 0x0984, 0x098d, 0x098e, 0x0991, 0x0992, 0x09a9, 0x09a9, 0x09b1, 0x09b1, 0x09b3, 0x09b5, 0x09ba, 0x09bb, 0x09bd, 0x09bd, 0x09c5, 0x09c6, 0x09c9, 0x09ca, 0x09ce, 0x09d6, 0x09d8, 0x09db, 0x09de, 0x09de, 0x09e4, 0x09e5, 0x09fb, 0x0a01, 0x0a03, 0x0a04, 0x0a0b, 0x0a0e, 0x0a11, 0x0a12, 0x0a29, 0x0a29, 0x0a31, 0x0a31, 0x0a34, 0x0a34, 0x0a37, 0x0a37, 0x0a3a, 0x0a3b, 0x0a3d, 0x0a3d, 0x0a43, 0x0a46, 0x0a49, 0x0a4a, 0x0a4e, 0x0a58, 0x0a5d, 0x0a5d, 0x0a5f, 0x0a65, 0x0a75, 0x0a80, 0x0a84, 0x0a84, 0x0a8c, 0x0a8c, 0x0a8e, 0x0a8e, 0x0a92, 0x0a92, 0x0aa9, 0x0aa9, 0x0ab1, 0x0ab1, 0x0ab4, 0x0ab4, 0x0aba, 0x0abb, 0x0ac6, 0x0ac6, 0x0aca, 0x0aca, 0x0ace, 0x0acf, 0x0ad1, 0x0adf, 0x0ae1, 0x0ae5, 0x0af0, 0x0b00, 0x0b04, 0x0b04, 0x0b0d, 0x0b0e, 0x0b11, 0x0b12, 0x0b29, 0x0b29, 0x0b31, 0x0b31, 0x0b34, 0x0b35, 0x0b3a, 0x0b3b, 0x0b44, 0x0b46, 0x0b49, 0x0b4a, 0x0b4e, 0x0b55, 0x0b58, 0x0b5b, 0x0b5e, 0x0b5e, 0x0b62, 0x0b65, 0x0b71, 0x0b81, 0x0b84, 0x0b84, 0x0b8b, 0x0b8d, 0x0b91, 0x0b91, 0x0b96, 0x0b98, 0x0b9b, 0x0b9b, 0x0b9d, 0x0b9d, 0x0ba0, 0x0ba2, 0x0ba5, 0x0ba7, 0x0bab, 0x0bad, 0x0bb6, 0x0bb6, 0x0bba, 0x0bbd, 0x0bc3, 0x0bc5, 0x0bc9, 0x0bc9, 0x0bce, 0x0bd6, 0x0bd8, 0x0be6, 0x0bf3, 0x0c00, 0x0c04, 0x0c04, 0x0c0d, 0x0c0d, 0x0c11, 0x0c11, 0x0c29, 0x0c29, 0x0c34, 0x0c34, 0x0c3a, 0x0c3d, 0x0c45, 0x0c45, 0x0c49, 0x0c49, 0x0c4e, 0x0c54, 0x0c57, 0x0c5f, 0x0c62, 0x0c65, 0x0c70, 0x0c81, 0x0c84, 0x0c84, 0x0c8d, 0x0c8d, 0x0c91, 0x0c91, 0x0ca9, 0x0ca9, 0x0cb4, 0x0cb4, 0x0cba, 0x0cbd, 0x0cc5, 0x0cc5, 0x0cc9, 0x0cc9, 0x0cce, 0x0cd4, 0x0cd7, 0x0cdd, 0x0cdf, 0x0cdf, 0x0ce2, 0x0ce5, 0x0cf0, 0x0d01, 0x0d04, 0x0d04, 0x0d0d, 0x0d0d, 0x0d11, 0x0d11, 0x0d29, 0x0d29, 0x0d3a, 0x0d3d, 0x0d44, 0x0d45, 0x0d49, 0x0d49, 0x0d4e, 0x0d56, 0x0d58, 0x0d5f, 0x0d62, 0x0d65, 0x0d70, 0x0d81, 0x0d84, 0x0d84, 0x0d97, 0x0d99, 0x0db2, 0x0db2, 0x0dbc, 0x0dbc, 0x0dbe, 0x0dbf, 0x0dc7, 0x0dc9, 0x0dcb, 0x0dce, 0x0dd5, 0x0dd5, 0x0dd7, 0x0dd7, 0x0de0, 0x0df1, 0x0df5, 0x0e00, 0x0e3b, 0x0e3e, 0x0e5c, 0x0e80, 0x0e83, 0x0e83, 0x0e85, 0x0e86, 0x0e89, 0x0e89, 0x0e8b, 0x0e8c, 0x0e8e, 0x0e93, 0x0e98, 0x0e98, 0x0ea0, 0x0ea0, 0x0ea4, 0x0ea4, 0x0ea6, 0x0ea6, 0x0ea8, 0x0ea9, 0x0eac, 0x0eac, 0x0eba, 0x0eba, 0x0ebe, 0x0ebf, 0x0ec5, 0x0ec5, 0x0ec7, 0x0ec7, 0x0ece, 0x0ecf, 0x0eda, 0x0edb, 0x0ede, 0x0eff, 0x0f48, 0x0f48, 0x0f6b, 0x0f70, 0x0f8c, 0x0f8f, 0x0f98, 0x0f98, 0x0fbd, 0x0fbd, 0x0fcd, 0x0fce, 0x0fd0, 0x0fff, 0x1022, 0x1022, 0x1028, 0x1028, 0x102b, 0x102b, 0x1033, 0x1035, 0x103a, 0x103f, 0x105a, 0x109f, 0x10c6, 0x10cf, 0x10f9, 0x10fa, 0x10fc, 0x10ff, 0x115a, 0x115e, 0x11a3, 0x11a7, 0x11fa, 0x11ff, 0x1207, 0x1207, 0x1247, 0x1247, 0x1249, 0x1249, 0x124e, 0x124f, 0x1257, 0x1257, 0x1259, 0x1259, 0x125e, 0x125f, 0x1287, 0x1287, 0x1289, 0x1289, 0x128e, 0x128f, 0x12af, 0x12af, 0x12b1, 0x12b1, 0x12b6, 0x12b7, 0x12bf, 0x12bf, 0x12c1, 0x12c1, 0x12c6, 0x12c7, 0x12cf, 0x12cf, 0x12d7, 0x12d7, 0x12ef, 0x12ef, 0x130f, 0x130f, 0x1311, 0x1311, 0x1316, 0x1317, 0x131f, 0x131f, 0x1347, 0x1347, 0x135b, 0x1360, 0x137d, 0x139f, 0x13f5, 0x1400, 0x1677, 0x167f, 0x169d, 0x169f, 0x16f1, 0x16ff, 0x170d, 0x170d, 0x1715, 0x171f, 0x1737, 0x173f, 0x1754, 0x175f, 0x176d, 0x176d, 0x1771, 0x1771, 0x1774, 0x177f, 0x17dd, 0x17df, 0x17ea, 0x17ff, 0x180f, 0x180f, 0x181a, 0x181f, 0x1878, 0x187f, 0x18aa, 0x1dff, 0x1e9c, 0x1e9f, 0x1efa, 0x1eff, 0x1f16, 0x1f17, 0x1f1e, 0x1f1f, 0x1f46, 0x1f47, 0x1f4e, 0x1f4f, 0x1f58, 0x1f58, 0x1f5a, 0x1f5a, 0x1f5c, 0x1f5c, 0x1f5e, 0x1f5e, 0x1f7e, 0x1f7f, 0x1fb5, 0x1fb5, 0x1fc5, 0x1fc5, 0x1fd4, 0x1fd5, 0x1fdc, 0x1fdc, 0x1ff0, 0x1ff1, 0x1ff5, 0x1ff5, 0x1fff, 0x1fff, 0x2053, 0x2056, 0x2058, 0x205e, 0x2064, 0x2069, 0x2072, 0x2073, 0x208f, 0x209f, 0x20b2, 0x20cf, 0x20eb, 0x20ff, 0x213b, 0x213c, 0x214c, 0x2152, 0x2184, 0x218f, 0x23cf, 0x23ff, 0x2427, 0x243f, 0x244b, 0x245f, 0x24ff, 0x24ff, 0x2614, 0x2615, 0x2618, 0x2618, 0x267e, 0x267f, 0x268a, 0x2700, 0x2705, 0x2705, 0x270a, 0x270b, 0x2728, 0x2728, 0x274c, 0x274c, 0x274e, 0x274e, 0x2753, 0x2755, 0x2757, 0x2757, 0x275f, 0x2760, 0x2795, 0x2797, 0x27b0, 0x27b0, 0x27bf, 0x27cf, 0x27ec, 0x27ef, 0x2b00, 0x2e7f, 0x2e9a, 0x2e9a, 0x2ef4, 0x2eff, 0x2fd6, 0x2fef, 0x2ffc, 0x2fff, 0x3040, 0x3040, 0x3097, 0x3098, 0x3100, 0x3104, 0x312d, 0x3130, 0x318f, 0x318f, 0x31b8, 0x31ef, 0x321d, 0x321f, 0x3244, 0x3250, 0x327c, 0x327e, 0x32cc, 0x32cf, 0x32ff, 0x32ff, 0x3377, 0x337a, 0x33de, 0x33df, 0x33ff, 0x33ff, 0x4db6, 0x4dff, 0x9fa6, 0x9fff, 0xa48d, 0xa48f, 0xa4c7, 0xabff, 0xd7a4, 0xd7ff, 0xfa2e, 0xfa2f, 0xfa6b, 0xfaff, 0xfb07, 0xfb12, 0xfb18, 0xfb1c, 0xfb37, 0xfb37, 0xfb3d, 0xfb3d, 0xfb3f, 0xfb3f, 0xfb42, 0xfb42, 0xfb45, 0xfb45, 0xfbb2, 0xfbd2, 0xfd40, 0xfd4f, 0xfd90, 0xfd91, 0xfdc8, 0xfdcf, 0xfdfd, 0xfdff, 0xfe10, 0xfe1f, 0xfe24, 0xfe2f, 0xfe47, 0xfe48, 0xfe53, 0xfe53, 0xfe67, 0xfe67, 0xfe6c, 0xfe6f, 0xfe75, 0xfe75, 0xfefd, 0xfefe, 0xff00, 0xff00, 0xffbf, 0xffc1, 0xffc8, 0xffc9, 0xffd0, 0xffd1, 0xffd8, 0xffd9, 0xffdd, 0xffdf, 0xffe7, 0xffe7, 0xffef, 0xfff8, 0x10000, 0x102ff, 0x1031f, 0x1031f, 0x10324, 0x1032f, 0x1034b, 0x103ff, 0x10426, 0x10427, 0x1044e, 0x1cfff, 0x1d0f6, 0x1d0ff, 0x1d127, 0x1d129, 0x1d1de, 0x1d3ff, 0x1d455, 0x1d455, 0x1d49d, 0x1d49d, 0x1d4a0, 0x1d4a1, 0x1d4a3, 0x1d4a4, 0x1d4a7, 0x1d4a8, 0x1d4ad, 0x1d4ad, 0x1d4ba, 0x1d4ba, 0x1d4bc, 0x1d4bc, 0x1d4c1, 0x1d4c1, 0x1d4c4, 0x1d4c4, 0x1d506, 0x1d506, 0x1d50b, 0x1d50c, 0x1d515, 0x1d515, 0x1d51d, 0x1d51d, 0x1d53a, 0x1d53a, 0x1d53f, 0x1d53f, 0x1d545, 0x1d545, 0x1d547, 0x1d549, 0x1d551, 0x1d551, 0x1d6a4, 0x1d6a7, 0x1d7ca, 0x1d7cd, 0x1d800, 0x1fffd, 0x2a6d7, 0x2f7ff, 0x2fa1e, 0x2fffd, 0x30000, 0x3fffd, 0x40000, 0x4fffd, 0x50000, 0x5fffd, 0x60000, 0x6fffd, 0x70000, 0x7fffd, 0x80000, 0x8fffd, 0x90000, 0x9fffd, 0xa0000, 0xafffd, 0xb0000, 0xbfffd, 0xc0000, 0xcfffd, 0xd0000, 0xdfffd, 0xe0000, 0xe0000, 0xe0002, 0xe001f, 0xe0080, 0xefffd]; // prettier-ignore-end

var isUnassignedCodePoint = function isUnassignedCodePoint(character) {
  return inRange(character, unassigned_code_points);
}; // prettier-ignore-start

/**
 * B.1 Commonly mapped to nothing
 * @link https://tools.ietf.org/html/rfc3454#appendix-B.1
 */


var commonly_mapped_to_nothing = [0x00ad, 0x00ad, 0x034f, 0x034f, 0x1806, 0x1806, 0x180b, 0x180b, 0x180c, 0x180c, 0x180d, 0x180d, 0x200b, 0x200b, 0x200c, 0x200c, 0x200d, 0x200d, 0x2060, 0x2060, 0xfe00, 0xfe00, 0xfe01, 0xfe01, 0xfe02, 0xfe02, 0xfe03, 0xfe03, 0xfe04, 0xfe04, 0xfe05, 0xfe05, 0xfe06, 0xfe06, 0xfe07, 0xfe07, 0xfe08, 0xfe08, 0xfe09, 0xfe09, 0xfe0a, 0xfe0a, 0xfe0b, 0xfe0b, 0xfe0c, 0xfe0c, 0xfe0d, 0xfe0d, 0xfe0e, 0xfe0e, 0xfe0f, 0xfe0f, 0xfeff, 0xfeff]; // prettier-ignore-end

var isCommonlyMappedToNothing = function isCommonlyMappedToNothing(character) {
  return inRange(character, commonly_mapped_to_nothing);
}; // prettier-ignore-start

/**
 * C.1.2 Non-ASCII space characters
 * @link https://tools.ietf.org/html/rfc3454#appendix-C.1.2
 */


var non_ASCII_space_characters = [0x00a0, 0x00a0
/* NO-BREAK SPACE */
, 0x1680, 0x1680
/* OGHAM SPACE MARK */
, 0x2000, 0x2000
/* EN QUAD */
, 0x2001, 0x2001
/* EM QUAD */
, 0x2002, 0x2002
/* EN SPACE */
, 0x2003, 0x2003
/* EM SPACE */
, 0x2004, 0x2004
/* THREE-PER-EM SPACE */
, 0x2005, 0x2005
/* FOUR-PER-EM SPACE */
, 0x2006, 0x2006
/* SIX-PER-EM SPACE */
, 0x2007, 0x2007
/* FIGURE SPACE */
, 0x2008, 0x2008
/* PUNCTUATION SPACE */
, 0x2009, 0x2009
/* THIN SPACE */
, 0x200a, 0x200a
/* HAIR SPACE */
, 0x200b, 0x200b
/* ZERO WIDTH SPACE */
, 0x202f, 0x202f
/* NARROW NO-BREAK SPACE */
, 0x205f, 0x205f
/* MEDIUM MATHEMATICAL SPACE */
, 0x3000, 0x3000
/* IDEOGRAPHIC SPACE */
]; // prettier-ignore-end

var isNonASCIISpaceCharacter = function isNonASCIISpaceCharacter(character) {
  return inRange(character, non_ASCII_space_characters);
}; // prettier-ignore-start


var non_ASCII_controls_characters = [
/**
 * C.2.2 Non-ASCII control characters
 * @link https://tools.ietf.org/html/rfc3454#appendix-C.2.2
 */
0x0080, 0x009f
/* [CONTROL CHARACTERS] */
, 0x06dd, 0x06dd
/* ARABIC END OF AYAH */
, 0x070f, 0x070f
/* SYRIAC ABBREVIATION MARK */
, 0x180e, 0x180e
/* MONGOLIAN VOWEL SEPARATOR */
, 0x200c, 0x200c
/* ZERO WIDTH NON-JOINER */
, 0x200d, 0x200d
/* ZERO WIDTH JOINER */
, 0x2028, 0x2028
/* LINE SEPARATOR */
, 0x2029, 0x2029
/* PARAGRAPH SEPARATOR */
, 0x2060, 0x2060
/* WORD JOINER */
, 0x2061, 0x2061
/* FUNCTION APPLICATION */
, 0x2062, 0x2062
/* INVISIBLE TIMES */
, 0x2063, 0x2063
/* INVISIBLE SEPARATOR */
, 0x206a, 0x206f
/* [CONTROL CHARACTERS] */
, 0xfeff, 0xfeff
/* ZERO WIDTH NO-BREAK SPACE */
, 0xfff9, 0xfffc
/* [CONTROL CHARACTERS] */
, 0x1d173, 0x1d17a
/* [MUSICAL CONTROL CHARACTERS] */
];
var non_character_codepoints = [
/**
 * C.4 Non-character code points
 * @link https://tools.ietf.org/html/rfc3454#appendix-C.4
 */
0xfdd0, 0xfdef
/* [NONCHARACTER CODE POINTS] */
, 0xfffe, 0xffff
/* [NONCHARACTER CODE POINTS] */
, 0x1fffe, 0x1ffff
/* [NONCHARACTER CODE POINTS] */
, 0x2fffe, 0x2ffff
/* [NONCHARACTER CODE POINTS] */
, 0x3fffe, 0x3ffff
/* [NONCHARACTER CODE POINTS] */
, 0x4fffe, 0x4ffff
/* [NONCHARACTER CODE POINTS] */
, 0x5fffe, 0x5ffff
/* [NONCHARACTER CODE POINTS] */
, 0x6fffe, 0x6ffff
/* [NONCHARACTER CODE POINTS] */
, 0x7fffe, 0x7ffff
/* [NONCHARACTER CODE POINTS] */
, 0x8fffe, 0x8ffff
/* [NONCHARACTER CODE POINTS] */
, 0x9fffe, 0x9ffff
/* [NONCHARACTER CODE POINTS] */
, 0xafffe, 0xaffff
/* [NONCHARACTER CODE POINTS] */
, 0xbfffe, 0xbffff
/* [NONCHARACTER CODE POINTS] */
, 0xcfffe, 0xcffff
/* [NONCHARACTER CODE POINTS] */
, 0xdfffe, 0xdffff
/* [NONCHARACTER CODE POINTS] */
, 0xefffe, 0xeffff
/* [NONCHARACTER CODE POINTS] */
, 0x10fffe, 0x10ffff
/* [NONCHARACTER CODE POINTS] */
];
/**
 * 2.3.  Prohibited Output
 */

var prohibited_characters = [
/**
 * C.2.1 ASCII control characters
 * @link https://tools.ietf.org/html/rfc3454#appendix-C.2.1
 */
0, 0x001f
/* [CONTROL CHARACTERS] */
, 0x007f, 0x007f
/* DELETE */
,
/**
 * C.8 Change display properties or are deprecated
 * @link https://tools.ietf.org/html/rfc3454#appendix-C.8
 */
0x0340, 0x0340
/* COMBINING GRAVE TONE MARK */
, 0x0341, 0x0341
/* COMBINING ACUTE TONE MARK */
, 0x200e, 0x200e
/* LEFT-TO-RIGHT MARK */
, 0x200f, 0x200f
/* RIGHT-TO-LEFT MARK */
, 0x202a, 0x202a
/* LEFT-TO-RIGHT EMBEDDING */
, 0x202b, 0x202b
/* RIGHT-TO-LEFT EMBEDDING */
, 0x202c, 0x202c
/* POP DIRECTIONAL FORMATTING */
, 0x202d, 0x202d
/* LEFT-TO-RIGHT OVERRIDE */
, 0x202e, 0x202e
/* RIGHT-TO-LEFT OVERRIDE */
, 0x206a, 0x206a
/* INHIBIT SYMMETRIC SWAPPING */
, 0x206b, 0x206b
/* ACTIVATE SYMMETRIC SWAPPING */
, 0x206c, 0x206c
/* INHIBIT ARABIC FORM SHAPING */
, 0x206d, 0x206d
/* ACTIVATE ARABIC FORM SHAPING */
, 0x206e, 0x206e
/* NATIONAL DIGIT SHAPES */
, 0x206f, 0x206f
/* NOMINAL DIGIT SHAPES */
,
/**
 * C.7 Inappropriate for canonical representation
 * @link https://tools.ietf.org/html/rfc3454#appendix-C.7
 */
0x2ff0, 0x2ffb
/* [IDEOGRAPHIC DESCRIPTION CHARACTERS] */
,
/**
 * C.5 Surrogate codes
 * @link https://tools.ietf.org/html/rfc3454#appendix-C.5
 */
0xd800, 0xdfff,
/**
 * C.3 Private use
 * @link https://tools.ietf.org/html/rfc3454#appendix-C.3
 */
0xe000, 0xf8ff
/* [PRIVATE USE, PLANE 0] */
,
/**
 * C.6 Inappropriate for plain text
 * @link https://tools.ietf.org/html/rfc3454#appendix-C.6
 */
0xfff9, 0xfff9
/* INTERLINEAR ANNOTATION ANCHOR */
, 0xfffa, 0xfffa
/* INTERLINEAR ANNOTATION SEPARATOR */
, 0xfffb, 0xfffb
/* INTERLINEAR ANNOTATION TERMINATOR */
, 0xfffc, 0xfffc
/* OBJECT REPLACEMENT CHARACTER */
, 0xfffd, 0xfffd
/* REPLACEMENT CHARACTER */
,
/**
 * C.9 Tagging characters
 * @link https://tools.ietf.org/html/rfc3454#appendix-C.9
 */
0xe0001, 0xe0001
/* LANGUAGE TAG */
, 0xe0020, 0xe007f
/* [TAGGING CHARACTERS] */
,
/**
 * C.3 Private use
 * @link https://tools.ietf.org/html/rfc3454#appendix-C.3
 */
0xf0000, 0xffffd
/* [PRIVATE USE, PLANE 15] */
, 0x100000, 0x10fffd
/* [PRIVATE USE, PLANE 16] */
]; // prettier-ignore-end

var isProhibitedCharacter = function isProhibitedCharacter(character) {
  return inRange(character, non_ASCII_space_characters) || inRange(character, prohibited_characters) || inRange(character, non_ASCII_controls_characters) || inRange(character, non_character_codepoints);
}; // prettier-ignore-start

/**
 * D.1 Characters with bidirectional property "R" or "AL"
 * @link https://tools.ietf.org/html/rfc3454#appendix-D.1
 */


var bidirectional_r_al = [0x05be, 0x05be, 0x05c0, 0x05c0, 0x05c3, 0x05c3, 0x05d0, 0x05ea, 0x05f0, 0x05f4, 0x061b, 0x061b, 0x061f, 0x061f, 0x0621, 0x063a, 0x0640, 0x064a, 0x066d, 0x066f, 0x0671, 0x06d5, 0x06dd, 0x06dd, 0x06e5, 0x06e6, 0x06fa, 0x06fe, 0x0700, 0x070d, 0x0710, 0x0710, 0x0712, 0x072c, 0x0780, 0x07a5, 0x07b1, 0x07b1, 0x200f, 0x200f, 0xfb1d, 0xfb1d, 0xfb1f, 0xfb28, 0xfb2a, 0xfb36, 0xfb38, 0xfb3c, 0xfb3e, 0xfb3e, 0xfb40, 0xfb41, 0xfb43, 0xfb44, 0xfb46, 0xfbb1, 0xfbd3, 0xfd3d, 0xfd50, 0xfd8f, 0xfd92, 0xfdc7, 0xfdf0, 0xfdfc, 0xfe70, 0xfe74, 0xfe76, 0xfefc]; // prettier-ignore-end

var isBidirectionalRAL = function isBidirectionalRAL(character) {
  return inRange(character, bidirectional_r_al);
}; // prettier-ignore-start

/**
 * D.2 Characters with bidirectional property "L"
 * @link https://tools.ietf.org/html/rfc3454#appendix-D.2
 */


var bidirectional_l = [0x0041, 0x005a, 0x0061, 0x007a, 0x00aa, 0x00aa, 0x00b5, 0x00b5, 0x00ba, 0x00ba, 0x00c0, 0x00d6, 0x00d8, 0x00f6, 0x00f8, 0x0220, 0x0222, 0x0233, 0x0250, 0x02ad, 0x02b0, 0x02b8, 0x02bb, 0x02c1, 0x02d0, 0x02d1, 0x02e0, 0x02e4, 0x02ee, 0x02ee, 0x037a, 0x037a, 0x0386, 0x0386, 0x0388, 0x038a, 0x038c, 0x038c, 0x038e, 0x03a1, 0x03a3, 0x03ce, 0x03d0, 0x03f5, 0x0400, 0x0482, 0x048a, 0x04ce, 0x04d0, 0x04f5, 0x04f8, 0x04f9, 0x0500, 0x050f, 0x0531, 0x0556, 0x0559, 0x055f, 0x0561, 0x0587, 0x0589, 0x0589, 0x0903, 0x0903, 0x0905, 0x0939, 0x093d, 0x0940, 0x0949, 0x094c, 0x0950, 0x0950, 0x0958, 0x0961, 0x0964, 0x0970, 0x0982, 0x0983, 0x0985, 0x098c, 0x098f, 0x0990, 0x0993, 0x09a8, 0x09aa, 0x09b0, 0x09b2, 0x09b2, 0x09b6, 0x09b9, 0x09be, 0x09c0, 0x09c7, 0x09c8, 0x09cb, 0x09cc, 0x09d7, 0x09d7, 0x09dc, 0x09dd, 0x09df, 0x09e1, 0x09e6, 0x09f1, 0x09f4, 0x09fa, 0x0a05, 0x0a0a, 0x0a0f, 0x0a10, 0x0a13, 0x0a28, 0x0a2a, 0x0a30, 0x0a32, 0x0a33, 0x0a35, 0x0a36, 0x0a38, 0x0a39, 0x0a3e, 0x0a40, 0x0a59, 0x0a5c, 0x0a5e, 0x0a5e, 0x0a66, 0x0a6f, 0x0a72, 0x0a74, 0x0a83, 0x0a83, 0x0a85, 0x0a8b, 0x0a8d, 0x0a8d, 0x0a8f, 0x0a91, 0x0a93, 0x0aa8, 0x0aaa, 0x0ab0, 0x0ab2, 0x0ab3, 0x0ab5, 0x0ab9, 0x0abd, 0x0ac0, 0x0ac9, 0x0ac9, 0x0acb, 0x0acc, 0x0ad0, 0x0ad0, 0x0ae0, 0x0ae0, 0x0ae6, 0x0aef, 0x0b02, 0x0b03, 0x0b05, 0x0b0c, 0x0b0f, 0x0b10, 0x0b13, 0x0b28, 0x0b2a, 0x0b30, 0x0b32, 0x0b33, 0x0b36, 0x0b39, 0x0b3d, 0x0b3e, 0x0b40, 0x0b40, 0x0b47, 0x0b48, 0x0b4b, 0x0b4c, 0x0b57, 0x0b57, 0x0b5c, 0x0b5d, 0x0b5f, 0x0b61, 0x0b66, 0x0b70, 0x0b83, 0x0b83, 0x0b85, 0x0b8a, 0x0b8e, 0x0b90, 0x0b92, 0x0b95, 0x0b99, 0x0b9a, 0x0b9c, 0x0b9c, 0x0b9e, 0x0b9f, 0x0ba3, 0x0ba4, 0x0ba8, 0x0baa, 0x0bae, 0x0bb5, 0x0bb7, 0x0bb9, 0x0bbe, 0x0bbf, 0x0bc1, 0x0bc2, 0x0bc6, 0x0bc8, 0x0bca, 0x0bcc, 0x0bd7, 0x0bd7, 0x0be7, 0x0bf2, 0x0c01, 0x0c03, 0x0c05, 0x0c0c, 0x0c0e, 0x0c10, 0x0c12, 0x0c28, 0x0c2a, 0x0c33, 0x0c35, 0x0c39, 0x0c41, 0x0c44, 0x0c60, 0x0c61, 0x0c66, 0x0c6f, 0x0c82, 0x0c83, 0x0c85, 0x0c8c, 0x0c8e, 0x0c90, 0x0c92, 0x0ca8, 0x0caa, 0x0cb3, 0x0cb5, 0x0cb9, 0x0cbe, 0x0cbe, 0x0cc0, 0x0cc4, 0x0cc7, 0x0cc8, 0x0cca, 0x0ccb, 0x0cd5, 0x0cd6, 0x0cde, 0x0cde, 0x0ce0, 0x0ce1, 0x0ce6, 0x0cef, 0x0d02, 0x0d03, 0x0d05, 0x0d0c, 0x0d0e, 0x0d10, 0x0d12, 0x0d28, 0x0d2a, 0x0d39, 0x0d3e, 0x0d40, 0x0d46, 0x0d48, 0x0d4a, 0x0d4c, 0x0d57, 0x0d57, 0x0d60, 0x0d61, 0x0d66, 0x0d6f, 0x0d82, 0x0d83, 0x0d85, 0x0d96, 0x0d9a, 0x0db1, 0x0db3, 0x0dbb, 0x0dbd, 0x0dbd, 0x0dc0, 0x0dc6, 0x0dcf, 0x0dd1, 0x0dd8, 0x0ddf, 0x0df2, 0x0df4, 0x0e01, 0x0e30, 0x0e32, 0x0e33, 0x0e40, 0x0e46, 0x0e4f, 0x0e5b, 0x0e81, 0x0e82, 0x0e84, 0x0e84, 0x0e87, 0x0e88, 0x0e8a, 0x0e8a, 0x0e8d, 0x0e8d, 0x0e94, 0x0e97, 0x0e99, 0x0e9f, 0x0ea1, 0x0ea3, 0x0ea5, 0x0ea5, 0x0ea7, 0x0ea7, 0x0eaa, 0x0eab, 0x0ead, 0x0eb0, 0x0eb2, 0x0eb3, 0x0ebd, 0x0ebd, 0x0ec0, 0x0ec4, 0x0ec6, 0x0ec6, 0x0ed0, 0x0ed9, 0x0edc, 0x0edd, 0x0f00, 0x0f17, 0x0f1a, 0x0f34, 0x0f36, 0x0f36, 0x0f38, 0x0f38, 0x0f3e, 0x0f47, 0x0f49, 0x0f6a, 0x0f7f, 0x0f7f, 0x0f85, 0x0f85, 0x0f88, 0x0f8b, 0x0fbe, 0x0fc5, 0x0fc7, 0x0fcc, 0x0fcf, 0x0fcf, 0x1000, 0x1021, 0x1023, 0x1027, 0x1029, 0x102a, 0x102c, 0x102c, 0x1031, 0x1031, 0x1038, 0x1038, 0x1040, 0x1057, 0x10a0, 0x10c5, 0x10d0, 0x10f8, 0x10fb, 0x10fb, 0x1100, 0x1159, 0x115f, 0x11a2, 0x11a8, 0x11f9, 0x1200, 0x1206, 0x1208, 0x1246, 0x1248, 0x1248, 0x124a, 0x124d, 0x1250, 0x1256, 0x1258, 0x1258, 0x125a, 0x125d, 0x1260, 0x1286, 0x1288, 0x1288, 0x128a, 0x128d, 0x1290, 0x12ae, 0x12b0, 0x12b0, 0x12b2, 0x12b5, 0x12b8, 0x12be, 0x12c0, 0x12c0, 0x12c2, 0x12c5, 0x12c8, 0x12ce, 0x12d0, 0x12d6, 0x12d8, 0x12ee, 0x12f0, 0x130e, 0x1310, 0x1310, 0x1312, 0x1315, 0x1318, 0x131e, 0x1320, 0x1346, 0x1348, 0x135a, 0x1361, 0x137c, 0x13a0, 0x13f4, 0x1401, 0x1676, 0x1681, 0x169a, 0x16a0, 0x16f0, 0x1700, 0x170c, 0x170e, 0x1711, 0x1720, 0x1731, 0x1735, 0x1736, 0x1740, 0x1751, 0x1760, 0x176c, 0x176e, 0x1770, 0x1780, 0x17b6, 0x17be, 0x17c5, 0x17c7, 0x17c8, 0x17d4, 0x17da, 0x17dc, 0x17dc, 0x17e0, 0x17e9, 0x1810, 0x1819, 0x1820, 0x1877, 0x1880, 0x18a8, 0x1e00, 0x1e9b, 0x1ea0, 0x1ef9, 0x1f00, 0x1f15, 0x1f18, 0x1f1d, 0x1f20, 0x1f45, 0x1f48, 0x1f4d, 0x1f50, 0x1f57, 0x1f59, 0x1f59, 0x1f5b, 0x1f5b, 0x1f5d, 0x1f5d, 0x1f5f, 0x1f7d, 0x1f80, 0x1fb4, 0x1fb6, 0x1fbc, 0x1fbe, 0x1fbe, 0x1fc2, 0x1fc4, 0x1fc6, 0x1fcc, 0x1fd0, 0x1fd3, 0x1fd6, 0x1fdb, 0x1fe0, 0x1fec, 0x1ff2, 0x1ff4, 0x1ff6, 0x1ffc, 0x200e, 0x200e, 0x2071, 0x2071, 0x207f, 0x207f, 0x2102, 0x2102, 0x2107, 0x2107, 0x210a, 0x2113, 0x2115, 0x2115, 0x2119, 0x211d, 0x2124, 0x2124, 0x2126, 0x2126, 0x2128, 0x2128, 0x212a, 0x212d, 0x212f, 0x2131, 0x2133, 0x2139, 0x213d, 0x213f, 0x2145, 0x2149, 0x2160, 0x2183, 0x2336, 0x237a, 0x2395, 0x2395, 0x249c, 0x24e9, 0x3005, 0x3007, 0x3021, 0x3029, 0x3031, 0x3035, 0x3038, 0x303c, 0x3041, 0x3096, 0x309d, 0x309f, 0x30a1, 0x30fa, 0x30fc, 0x30ff, 0x3105, 0x312c, 0x3131, 0x318e, 0x3190, 0x31b7, 0x31f0, 0x321c, 0x3220, 0x3243, 0x3260, 0x327b, 0x327f, 0x32b0, 0x32c0, 0x32cb, 0x32d0, 0x32fe, 0x3300, 0x3376, 0x337b, 0x33dd, 0x33e0, 0x33fe, 0x3400, 0x4db5, 0x4e00, 0x9fa5, 0xa000, 0xa48c, 0xac00, 0xd7a3, 0xd800, 0xfa2d, 0xfa30, 0xfa6a, 0xfb00, 0xfb06, 0xfb13, 0xfb17, 0xff21, 0xff3a, 0xff41, 0xff5a, 0xff66, 0xffbe, 0xffc2, 0xffc7, 0xffca, 0xffcf, 0xffd2, 0xffd7, 0xffda, 0xffdc, 0x10300, 0x1031e, 0x10320, 0x10323, 0x10330, 0x1034a, 0x10400, 0x10425, 0x10428, 0x1044d, 0x1d000, 0x1d0f5, 0x1d100, 0x1d126, 0x1d12a, 0x1d166, 0x1d16a, 0x1d172, 0x1d183, 0x1d184, 0x1d18c, 0x1d1a9, 0x1d1ae, 0x1d1dd, 0x1d400, 0x1d454, 0x1d456, 0x1d49c, 0x1d49e, 0x1d49f, 0x1d4a2, 0x1d4a2, 0x1d4a5, 0x1d4a6, 0x1d4a9, 0x1d4ac, 0x1d4ae, 0x1d4b9, 0x1d4bb, 0x1d4bb, 0x1d4bd, 0x1d4c0, 0x1d4c2, 0x1d4c3, 0x1d4c5, 0x1d505, 0x1d507, 0x1d50a, 0x1d50d, 0x1d514, 0x1d516, 0x1d51c, 0x1d51e, 0x1d539, 0x1d53b, 0x1d53e, 0x1d540, 0x1d544, 0x1d546, 0x1d546, 0x1d54a, 0x1d550, 0x1d552, 0x1d6a3, 0x1d6a8, 0x1d7c9, 0x20000, 0x2a6d6, 0x2f800, 0x2fa1d, 0xf0000, 0xffffd, 0x100000, 0x10fffd]; // prettier-ignore-end

var isBidirectionalL = function isBidirectionalL(character) {
  return inRange(character, bidirectional_l);
};

/**
 * non-ASCII space characters [StringPrep, C.1.2] that can be
 * mapped to SPACE (U+0020)
 */

var mapping2space = isNonASCIISpaceCharacter;
/**
 * the "commonly mapped to nothing" characters [StringPrep, B.1]
 * that can be mapped to nothing.
 */

var mapping2nothing = isCommonlyMappedToNothing; // utils

var getCodePoint = function getCodePoint(character) {
  return character.codePointAt(0);
};

var first = function first(x) {
  return x[0];
};

var last = function last(x) {
  return x[x.length - 1];
};
/**
 * Convert provided string into an array of Unicode Code Points.
 * Based on https://stackoverflow.com/a/21409165/1556249
 * and https://www.npmjs.com/package/code-point-at.
 * @param {string} input
 * @returns {number[]}
 */


function toCodePoints(input) {
  var codepoints = [];
  var size = input.length;

  for (var i = 0; i < size; i += 1) {
    var before = input.charCodeAt(i);

    if (before >= 0xd800 && before <= 0xdbff && size > i + 1) {
      var next = input.charCodeAt(i + 1);

      if (next >= 0xdc00 && next <= 0xdfff) {
        codepoints.push((before - 0xd800) * 0x400 + next - 0xdc00 + 0x10000);
        i += 1;
        continue;
      }
    }

    codepoints.push(before);
  }

  return codepoints;
}
/**
 * SASLprep.
 * @param {string} input
 * @param {Object} opts
 * @param {boolean} opts.allowUnassigned
 * @returns {string}
 */


function saslprep(input) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof input !== 'string') {
    throw new TypeError('Expected string.');
  }

  if (input.length === 0) {
    return '';
  } // 1. Map


  var mapped_input = toCodePoints(input) // 1.1 mapping to space
  .map(function (character) {
    return mapping2space(character) ? 0x20 : character;
  }) // 1.2 mapping to nothing
  .filter(function (character) {
    return !mapping2nothing(character);
  }); // 2. Normalize

  var normalized_input = String.fromCodePoint.apply(null, mapped_input).normalize('NFKC');
  var normalized_map = toCodePoints(normalized_input); // 3. Prohibit

  var hasProhibited = normalized_map.some(isProhibitedCharacter);

  if (hasProhibited) {
    throw new Error('Prohibited character, see https://tools.ietf.org/html/rfc4013#section-2.3');
  } // Unassigned Code Points


  if (opts.allowUnassigned !== true) {
    var hasUnassigned = normalized_map.some(isUnassignedCodePoint);

    if (hasUnassigned) {
      throw new Error('Unassigned code point, see https://tools.ietf.org/html/rfc4013#section-2.5');
    }
  } // 4. check bidi


  var hasBidiRAL = normalized_map.some(isBidirectionalRAL);
  var hasBidiL = normalized_map.some(isBidirectionalL); // 4.1 If a string contains any RandALCat character, the string MUST NOT
  // contain any LCat character.

  if (hasBidiRAL && hasBidiL) {
    throw new Error('String must not contain RandALCat and LCat at the same time,' + ' see https://tools.ietf.org/html/rfc3454#section-6');
  }
  /**
   * 4.2 If a string contains any RandALCat character, a RandALCat
   * character MUST be the first character of the string, and a
   * RandALCat character MUST be the last character of the string.
   */


  var isFirstBidiRAL = isBidirectionalRAL(getCodePoint(first(normalized_input)));
  var isLastBidiRAL = isBidirectionalRAL(getCodePoint(last(normalized_input)));

  if (hasBidiRAL && !(isFirstBidiRAL && isLastBidiRAL)) {
    throw new Error('Bidirectional RandALCat character must be the first and the last' + ' character of the string, see https://tools.ietf.org/html/rfc3454#section-6');
  }

  return normalized_input;
}

var PDFSecurity = /*#__PURE__*/function () {
  function PDFSecurity(document) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PDFSecurity);

    if (!options.ownerPassword && !options.userPassword) {
      throw new Error('None of owner password and user password is defined.');
    }

    this.document = document;

    this._setupEncryption(options);
  }

  _createClass(PDFSecurity, [{
    key: "_setupEncryption",
    value: function _setupEncryption(options) {
      switch (options.pdfVersion) {
        case '1.4':
        case '1.5':
          this.version = 2;
          break;

        case '1.6':
        case '1.7':
          this.version = 4;
          break;

        case '1.7ext3':
          this.version = 5;
          break;

        default:
          this.version = 1;
          break;
      }

      var encDict = {
        Filter: 'Standard'
      };

      switch (this.version) {
        case 1:
        case 2:
        case 4:
          this._setupEncryptionV1V2V4(this.version, encDict, options);

          break;

        case 5:
          this._setupEncryptionV5(encDict, options);

          break;
      }

      this.dictionary = this.document.ref(encDict);
    }
  }, {
    key: "_setupEncryptionV1V2V4",
    value: function _setupEncryptionV1V2V4(v, encDict, options) {
      var r, permissions;

      switch (v) {
        case 1:
          r = 2;
          this.keyBits = 40;
          permissions = getPermissionsR2(options.permissions);
          break;

        case 2:
          r = 3;
          this.keyBits = 128;
          permissions = getPermissionsR3(options.permissions);
          break;

        case 4:
          r = 4;
          this.keyBits = 128;
          permissions = getPermissionsR3(options.permissions);
          break;
      }

      var paddedUserPassword = processPasswordR2R3R4(options.userPassword);
      var paddedOwnerPassword = options.ownerPassword ? processPasswordR2R3R4(options.ownerPassword) : paddedUserPassword;
      var ownerPasswordEntry = getOwnerPasswordR2R3R4(r, this.keyBits, paddedUserPassword, paddedOwnerPassword);
      this.encryptionKey = getEncryptionKeyR2R3R4(r, this.keyBits, this.document._id, paddedUserPassword, ownerPasswordEntry, permissions);
      var userPasswordEntry;

      if (r === 2) {
        userPasswordEntry = getUserPasswordR2(this.encryptionKey);
      } else {
        userPasswordEntry = getUserPasswordR3R4(this.document._id, this.encryptionKey);
      }

      encDict.V = v;

      if (v >= 2) {
        encDict.Length = this.keyBits;
      }

      if (v === 4) {
        encDict.CF = {
          StdCF: {
            AuthEvent: 'DocOpen',
            CFM: 'AESV2',
            Length: this.keyBits / 8
          }
        };
        encDict.StmF = 'StdCF';
        encDict.StrF = 'StdCF';
      }

      encDict.R = r;
      encDict.O = wordArrayToBuffer(ownerPasswordEntry);
      encDict.U = wordArrayToBuffer(userPasswordEntry);
      encDict.P = permissions;
    }
  }, {
    key: "_setupEncryptionV5",
    value: function _setupEncryptionV5(encDict, options) {
      this.keyBits = 256;
      var permissions = getPermissionsR3(options.permissions);
      var processedUserPassword = processPasswordR5(options.userPassword);
      var processedOwnerPassword = options.ownerPassword ? processPasswordR5(options.ownerPassword) : processedUserPassword;
      this.encryptionKey = getEncryptionKeyR5(PDFSecurity.generateRandomWordArray);
      var userPasswordEntry = getUserPasswordR5(processedUserPassword, PDFSecurity.generateRandomWordArray);
      var userKeySalt = CryptoJS.lib.WordArray.create(userPasswordEntry.words.slice(10, 12), 8);
      var userEncryptionKeyEntry = getUserEncryptionKeyR5(processedUserPassword, userKeySalt, this.encryptionKey);
      var ownerPasswordEntry = getOwnerPasswordR5(processedOwnerPassword, userPasswordEntry, PDFSecurity.generateRandomWordArray);
      var ownerKeySalt = CryptoJS.lib.WordArray.create(ownerPasswordEntry.words.slice(10, 12), 8);
      var ownerEncryptionKeyEntry = getOwnerEncryptionKeyR5(processedOwnerPassword, ownerKeySalt, userPasswordEntry, this.encryptionKey);
      var permsEntry = getEncryptedPermissionsR5(permissions, this.encryptionKey, PDFSecurity.generateRandomWordArray);
      encDict.V = 5;
      encDict.Length = this.keyBits;
      encDict.CF = {
        StdCF: {
          AuthEvent: 'DocOpen',
          CFM: 'AESV3',
          Length: this.keyBits / 8
        }
      };
      encDict.StmF = 'StdCF';
      encDict.StrF = 'StdCF';
      encDict.R = 5;
      encDict.O = wordArrayToBuffer(ownerPasswordEntry);
      encDict.OE = wordArrayToBuffer(ownerEncryptionKeyEntry);
      encDict.U = wordArrayToBuffer(userPasswordEntry);
      encDict.UE = wordArrayToBuffer(userEncryptionKeyEntry);
      encDict.P = permissions;
      encDict.Perms = wordArrayToBuffer(permsEntry);
    }
  }, {
    key: "getEncryptFn",
    value: function getEncryptFn(obj, gen) {
      var digest;

      if (this.version < 5) {
        digest = this.encryptionKey.clone().concat(CryptoJS.lib.WordArray.create([(obj & 0xff) << 24 | (obj & 0xff00) << 8 | obj >> 8 & 0xff00 | gen & 0xff, (gen & 0xff00) << 16], 5));
      }

      if (this.version === 1 || this.version === 2) {
        var _key = CryptoJS.MD5(digest);

        _key.sigBytes = Math.min(16, this.keyBits / 8 + 5);
        return function (buffer) {
          return wordArrayToBuffer(CryptoJS.RC4.encrypt(CryptoJS.lib.WordArray.create(buffer), _key).ciphertext);
        };
      }

      var key;

      if (this.version === 4) {
        key = CryptoJS.MD5(digest.concat(CryptoJS.lib.WordArray.create([0x73416c54], 4)));
      } else {
        key = this.encryptionKey;
      }

      var iv = PDFSecurity.generateRandomWordArray(16);
      var options = {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: iv
      };
      return function (buffer) {
        return wordArrayToBuffer(iv.clone().concat(CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(buffer), key, options).ciphertext));
      };
    }
  }, {
    key: "end",
    value: function end() {
      this.dictionary.end();
    }
  }], [{
    key: "generateFileID",
    value: function generateFileID() {
      var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var infoStr = "".concat(info.CreationDate.getTime(), "\n");

      for (var key in info) {
        // eslint-disable-next-line no-prototype-builtins
        if (!info.hasOwnProperty(key)) {
          continue;
        }

        infoStr += "".concat(key, ": ").concat(info[key].valueOf(), "\n");
      }

      return wordArrayToBuffer(CryptoJS.MD5(infoStr));
    }
  }, {
    key: "generateRandomWordArray",
    value: function generateRandomWordArray(bytes) {
      return CryptoJS.lib.WordArray.random(bytes);
    }
  }, {
    key: "create",
    value: function create(document) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!options.ownerPassword && !options.userPassword) {
        return null;
      }

      return new PDFSecurity(document, options);
    }
  }]);

  return PDFSecurity;
}();

function getPermissionsR2() {
  var permissionObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var permissions = 0xffffffc0 >> 0;

  if (permissionObject.printing) {
    permissions |= 4;
  }

  if (permissionObject.modifying) {
    permissions |= 8;
  }

  if (permissionObject.copying) {
    permissions |= 16;
  }

  if (permissionObject.annotating) {
    permissions |= 32;
  }

  return permissions;
}

function getPermissionsR3() {
  var permissionObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var permissions = 0xfffff0c0 >> 0;

  if (permissionObject.printing === 'lowResolution') {
    permissions |= 4;
  }

  if (permissionObject.printing === 'highResolution') {
    permissions |= 2052;
  }

  if (permissionObject.modifying) {
    permissions |= 8;
  }

  if (permissionObject.copying) {
    permissions |= 16;
  }

  if (permissionObject.annotating) {
    permissions |= 32;
  }

  if (permissionObject.fillingForms) {
    permissions |= 256;
  }

  if (permissionObject.contentAccessibility) {
    permissions |= 512;
  }

  if (permissionObject.documentAssembly) {
    permissions |= 1024;
  }

  return permissions;
}

function getUserPasswordR2(encryptionKey) {
  return CryptoJS.RC4.encrypt(processPasswordR2R3R4(), encryptionKey).ciphertext;
}

function getUserPasswordR3R4(documentId, encryptionKey) {
  var key = encryptionKey.clone();
  var cipher = CryptoJS.MD5(processPasswordR2R3R4().concat(CryptoJS.lib.WordArray.create(documentId)));

  for (var i = 0; i < 20; i++) {
    var xorRound = Math.ceil(key.sigBytes / 4);

    for (var j = 0; j < xorRound; j++) {
      key.words[j] = encryptionKey.words[j] ^ (i | i << 8 | i << 16 | i << 24);
    }

    cipher = CryptoJS.RC4.encrypt(cipher, key).ciphertext;
  }

  return cipher.concat(CryptoJS.lib.WordArray.create(null, 16));
}

function getOwnerPasswordR2R3R4(r, keyBits, paddedUserPassword, paddedOwnerPassword) {
  var digest = paddedOwnerPassword;
  var round = r >= 3 ? 51 : 1;

  for (var i = 0; i < round; i++) {
    digest = CryptoJS.MD5(digest);
  }

  var key = digest.clone();
  key.sigBytes = keyBits / 8;
  var cipher = paddedUserPassword;
  round = r >= 3 ? 20 : 1;

  for (var _i = 0; _i < round; _i++) {
    var xorRound = Math.ceil(key.sigBytes / 4);

    for (var j = 0; j < xorRound; j++) {
      key.words[j] = digest.words[j] ^ (_i | _i << 8 | _i << 16 | _i << 24);
    }

    cipher = CryptoJS.RC4.encrypt(cipher, key).ciphertext;
  }

  return cipher;
}

function getEncryptionKeyR2R3R4(r, keyBits, documentId, paddedUserPassword, ownerPasswordEntry, permissions) {
  var key = paddedUserPassword.clone().concat(ownerPasswordEntry).concat(CryptoJS.lib.WordArray.create([lsbFirstWord(permissions)], 4)).concat(CryptoJS.lib.WordArray.create(documentId));
  var round = r >= 3 ? 51 : 1;

  for (var i = 0; i < round; i++) {
    key = CryptoJS.MD5(key);
    key.sigBytes = keyBits / 8;
  }

  return key;
}

function getUserPasswordR5(processedUserPassword, generateRandomWordArray) {
  var validationSalt = generateRandomWordArray(8);
  var keySalt = generateRandomWordArray(8);
  return CryptoJS.SHA256(processedUserPassword.clone().concat(validationSalt)).concat(validationSalt).concat(keySalt);
}

function getUserEncryptionKeyR5(processedUserPassword, userKeySalt, encryptionKey) {
  var key = CryptoJS.SHA256(processedUserPassword.clone().concat(userKeySalt));
  var options = {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.NoPadding,
    iv: CryptoJS.lib.WordArray.create(null, 16)
  };
  return CryptoJS.AES.encrypt(encryptionKey, key, options).ciphertext;
}

function getOwnerPasswordR5(processedOwnerPassword, userPasswordEntry, generateRandomWordArray) {
  var validationSalt = generateRandomWordArray(8);
  var keySalt = generateRandomWordArray(8);
  return CryptoJS.SHA256(processedOwnerPassword.clone().concat(validationSalt).concat(userPasswordEntry)).concat(validationSalt).concat(keySalt);
}

function getOwnerEncryptionKeyR5(processedOwnerPassword, ownerKeySalt, userPasswordEntry, encryptionKey) {
  var key = CryptoJS.SHA256(processedOwnerPassword.clone().concat(ownerKeySalt).concat(userPasswordEntry));
  var options = {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.NoPadding,
    iv: CryptoJS.lib.WordArray.create(null, 16)
  };
  return CryptoJS.AES.encrypt(encryptionKey, key, options).ciphertext;
}

function getEncryptionKeyR5(generateRandomWordArray) {
  return generateRandomWordArray(32);
}

function getEncryptedPermissionsR5(permissions, encryptionKey, generateRandomWordArray) {
  var cipher = CryptoJS.lib.WordArray.create([lsbFirstWord(permissions), 0xffffffff, 0x54616462], 12).concat(generateRandomWordArray(4));
  var options = {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.NoPadding
  };
  return CryptoJS.AES.encrypt(cipher, encryptionKey, options).ciphertext;
}

function processPasswordR2R3R4() {
  var password = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var out = Buffer.alloc(32);
  var length = password.length;
  var index = 0;

  while (index < length && index < 32) {
    var code = password.charCodeAt(index);

    if (code > 0xff) {
      throw new Error('Password contains one or more invalid characters.');
    }

    out[index] = code;
    index++;
  }

  while (index < 32) {
    out[index] = PASSWORD_PADDING[index - length];
    index++;
  }

  return CryptoJS.lib.WordArray.create(out);
}

function processPasswordR5() {
  var password = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  password = unescape(encodeURIComponent(saslprep(password)));
  var length = Math.min(127, password.length);
  var out = Buffer.alloc(length);

  for (var i = 0; i < length; i++) {
    out[i] = password.charCodeAt(i);
  }

  return CryptoJS.lib.WordArray.create(out);
}

function lsbFirstWord(data) {
  return (data & 0xff) << 24 | (data & 0xff00) << 8 | data >> 8 & 0xff00 | data >> 24 & 0xff;
}

function wordArrayToBuffer(wordArray) {
  var byteArray = [];

  for (var i = 0; i < wordArray.sigBytes; i++) {
    byteArray.push(wordArray.words[Math.floor(i / 4)] >> 8 * (3 - i % 4) & 0xff);
  }

  return Buffer.from(byteArray);
}

var PASSWORD_PADDING = [0x28, 0xbf, 0x4e, 0x5e, 0x4e, 0x75, 0x8a, 0x41, 0x64, 0x00, 0x4e, 0x56, 0xff, 0xfa, 0x01, 0x08, 0x2e, 0x2e, 0x00, 0xb6, 0xd0, 0x68, 0x3e, 0x80, 0x2f, 0x0c, 0xa9, 0xfe, 0x64, 0x53, 0x69, 0x7a];

var number = PDFObject.number;

var PDFGradient = /*#__PURE__*/function () {
  function PDFGradient(doc) {
    _classCallCheck(this, PDFGradient);

    this.doc = doc;
    this.stops = [];
    this.embedded = false;
    this.transform = [1, 0, 0, 1, 0, 0];
  }

  _createClass(PDFGradient, [{
    key: "stop",
    value: function stop(pos, color, opacity) {
      if (opacity == null) {
        opacity = 1;
      }

      color = this.doc._normalizeColor(color);

      if (this.stops.length === 0) {
        if (color.length === 3) {
          this._colorSpace = 'DeviceRGB';
        } else if (color.length === 4) {
          this._colorSpace = 'DeviceCMYK';
        } else if (color.length === 1) {
          this._colorSpace = 'DeviceGray';
        } else {
          throw new Error('Unknown color space');
        }
      } else if (this._colorSpace === 'DeviceRGB' && color.length !== 3 || this._colorSpace === 'DeviceCMYK' && color.length !== 4 || this._colorSpace === 'DeviceGray' && color.length !== 1) {
        throw new Error('All gradient stops must use the same color space');
      }

      opacity = Math.max(0, Math.min(1, opacity));
      this.stops.push([pos, color, opacity]);
      return this;
    }
  }, {
    key: "setTransform",
    value: function setTransform(m11, m12, m21, m22, dx, dy) {
      this.transform = [m11, m12, m21, m22, dx, dy];
      return this;
    }
  }, {
    key: "embed",
    value: function embed(m) {
      var fn;
      var stopsLength = this.stops.length;

      if (stopsLength === 0) {
        return;
      }

      this.embedded = true;
      this.matrix = m; // if the last stop comes before 100%, add a copy at 100%

      var last = this.stops[stopsLength - 1];

      if (last[0] < 1) {
        this.stops.push([1, last[1], last[2]]);
      }

      var bounds = [];
      var encode = [];
      var stops = [];

      for (var i = 0; i < stopsLength - 1; i++) {
        encode.push(0, 1);

        if (i + 2 !== stopsLength) {
          bounds.push(this.stops[i + 1][0]);
        }

        fn = this.doc.ref({
          FunctionType: 2,
          Domain: [0, 1],
          C0: this.stops[i + 0][1],
          C1: this.stops[i + 1][1],
          N: 1
        });
        stops.push(fn);
        fn.end();
      } // if there are only two stops, we don't need a stitching function


      if (stopsLength === 1) {
        fn = stops[0];
      } else {
        fn = this.doc.ref({
          FunctionType: 3,
          // stitching function
          Domain: [0, 1],
          Functions: stops,
          Bounds: bounds,
          Encode: encode
        });
        fn.end();
      }

      this.id = "Sh".concat(++this.doc._gradCount);
      var shader = this.shader(fn);
      shader.end();
      var pattern = this.doc.ref({
        Type: 'Pattern',
        PatternType: 2,
        Shading: shader,
        Matrix: this.matrix.map(number)
      });
      pattern.end();

      if (this.stops.some(function (stop) {
        return stop[2] < 1;
      })) {
        var grad = this.opacityGradient();
        grad._colorSpace = 'DeviceGray';

        var _iterator = _createForOfIteratorHelper(this.stops),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var stop = _step.value;
            grad.stop(stop[0], [stop[2]]);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        grad = grad.embed(this.matrix);
        var pageBBox = [0, 0, this.doc.page.width, this.doc.page.height];
        var form = this.doc.ref({
          Type: 'XObject',
          Subtype: 'Form',
          FormType: 1,
          BBox: pageBBox,
          Group: {
            Type: 'Group',
            S: 'Transparency',
            CS: 'DeviceGray'
          },
          Resources: {
            ProcSet: ['PDF', 'Text', 'ImageB', 'ImageC', 'ImageI'],
            Pattern: {
              Sh1: grad
            }
          }
        });
        form.write('/Pattern cs /Sh1 scn');
        form.end("".concat(pageBBox.join(' '), " re f"));
        var gstate = this.doc.ref({
          Type: 'ExtGState',
          SMask: {
            Type: 'Mask',
            S: 'Luminosity',
            G: form
          }
        });
        gstate.end();
        var opacityPattern = this.doc.ref({
          Type: 'Pattern',
          PatternType: 1,
          PaintType: 1,
          TilingType: 2,
          BBox: pageBBox,
          XStep: pageBBox[2],
          YStep: pageBBox[3],
          Resources: {
            ProcSet: ['PDF', 'Text', 'ImageB', 'ImageC', 'ImageI'],
            Pattern: {
              Sh1: pattern
            },
            ExtGState: {
              Gs1: gstate
            }
          }
        });
        opacityPattern.write('/Gs1 gs /Pattern cs /Sh1 scn');
        opacityPattern.end("".concat(pageBBox.join(' '), " re f"));
        this.doc.page.patterns[this.id] = opacityPattern;
      } else {
        this.doc.page.patterns[this.id] = pattern;
      }

      return pattern;
    }
  }, {
    key: "apply",
    value: function apply(stroke) {
      // apply gradient transform to existing document ctm
      var _this$doc$_ctm = _slicedToArray(this.doc._ctm, 6),
          m0 = _this$doc$_ctm[0],
          m1 = _this$doc$_ctm[1],
          m2 = _this$doc$_ctm[2],
          m3 = _this$doc$_ctm[3],
          m4 = _this$doc$_ctm[4],
          m5 = _this$doc$_ctm[5];

      var _this$transform = _slicedToArray(this.transform, 6),
          m11 = _this$transform[0],
          m12 = _this$transform[1],
          m21 = _this$transform[2],
          m22 = _this$transform[3],
          dx = _this$transform[4],
          dy = _this$transform[5];

      var m = [m0 * m11 + m2 * m12, m1 * m11 + m3 * m12, m0 * m21 + m2 * m22, m1 * m21 + m3 * m22, m0 * dx + m2 * dy + m4, m1 * dx + m3 * dy + m5];

      if (!this.embedded || m.join(' ') !== this.matrix.join(' ')) {
        this.embed(m);
      }

      this.doc._setColorSpace('Pattern', stroke);

      var op = stroke ? 'SCN' : 'scn';
      return this.doc.addContent("/".concat(this.id, " ").concat(op));
    }
  }]);

  return PDFGradient;
}();

var PDFLinearGradient = /*#__PURE__*/function (_PDFGradient) {
  _inherits(PDFLinearGradient, _PDFGradient);

  var _super = _createSuper(PDFLinearGradient);

  function PDFLinearGradient(doc, x1, y1, x2, y2) {
    var _this;

    _classCallCheck(this, PDFLinearGradient);

    _this = _super.call(this, doc);
    _this.x1 = x1;
    _this.y1 = y1;
    _this.x2 = x2;
    _this.y2 = y2;
    return _this;
  }

  _createClass(PDFLinearGradient, [{
    key: "shader",
    value: function shader(fn) {
      return this.doc.ref({
        ShadingType: 2,
        ColorSpace: this._colorSpace,
        Coords: [this.x1, this.y1, this.x2, this.y2],
        Function: fn,
        Extend: [true, true]
      });
    }
  }, {
    key: "opacityGradient",
    value: function opacityGradient() {
      return new PDFLinearGradient(this.doc, this.x1, this.y1, this.x2, this.y2);
    }
  }]);

  return PDFLinearGradient;
}(PDFGradient);

var PDFRadialGradient = /*#__PURE__*/function (_PDFGradient2) {
  _inherits(PDFRadialGradient, _PDFGradient2);

  var _super2 = _createSuper(PDFRadialGradient);

  function PDFRadialGradient(doc, x1, y1, r1, x2, y2, r2) {
    var _this2;

    _classCallCheck(this, PDFRadialGradient);

    _this2 = _super2.call(this, doc);
    _this2.doc = doc;
    _this2.x1 = x1;
    _this2.y1 = y1;
    _this2.r1 = r1;
    _this2.x2 = x2;
    _this2.y2 = y2;
    _this2.r2 = r2;
    return _this2;
  }

  _createClass(PDFRadialGradient, [{
    key: "shader",
    value: function shader(fn) {
      return this.doc.ref({
        ShadingType: 3,
        ColorSpace: this._colorSpace,
        Coords: [this.x1, this.y1, this.r1, this.x2, this.y2, this.r2],
        Function: fn,
        Extend: [true, true]
      });
    }
  }, {
    key: "opacityGradient",
    value: function opacityGradient() {
      return new PDFRadialGradient(this.doc, this.x1, this.y1, this.r1, this.x2, this.y2, this.r2);
    }
  }]);

  return PDFRadialGradient;
}(PDFGradient);

var Gradient = {
  PDFGradient: PDFGradient,
  PDFLinearGradient: PDFLinearGradient,
  PDFRadialGradient: PDFRadialGradient
};

/*
PDF tiling pattern support. Uncolored only.
 */
var underlyingColorSpaces = ['DeviceCMYK', 'DeviceRGB'];

var PDFTilingPattern = /*#__PURE__*/function () {
  function PDFTilingPattern(doc, bBox, xStep, yStep, stream) {
    _classCallCheck(this, PDFTilingPattern);

    this.doc = doc;
    this.bBox = bBox;
    this.xStep = xStep;
    this.yStep = yStep;
    this.stream = stream;
  }

  _createClass(PDFTilingPattern, [{
    key: "createPattern",
    value: function createPattern() {
      // no resources needed for our current usage
      // required entry
      var resources = this.doc.ref();
      resources.end(); // apply default transform matrix (flipped in the default doc._ctm)
      // see document.js & gradient.js

      var _this$doc$_ctm = _slicedToArray(this.doc._ctm, 6),
          m0 = _this$doc$_ctm[0],
          m1 = _this$doc$_ctm[1],
          m2 = _this$doc$_ctm[2],
          m3 = _this$doc$_ctm[3],
          m4 = _this$doc$_ctm[4],
          m5 = _this$doc$_ctm[5];

      var m11 = 1,
          m12 = 0,
          m21 = 0,
          m22 = 1,
          dx = 0,
          dy = 0;
      var m = [m0 * m11 + m2 * m12, m1 * m11 + m3 * m12, m0 * m21 + m2 * m22, m1 * m21 + m3 * m22, m0 * dx + m2 * dy + m4, m1 * dx + m3 * dy + m5];
      var pattern = this.doc.ref({
        Type: 'Pattern',
        PatternType: 1,
        // tiling
        PaintType: 2,
        // 1-colored, 2-uncolored
        TilingType: 2,
        // 2-no distortion
        BBox: this.bBox,
        XStep: this.xStep,
        YStep: this.yStep,
        Matrix: m.map(function (v) {
          return +v.toFixed(5);
        }),
        Resources: resources
      });
      pattern.end(this.stream);
      return pattern;
    }
  }, {
    key: "embedPatternColorSpaces",
    value: function embedPatternColorSpaces() {
      var _this = this;

      // map each pattern to an underlying color space
      // and embed on each page
      underlyingColorSpaces.forEach(function (csName) {
        var csId = _this.getPatternColorSpaceId(csName);

        if (_this.doc.page.colorSpaces[csId]) return;

        var cs = _this.doc.ref(['Pattern', csName]);

        cs.end();
        _this.doc.page.colorSpaces[csId] = cs;
      });
    }
  }, {
    key: "getPatternColorSpaceId",
    value: function getPatternColorSpaceId(underlyingColorspace) {
      return "CsP".concat(underlyingColorspace);
    }
  }, {
    key: "embed",
    value: function embed() {
      if (!this.id) {
        this.doc._patternCount = this.doc._patternCount + 1;
        this.id = 'P' + this.doc._patternCount;
        this.pattern = this.createPattern();
      } // patterns are embedded in each page


      if (!this.doc.page.patterns[this.id]) {
        this.doc.page.patterns[this.id] = this.pattern;
      }
    }
  }, {
    key: "apply",
    value: function apply(stroke, patternColor) {
      // do any embedding/creating that might be needed
      this.embedPatternColorSpaces();
      this.embed();

      var normalizedColor = this.doc._normalizeColor(patternColor);

      if (!normalizedColor) throw Error("invalid pattern color. (value: ".concat(patternColor, ")")); // select one of the pattern color spaces

      var csId = this.getPatternColorSpaceId(this.doc._getColorSpace(normalizedColor));

      this.doc._setColorSpace(csId, stroke); // stroke/fill using the pattern and color (in the above underlying color space)


      var op = stroke ? 'SCN' : 'scn';
      return this.doc.addContent("".concat(normalizedColor.join(' '), " /").concat(this.id, " ").concat(op));
    }
  }]);

  return PDFTilingPattern;
}();

var pattern = {
  PDFTilingPattern: PDFTilingPattern
};

var PDFGradient$1 = Gradient.PDFGradient,
    PDFLinearGradient$1 = Gradient.PDFLinearGradient,
    PDFRadialGradient$1 = Gradient.PDFRadialGradient;
var PDFTilingPattern$1 = pattern.PDFTilingPattern;
var ColorMixin = {
  initColor: function initColor() {
    // The opacity dictionaries
    this._opacityRegistry = {};
    this._opacityCount = 0;
    this._patternCount = 0;
    return this._gradCount = 0;
  },
  _normalizeColor: function _normalizeColor(color) {
    if (typeof color === 'string') {
      if (color.charAt(0) === '#') {
        if (color.length === 4) {
          color = color.replace(/#([0-9A-F])([0-9A-F])([0-9A-F])/i, '#$1$1$2$2$3$3');
        }

        var hex = parseInt(color.slice(1), 16);
        color = [hex >> 16, hex >> 8 & 0xff, hex & 0xff];
      } else if (namedColors[color]) {
        color = namedColors[color];
      }
    }

    if (Array.isArray(color)) {
      // RGB
      if (color.length === 3) {
        color = color.map(function (part) {
          return part / 255;
        }); // CMYK
      } else if (color.length === 4) {
        color = color.map(function (part) {
          return part / 100;
        });
      }

      return color;
    }

    return null;
  },
  _setColor: function _setColor(color, stroke) {
    if (color instanceof PDFGradient$1) {
      color.apply(stroke);
      return true; // see if tiling pattern, decode & apply it it
    } else if (Array.isArray(color) && color[0] instanceof PDFTilingPattern$1) {
      color[0].apply(stroke, color[1]);
      return true;
    } // any other case should be a normal color and not a pattern


    return this._setColorCore(color, stroke);
  },
  _setColorCore: function _setColorCore(color, stroke) {
    color = this._normalizeColor(color);

    if (!color) {
      return false;
    }

    var op = stroke ? 'SCN' : 'scn';

    var space = this._getColorSpace(color);

    this._setColorSpace(space, stroke);

    color = color.join(' ');
    this.addContent("".concat(color, " ").concat(op));
    return true;
  },
  _setColorSpace: function _setColorSpace(space, stroke) {
    var op = stroke ? 'CS' : 'cs';
    return this.addContent("/".concat(space, " ").concat(op));
  },
  _getColorSpace: function _getColorSpace(color) {
    return color.length === 4 ? 'DeviceCMYK' : 'DeviceRGB';
  },
  fillColor: function fillColor(color, opacity) {
    var set = this._setColor(color, false);

    if (set) {
      this.fillOpacity(opacity);
    } // save this for text wrapper, which needs to reset
    // the fill color on new pages


    this._fillColor = [color, opacity];
    return this;
  },
  strokeColor: function strokeColor(color, opacity) {
    var set = this._setColor(color, true);

    if (set) {
      this.strokeOpacity(opacity);
    }

    return this;
  },
  opacity: function opacity(_opacity) {
    this._doOpacity(_opacity, _opacity);

    return this;
  },
  fillOpacity: function fillOpacity(opacity) {
    this._doOpacity(opacity, null);

    return this;
  },
  strokeOpacity: function strokeOpacity(opacity) {
    this._doOpacity(null, opacity);

    return this;
  },
  _doOpacity: function _doOpacity(fillOpacity, strokeOpacity) {
    var dictionary, name;

    if (fillOpacity == null && strokeOpacity == null) {
      return;
    }

    if (fillOpacity != null) {
      fillOpacity = Math.max(0, Math.min(1, fillOpacity));
    }

    if (strokeOpacity != null) {
      strokeOpacity = Math.max(0, Math.min(1, strokeOpacity));
    }

    var key = "".concat(fillOpacity, "_").concat(strokeOpacity);

    if (this._opacityRegistry[key]) {
      var _this$_opacityRegistr = _slicedToArray(this._opacityRegistry[key], 2);

      dictionary = _this$_opacityRegistr[0];
      name = _this$_opacityRegistr[1];
    } else {
      dictionary = {
        Type: 'ExtGState'
      };

      if (fillOpacity != null) {
        dictionary.ca = fillOpacity;
      }

      if (strokeOpacity != null) {
        dictionary.CA = strokeOpacity;
      }

      dictionary = this.ref(dictionary);
      dictionary.end();
      var id = ++this._opacityCount;
      name = "Gs".concat(id);
      this._opacityRegistry[key] = [dictionary, name];
    }

    this.page.ext_gstates[name] = dictionary;
    return this.addContent("/".concat(name, " gs"));
  },
  linearGradient: function linearGradient(x1, y1, x2, y2) {
    return new PDFLinearGradient$1(this, x1, y1, x2, y2);
  },
  radialGradient: function radialGradient(x1, y1, r1, x2, y2, r2) {
    return new PDFRadialGradient$1(this, x1, y1, r1, x2, y2, r2);
  },
  pattern: function pattern(bbox, xStep, yStep, stream) {
    return new PDFTilingPattern$1(this, bbox, xStep, yStep, stream);
  }
};
var namedColors = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  grey: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
};

var cx, cy, px, py, sx, sy;
cx = cy = px = py = sx = sy = 0;
var parameters = {
  A: 7,
  a: 7,
  C: 6,
  c: 6,
  H: 1,
  h: 1,
  L: 2,
  l: 2,
  M: 2,
  m: 2,
  Q: 4,
  q: 4,
  S: 4,
  s: 4,
  T: 2,
  t: 2,
  V: 1,
  v: 1,
  Z: 0,
  z: 0
};

var parse = function parse(path) {
  var cmd;
  var ret = [];
  var args = [];
  var curArg = '';
  var foundDecimal = false;
  var params = 0;

  var _iterator = _createForOfIteratorHelper(path),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var c = _step.value;

      if (parameters[c] != null) {
        params = parameters[c];

        if (cmd) {
          // save existing command
          if (curArg.length > 0) {
            args[args.length] = +curArg;
          }

          ret[ret.length] = {
            cmd: cmd,
            args: args
          };
          args = [];
          curArg = '';
          foundDecimal = false;
        }

        cmd = c;
      } else if ([' ', ','].includes(c) || c === '-' && curArg.length > 0 && curArg[curArg.length - 1] !== 'e' || c === '.' && foundDecimal) {
        if (curArg.length === 0) {
          continue;
        }

        if (args.length === params) {
          // handle reused commands
          ret[ret.length] = {
            cmd: cmd,
            args: args
          };
          args = [+curArg]; // handle assumed commands

          if (cmd === 'M') {
            cmd = 'L';
          }

          if (cmd === 'm') {
            cmd = 'l';
          }
        } else {
          args[args.length] = +curArg;
        }

        foundDecimal = c === '.'; // fix for negative numbers or repeated decimals with no delimeter between commands

        curArg = ['-', '.'].includes(c) ? c : '';
      } else {
        curArg += c;

        if (c === '.') {
          foundDecimal = true;
        }
      }
    } // add the last command

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (curArg.length > 0) {
    if (args.length === params) {
      // handle reused commands
      ret[ret.length] = {
        cmd: cmd,
        args: args
      };
      args = [+curArg]; // handle assumed commands

      if (cmd === 'M') {
        cmd = 'L';
      }

      if (cmd === 'm') {
        cmd = 'l';
      }
    } else {
      args[args.length] = +curArg;
    }
  }

  ret[ret.length] = {
    cmd: cmd,
    args: args
  };
  return ret;
};

var _apply = function apply(commands, doc) {
  // current point, control point, and subpath starting point
  cx = cy = px = py = sx = sy = 0; // run the commands

  for (var i = 0; i < commands.length; i++) {
    var c = commands[i];

    if (typeof runners[c.cmd] === 'function') {
      runners[c.cmd](doc, c.args);
    }
  }
};

var runners = {
  M: function M(doc, a) {
    cx = a[0];
    cy = a[1];
    px = py = null;
    sx = cx;
    sy = cy;
    return doc.moveTo(cx, cy);
  },
  m: function m(doc, a) {
    cx += a[0];
    cy += a[1];
    px = py = null;
    sx = cx;
    sy = cy;
    return doc.moveTo(cx, cy);
  },
  C: function C(doc, a) {
    cx = a[4];
    cy = a[5];
    px = a[2];
    py = a[3];
    return doc.bezierCurveTo.apply(doc, _toConsumableArray(a));
  },
  c: function c(doc, a) {
    doc.bezierCurveTo(a[0] + cx, a[1] + cy, a[2] + cx, a[3] + cy, a[4] + cx, a[5] + cy);
    px = cx + a[2];
    py = cy + a[3];
    cx += a[4];
    return cy += a[5];
  },
  S: function S(doc, a) {
    if (px === null) {
      px = cx;
      py = cy;
    }

    doc.bezierCurveTo(cx - (px - cx), cy - (py - cy), a[0], a[1], a[2], a[3]);
    px = a[0];
    py = a[1];
    cx = a[2];
    return cy = a[3];
  },
  s: function s(doc, a) {
    if (px === null) {
      px = cx;
      py = cy;
    }

    doc.bezierCurveTo(cx - (px - cx), cy - (py - cy), cx + a[0], cy + a[1], cx + a[2], cy + a[3]);
    px = cx + a[0];
    py = cy + a[1];
    cx += a[2];
    return cy += a[3];
  },
  Q: function Q(doc, a) {
    px = a[0];
    py = a[1];
    cx = a[2];
    cy = a[3];
    return doc.quadraticCurveTo(a[0], a[1], cx, cy);
  },
  q: function q(doc, a) {
    doc.quadraticCurveTo(a[0] + cx, a[1] + cy, a[2] + cx, a[3] + cy);
    px = cx + a[0];
    py = cy + a[1];
    cx += a[2];
    return cy += a[3];
  },
  T: function T(doc, a) {
    if (px === null) {
      px = cx;
      py = cy;
    } else {
      px = cx - (px - cx);
      py = cy - (py - cy);
    }

    doc.quadraticCurveTo(px, py, a[0], a[1]);
    px = cx - (px - cx);
    py = cy - (py - cy);
    cx = a[0];
    return cy = a[1];
  },
  t: function t(doc, a) {
    if (px === null) {
      px = cx;
      py = cy;
    } else {
      px = cx - (px - cx);
      py = cy - (py - cy);
    }

    doc.quadraticCurveTo(px, py, cx + a[0], cy + a[1]);
    cx += a[0];
    return cy += a[1];
  },
  A: function A(doc, a) {
    solveArc(doc, cx, cy, a);
    cx = a[5];
    return cy = a[6];
  },
  a: function a(doc, _a) {
    _a[5] += cx;
    _a[6] += cy;
    solveArc(doc, cx, cy, _a);
    cx = _a[5];
    return cy = _a[6];
  },
  L: function L(doc, a) {
    cx = a[0];
    cy = a[1];
    px = py = null;
    return doc.lineTo(cx, cy);
  },
  l: function l(doc, a) {
    cx += a[0];
    cy += a[1];
    px = py = null;
    return doc.lineTo(cx, cy);
  },
  H: function H(doc, a) {
    cx = a[0];
    px = py = null;
    return doc.lineTo(cx, cy);
  },
  h: function h(doc, a) {
    cx += a[0];
    px = py = null;
    return doc.lineTo(cx, cy);
  },
  V: function V(doc, a) {
    cy = a[0];
    px = py = null;
    return doc.lineTo(cx, cy);
  },
  v: function v(doc, a) {
    cy += a[0];
    px = py = null;
    return doc.lineTo(cx, cy);
  },
  Z: function Z(doc) {
    doc.closePath();
    cx = sx;
    return cy = sy;
  },
  z: function z(doc) {
    doc.closePath();
    cx = sx;
    return cy = sy;
  }
};

var solveArc = function solveArc(doc, x, y, coords) {
  var _coords = _slicedToArray(coords, 7),
      rx = _coords[0],
      ry = _coords[1],
      rot = _coords[2],
      large = _coords[3],
      sweep = _coords[4],
      ex = _coords[5],
      ey = _coords[6];

  var segs = arcToSegments(ex, ey, rx, ry, large, sweep, rot, x, y);

  var _iterator2 = _createForOfIteratorHelper(segs),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var seg = _step2.value;
      var bez = segmentToBezier.apply(void 0, _toConsumableArray(seg));
      doc.bezierCurveTo.apply(doc, _toConsumableArray(bez));
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}; // from Inkscape svgtopdf, thanks!


var arcToSegments = function arcToSegments(x, y, rx, ry, large, sweep, rotateX, ox, oy) {
  var th = rotateX * (Math.PI / 180);
  var sin_th = Math.sin(th);
  var cos_th = Math.cos(th);
  rx = Math.abs(rx);
  ry = Math.abs(ry);
  px = cos_th * (ox - x) * 0.5 + sin_th * (oy - y) * 0.5;
  py = cos_th * (oy - y) * 0.5 - sin_th * (ox - x) * 0.5;
  var pl = px * px / (rx * rx) + py * py / (ry * ry);

  if (pl > 1) {
    pl = Math.sqrt(pl);
    rx *= pl;
    ry *= pl;
  }

  var a00 = cos_th / rx;
  var a01 = sin_th / rx;
  var a10 = -sin_th / ry;
  var a11 = cos_th / ry;
  var x0 = a00 * ox + a01 * oy;
  var y0 = a10 * ox + a11 * oy;
  var x1 = a00 * x + a01 * y;
  var y1 = a10 * x + a11 * y;
  var d = (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0);
  var sfactor_sq = 1 / d - 0.25;

  if (sfactor_sq < 0) {
    sfactor_sq = 0;
  }

  var sfactor = Math.sqrt(sfactor_sq);

  if (sweep === large) {
    sfactor = -sfactor;
  }

  var xc = 0.5 * (x0 + x1) - sfactor * (y1 - y0);
  var yc = 0.5 * (y0 + y1) + sfactor * (x1 - x0);
  var th0 = Math.atan2(y0 - yc, x0 - xc);
  var th1 = Math.atan2(y1 - yc, x1 - xc);
  var th_arc = th1 - th0;

  if (th_arc < 0 && sweep === 1) {
    th_arc += 2 * Math.PI;
  } else if (th_arc > 0 && sweep === 0) {
    th_arc -= 2 * Math.PI;
  }

  var segments = Math.ceil(Math.abs(th_arc / (Math.PI * 0.5 + 0.001)));
  var result = [];

  for (var i = 0; i < segments; i++) {
    var th2 = th0 + i * th_arc / segments;
    var th3 = th0 + (i + 1) * th_arc / segments;
    result[i] = [xc, yc, th2, th3, rx, ry, sin_th, cos_th];
  }

  return result;
};

var segmentToBezier = function segmentToBezier(cx, cy, th0, th1, rx, ry, sin_th, cos_th) {
  var a00 = cos_th * rx;
  var a01 = -sin_th * ry;
  var a10 = sin_th * rx;
  var a11 = cos_th * ry;
  var th_half = 0.5 * (th1 - th0);
  var t = 8 / 3 * Math.sin(th_half * 0.5) * Math.sin(th_half * 0.5) / Math.sin(th_half);
  var x1 = cx + Math.cos(th0) - t * Math.sin(th0);
  var y1 = cy + Math.sin(th0) + t * Math.cos(th0);
  var x3 = cx + Math.cos(th1);
  var y3 = cy + Math.sin(th1);
  var x2 = x3 + t * Math.sin(th1);
  var y2 = y3 - t * Math.cos(th1);
  return [a00 * x1 + a01 * y1, a10 * x1 + a11 * y1, a00 * x2 + a01 * y2, a10 * x2 + a11 * y2, a00 * x3 + a01 * y3, a10 * x3 + a11 * y3];
};

var SVGPath = /*#__PURE__*/function () {
  function SVGPath() {
    _classCallCheck(this, SVGPath);
  }

  _createClass(SVGPath, null, [{
    key: "apply",
    value: function apply(doc, path) {
      var commands = parse(path);

      _apply(commands, doc);
    }
  }]);

  return SVGPath;
}();

var number$1 = PDFObject.number; // This constant is used to approximate a symmetrical arc using a cubic
// Bezier curve.

var KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);
var VectorMixin = {
  initVector: function initVector() {
    this._ctm = [1, 0, 0, 1, 0, 0]; // current transformation matrix

    return this._ctmStack = [];
  },
  save: function save() {
    this._ctmStack.push(this._ctm.slice()); // TODO: save/restore colorspace and styles so not setting it unnessesarily all the time?


    return this.addContent('q');
  },
  restore: function restore() {
    this._ctm = this._ctmStack.pop() || [1, 0, 0, 1, 0, 0];
    return this.addContent('Q');
  },
  closePath: function closePath() {
    return this.addContent('h');
  },
  lineWidth: function lineWidth(w) {
    return this.addContent("".concat(number$1(w), " w"));
  },
  _CAP_STYLES: {
    BUTT: 0,
    ROUND: 1,
    SQUARE: 2
  },
  lineCap: function lineCap(c) {
    if (typeof c === 'string') {
      c = this._CAP_STYLES[c.toUpperCase()];
    }

    return this.addContent("".concat(c, " J"));
  },
  _JOIN_STYLES: {
    MITER: 0,
    ROUND: 1,
    BEVEL: 2
  },
  lineJoin: function lineJoin(j) {
    if (typeof j === 'string') {
      j = this._JOIN_STYLES[j.toUpperCase()];
    }

    return this.addContent("".concat(j, " j"));
  },
  miterLimit: function miterLimit(m) {
    return this.addContent("".concat(number$1(m), " M"));
  },
  dash: function dash(length) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var originalLength = length;

    if (!Array.isArray(length)) {
      length = [length, options.space || length];
    }

    var valid = length.every(function (x) {
      return Number.isFinite(x) && x > 0;
    });

    if (!valid) {
      throw new Error("dash(".concat(JSON.stringify(originalLength), ", ").concat(JSON.stringify(options), ") invalid, lengths must be numeric and greater than zero"));
    }

    length = length.map(number$1).join(' ');
    return this.addContent("[".concat(length, "] ").concat(number$1(options.phase || 0), " d"));
  },
  undash: function undash() {
    return this.addContent('[] 0 d');
  },
  moveTo: function moveTo(x, y) {
    return this.addContent("".concat(number$1(x), " ").concat(number$1(y), " m"));
  },
  lineTo: function lineTo(x, y) {
    return this.addContent("".concat(number$1(x), " ").concat(number$1(y), " l"));
  },
  bezierCurveTo: function bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    return this.addContent("".concat(number$1(cp1x), " ").concat(number$1(cp1y), " ").concat(number$1(cp2x), " ").concat(number$1(cp2y), " ").concat(number$1(x), " ").concat(number$1(y), " c"));
  },
  quadraticCurveTo: function quadraticCurveTo(cpx, cpy, x, y) {
    return this.addContent("".concat(number$1(cpx), " ").concat(number$1(cpy), " ").concat(number$1(x), " ").concat(number$1(y), " v"));
  },
  rect: function rect(x, y, w, h) {
    return this.addContent("".concat(number$1(x), " ").concat(number$1(y), " ").concat(number$1(w), " ").concat(number$1(h), " re"));
  },
  roundedRect: function roundedRect(x, y, w, h, r) {
    if (r == null) {
      r = 0;
    }

    r = Math.min(r, 0.5 * w, 0.5 * h); // amount to inset control points from corners (see `ellipse`)

    var c = r * (1.0 - KAPPA);
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.bezierCurveTo(x + w - c, y, x + w, y + c, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.bezierCurveTo(x + w, y + h - c, x + w - c, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.bezierCurveTo(x + c, y + h, x, y + h - c, x, y + h - r);
    this.lineTo(x, y + r);
    this.bezierCurveTo(x, y + c, x + c, y, x + r, y);
    return this.closePath();
  },
  ellipse: function ellipse(x, y, r1, r2) {
    // based on http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas/2173084#2173084
    if (r2 == null) {
      r2 = r1;
    }

    x -= r1;
    y -= r2;
    var ox = r1 * KAPPA;
    var oy = r2 * KAPPA;
    var xe = x + r1 * 2;
    var ye = y + r2 * 2;
    var xm = x + r1;
    var ym = y + r2;
    this.moveTo(x, ym);
    this.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    this.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    this.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    this.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    return this.closePath();
  },
  circle: function circle(x, y, radius) {
    return this.ellipse(x, y, radius);
  },
  arc: function arc(x, y, radius, startAngle, endAngle, anticlockwise) {
    if (anticlockwise == null) {
      anticlockwise = false;
    }

    var TWO_PI = 2.0 * Math.PI;
    var HALF_PI = 0.5 * Math.PI;
    var deltaAng = endAngle - startAngle;

    if (Math.abs(deltaAng) > TWO_PI) {
      // draw only full circle if more than that is specified
      deltaAng = TWO_PI;
    } else if (deltaAng !== 0 && anticlockwise !== deltaAng < 0) {
      // necessary to flip direction of rendering
      var dir = anticlockwise ? -1 : 1;
      deltaAng = dir * TWO_PI + deltaAng;
    }

    var numSegs = Math.ceil(Math.abs(deltaAng) / HALF_PI);
    var segAng = deltaAng / numSegs;
    var handleLen = segAng / HALF_PI * KAPPA * radius;
    var curAng = startAngle; // component distances between anchor point and control point

    var deltaCx = -Math.sin(curAng) * handleLen;
    var deltaCy = Math.cos(curAng) * handleLen; // anchor point

    var ax = x + Math.cos(curAng) * radius;
    var ay = y + Math.sin(curAng) * radius; // calculate and render segments

    this.moveTo(ax, ay);

    for (var segIdx = 0; segIdx < numSegs; segIdx++) {
      // starting control point
      var cp1x = ax + deltaCx;
      var cp1y = ay + deltaCy; // step angle

      curAng += segAng; // next anchor point

      ax = x + Math.cos(curAng) * radius;
      ay = y + Math.sin(curAng) * radius; // next control point delta

      deltaCx = -Math.sin(curAng) * handleLen;
      deltaCy = Math.cos(curAng) * handleLen; // ending control point

      var cp2x = ax - deltaCx;
      var cp2y = ay - deltaCy; // render segment

      this.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ax, ay);
    }

    return this;
  },
  polygon: function polygon() {
    for (var _len = arguments.length, points = new Array(_len), _key = 0; _key < _len; _key++) {
      points[_key] = arguments[_key];
    }

    this.moveTo.apply(this, _toConsumableArray(points.shift() || []));

    for (var _i = 0, _points = points; _i < _points.length; _i++) {
      var point = _points[_i];
      this.lineTo.apply(this, _toConsumableArray(point || []));
    }

    return this.closePath();
  },
  path: function path(_path) {
    SVGPath.apply(this, _path);
    return this;
  },
  _windingRule: function _windingRule(rule) {
    if (/even-?odd/.test(rule)) {
      return '*';
    }

    return '';
  },
  fill: function fill(color, rule) {
    if (/(even-?odd)|(non-?zero)/.test(color)) {
      rule = color;
      color = null;
    }

    if (color) {
      this.fillColor(color);
    }

    return this.addContent("f".concat(this._windingRule(rule)));
  },
  stroke: function stroke(color) {
    if (color) {
      this.strokeColor(color);
    }

    return this.addContent('S');
  },
  fillAndStroke: function fillAndStroke(fillColor, strokeColor, rule) {
    if (strokeColor == null) {
      strokeColor = fillColor;
    }

    var isFillRule = /(even-?odd)|(non-?zero)/;

    if (isFillRule.test(fillColor)) {
      rule = fillColor;
      fillColor = null;
    }

    if (isFillRule.test(strokeColor)) {
      rule = strokeColor;
      strokeColor = fillColor;
    }

    if (fillColor) {
      this.fillColor(fillColor);
      this.strokeColor(strokeColor);
    }

    return this.addContent("B".concat(this._windingRule(rule)));
  },
  clip: function clip(rule) {
    return this.addContent("W".concat(this._windingRule(rule), " n"));
  },
  transform: function transform(m11, m12, m21, m22, dx, dy) {
    // keep track of the current transformation matrix
    var m = this._ctm;

    var _m = _slicedToArray(m, 6),
        m0 = _m[0],
        m1 = _m[1],
        m2 = _m[2],
        m3 = _m[3],
        m4 = _m[4],
        m5 = _m[5];

    m[0] = m0 * m11 + m2 * m12;
    m[1] = m1 * m11 + m3 * m12;
    m[2] = m0 * m21 + m2 * m22;
    m[3] = m1 * m21 + m3 * m22;
    m[4] = m0 * dx + m2 * dy + m4;
    m[5] = m1 * dx + m3 * dy + m5;
    var values = [m11, m12, m21, m22, dx, dy].map(function (v) {
      return number$1(v);
    }).join(' ');
    return this.addContent("".concat(values, " cm"));
  },
  translate: function translate(x, y) {
    return this.transform(1, 0, 0, 1, x, y);
  },
  rotate: function rotate(angle) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var y;
    var rad = angle * Math.PI / 180;
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);
    var x = y = 0;

    if (options.origin != null) {
      var _options$origin = _slicedToArray(options.origin, 2);

      x = _options$origin[0];
      y = _options$origin[1];
      var x1 = x * cos - y * sin;
      var y1 = x * sin + y * cos;
      x -= x1;
      y -= y1;
    }

    return this.transform(cos, sin, -sin, cos, x, y);
  },
  scale: function scale(xFactor, yFactor) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var y;

    if (yFactor == null) {
      yFactor = xFactor;
    }

    if (typeof yFactor === 'object') {
      options = yFactor;
      yFactor = xFactor;
    }

    var x = y = 0;

    if (options.origin != null) {
      var _options$origin2 = _slicedToArray(options.origin, 2);

      x = _options$origin2[0];
      y = _options$origin2[1];
      x -= xFactor * x;
      y -= yFactor * y;
    }

    return this.transform(xFactor, 0, 0, yFactor, x, y);
  }
};

var WIN_ANSI_MAP = {
  402: 131,
  8211: 150,
  8212: 151,
  8216: 145,
  8217: 146,
  8218: 130,
  8220: 147,
  8221: 148,
  8222: 132,
  8224: 134,
  8225: 135,
  8226: 149,
  8230: 133,
  8364: 128,
  8240: 137,
  8249: 139,
  8250: 155,
  710: 136,
  8482: 153,
  338: 140,
  339: 156,
  732: 152,
  352: 138,
  353: 154,
  376: 159,
  381: 142,
  382: 158
};
var characters = ".notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n  \nspace         exclam         quotedbl       numbersign\ndollar        percent        ampersand      quotesingle\nparenleft     parenright     asterisk       plus\ncomma         hyphen         period         slash\nzero          one            two            three\nfour          five           six            seven\neight         nine           colon          semicolon\nless          equal          greater        question\n  \nat            A              B              C\nD             E              F              G\nH             I              J              K\nL             M              N              O\nP             Q              R              S\nT             U              V              W\nX             Y              Z              bracketleft\nbackslash     bracketright   asciicircum    underscore\n  \ngrave         a              b              c\nd             e              f              g\nh             i              j              k\nl             m              n              o\np             q              r              s\nt             u              v              w\nx             y              z              braceleft\nbar           braceright     asciitilde     .notdef\n  \nEuro          .notdef        quotesinglbase florin\nquotedblbase  ellipsis       dagger         daggerdbl\ncircumflex    perthousand    Scaron         guilsinglleft\nOE            .notdef        Zcaron         .notdef\n.notdef       quoteleft      quoteright     quotedblleft\nquotedblright bullet         endash         emdash\ntilde         trademark      scaron         guilsinglright\noe            .notdef        zcaron         ydieresis\n  \nspace         exclamdown     cent           sterling\ncurrency      yen            brokenbar      section\ndieresis      copyright      ordfeminine    guillemotleft\nlogicalnot    hyphen         registered     macron\ndegree        plusminus      twosuperior    threesuperior\nacute         mu             paragraph      periodcentered\ncedilla       onesuperior    ordmasculine   guillemotright\nonequarter    onehalf        threequarters  questiondown\n  \nAgrave        Aacute         Acircumflex    Atilde\nAdieresis     Aring          AE             Ccedilla\nEgrave        Eacute         Ecircumflex    Edieresis\nIgrave        Iacute         Icircumflex    Idieresis\nEth           Ntilde         Ograve         Oacute\nOcircumflex   Otilde         Odieresis      multiply\nOslash        Ugrave         Uacute         Ucircumflex\nUdieresis     Yacute         Thorn          germandbls\n  \nagrave        aacute         acircumflex    atilde\nadieresis     aring          ae             ccedilla\negrave        eacute         ecircumflex    edieresis\nigrave        iacute         icircumflex    idieresis\neth           ntilde         ograve         oacute\nocircumflex   otilde         odieresis      divide\noslash        ugrave         uacute         ucircumflex\nudieresis     yacute         thorn          ydieresis".split(/\s+/);

var AFMFont = /*#__PURE__*/function () {
  function AFMFont(contents) {
    _classCallCheck(this, AFMFont);

    this.contents = contents;
    this.attributes = {};
    this.glyphWidths = {};
    this.boundingBoxes = {};
    this.kernPairs = {};
    this.parse(); // todo: remove charWidths since appears to not be used

    this.charWidths = new Array(256);

    for (var char = 0; char <= 255; char++) {
      this.charWidths[char] = this.glyphWidths[characters[char]];
    }

    this.bbox = this.attributes['FontBBox'].split(/\s+/).map(function (e) {
      return +e;
    });
    this.ascender = +(this.attributes['Ascender'] || 0);
    this.descender = +(this.attributes['Descender'] || 0);
    this.xHeight = +(this.attributes['XHeight'] || 0);
    this.capHeight = +(this.attributes['CapHeight'] || 0);
    this.lineGap = this.bbox[3] - this.bbox[1] - (this.ascender - this.descender);
  }

  _createClass(AFMFont, [{
    key: "parse",
    value: function parse() {
      var section = '';

      var _iterator = _createForOfIteratorHelper(this.contents.split('\n')),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var line = _step.value;
          var match;
          var a;

          if (match = line.match(/^Start(\w+)/)) {
            section = match[1];
            continue;
          } else if (match = line.match(/^End(\w+)/)) {
            section = '';
            continue;
          }

          switch (section) {
            case 'FontMetrics':
              match = line.match(/(^\w+)\s+(.*)/);
              var key = match[1];
              var value = match[2];

              if (a = this.attributes[key]) {
                if (!Array.isArray(a)) {
                  a = this.attributes[key] = [a];
                }

                a.push(value);
              } else {
                this.attributes[key] = value;
              }

              break;

            case 'CharMetrics':
              if (!/^CH?\s/.test(line)) {
                continue;
              }

              var name = line.match(/\bN\s+(\.?\w+)\s*;/)[1];
              this.glyphWidths[name] = +line.match(/\bWX\s+(\d+)\s*;/)[1];
              break;

            case 'KernPairs':
              match = line.match(/^KPX\s+(\.?\w+)\s+(\.?\w+)\s+(-?\d+)/);

              if (match) {
                this.kernPairs[match[1] + '\0' + match[2]] = parseInt(match[3]);
              }

              break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "encodeText",
    value: function encodeText(text) {
      var res = [];

      for (var i = 0, len = text.length; i < len; i++) {
        var char = text.charCodeAt(i);
        char = WIN_ANSI_MAP[char] || char;
        res.push(char.toString(16));
      }

      return res;
    }
  }, {
    key: "glyphsForString",
    value: function glyphsForString(string) {
      var glyphs = [];

      for (var i = 0, len = string.length; i < len; i++) {
        var charCode = string.charCodeAt(i);
        glyphs.push(this.characterToGlyph(charCode));
      }

      return glyphs;
    }
  }, {
    key: "characterToGlyph",
    value: function characterToGlyph(character) {
      return characters[WIN_ANSI_MAP[character] || character] || '.notdef';
    }
  }, {
    key: "widthOfGlyph",
    value: function widthOfGlyph(glyph) {
      return this.glyphWidths[glyph] || 0;
    }
  }, {
    key: "getKernPair",
    value: function getKernPair(left, right) {
      return this.kernPairs[left + '\0' + right] || 0;
    }
  }, {
    key: "advancesForGlyphs",
    value: function advancesForGlyphs(glyphs) {
      var advances = [];

      for (var index = 0; index < glyphs.length; index++) {
        var left = glyphs[index];
        var right = glyphs[index + 1];
        advances.push(this.widthOfGlyph(left) + this.getKernPair(left, right));
      }

      return advances;
    }
  }], [{
    key: "open",
    value: function open(filename) {
      return new AFMFont(fs.readFileSync(filename, 'utf8'));
    }
  }]);

  return AFMFont;
}();

var PDFFont = /*#__PURE__*/function () {
  function PDFFont() {
    _classCallCheck(this, PDFFont);
  }

  _createClass(PDFFont, [{
    key: "encode",
    value: function encode() {
      throw new Error('Must be implemented by subclasses');
    }
  }, {
    key: "widthOfString",
    value: function widthOfString() {
      throw new Error('Must be implemented by subclasses');
    }
  }, {
    key: "ref",
    value: function ref() {
      return this.dictionary != null ? this.dictionary : this.dictionary = this.document.ref();
    }
  }, {
    key: "finalize",
    value: function finalize() {
      if (this.embedded || this.dictionary == null) {
        return;
      }

      this.embed();
      return this.embedded = true;
    }
  }, {
    key: "embed",
    value: function embed() {
      throw new Error('Must be implemented by subclasses');
    }
  }, {
    key: "lineHeight",
    value: function lineHeight(size, includeGap) {
      if (includeGap == null) {
        includeGap = false;
      }

      var gap = includeGap ? this.lineGap : 0;
      return (this.ascender + gap - this.descender) / 1000 * size;
    }
  }]);

  return PDFFont;
}();

var STANDARD_FONTS = {
  Courier: function Courier() {
    return fs.readFileSync(__dirname + '/data/Courier.afm', 'utf8');
  },
  'Courier-Bold': function CourierBold() {
    return fs.readFileSync(__dirname + '/data/Courier-Bold.afm', 'utf8');
  },
  'Courier-Oblique': function CourierOblique() {
    return fs.readFileSync(__dirname + '/data/Courier-Oblique.afm', 'utf8');
  },
  'Courier-BoldOblique': function CourierBoldOblique() {
    return fs.readFileSync(__dirname + '/data/Courier-BoldOblique.afm', 'utf8');
  },
  Helvetica: function Helvetica() {
    return fs.readFileSync(__dirname + '/data/Helvetica.afm', 'utf8');
  },
  'Helvetica-Bold': function HelveticaBold() {
    return fs.readFileSync(__dirname + '/data/Helvetica-Bold.afm', 'utf8');
  },
  'Helvetica-Oblique': function HelveticaOblique() {
    return fs.readFileSync(__dirname + '/data/Helvetica-Oblique.afm', 'utf8');
  },
  'Helvetica-BoldOblique': function HelveticaBoldOblique() {
    return fs.readFileSync(__dirname + '/data/Helvetica-BoldOblique.afm', 'utf8');
  },
  'Times-Roman': function TimesRoman() {
    return fs.readFileSync(__dirname + '/data/Times-Roman.afm', 'utf8');
  },
  'Times-Bold': function TimesBold() {
    return fs.readFileSync(__dirname + '/data/Times-Bold.afm', 'utf8');
  },
  'Times-Italic': function TimesItalic() {
    return fs.readFileSync(__dirname + '/data/Times-Italic.afm', 'utf8');
  },
  'Times-BoldItalic': function TimesBoldItalic() {
    return fs.readFileSync(__dirname + '/data/Times-BoldItalic.afm', 'utf8');
  },
  Symbol: function Symbol() {
    return fs.readFileSync(__dirname + '/data/Symbol.afm', 'utf8');
  },
  ZapfDingbats: function ZapfDingbats() {
    return fs.readFileSync(__dirname + '/data/ZapfDingbats.afm', 'utf8');
  }
};

var StandardFont = /*#__PURE__*/function (_PDFFont) {
  _inherits(StandardFont, _PDFFont);

  var _super = _createSuper(StandardFont);

  function StandardFont(document, name, id) {
    var _this;

    _classCallCheck(this, StandardFont);

    _this = _super.call(this);
    _this.document = document;
    _this.name = name;
    _this.id = id;
    _this.font = new AFMFont(STANDARD_FONTS[_this.name]());
    var _this$font = _this.font;
    _this.ascender = _this$font.ascender;
    _this.descender = _this$font.descender;
    _this.bbox = _this$font.bbox;
    _this.lineGap = _this$font.lineGap;
    _this.xHeight = _this$font.xHeight;
    _this.capHeight = _this$font.capHeight;
    return _this;
  }

  _createClass(StandardFont, [{
    key: "embed",
    value: function embed() {
      this.dictionary.data = {
        Type: 'Font',
        BaseFont: this.name,
        Subtype: 'Type1',
        Encoding: 'WinAnsiEncoding'
      };
      return this.dictionary.end();
    }
  }, {
    key: "encode",
    value: function encode(text) {
      var encoded = this.font.encodeText(text);
      var glyphs = this.font.glyphsForString("".concat(text));
      var advances = this.font.advancesForGlyphs(glyphs);
      var positions = [];

      for (var i = 0; i < glyphs.length; i++) {
        var glyph = glyphs[i];
        positions.push({
          xAdvance: advances[i],
          yAdvance: 0,
          xOffset: 0,
          yOffset: 0,
          advanceWidth: this.font.widthOfGlyph(glyph)
        });
      }

      return [encoded, positions];
    }
  }, {
    key: "widthOfString",
    value: function widthOfString(string, size) {
      var glyphs = this.font.glyphsForString("".concat(string));
      var advances = this.font.advancesForGlyphs(glyphs);
      var width = 0;

      var _iterator = _createForOfIteratorHelper(advances),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var advance = _step.value;
          width += advance;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var scale = size / 1000;
      return width * scale;
    }
  }], [{
    key: "isStandardFont",
    value: function isStandardFont(name) {
      return name in STANDARD_FONTS;
    }
  }]);

  return StandardFont;
}(PDFFont);

var toHex = function toHex(num) {
  return "0000".concat(num.toString(16)).slice(-4);
};

var EmbeddedFont = /*#__PURE__*/function (_PDFFont) {
  _inherits(EmbeddedFont, _PDFFont);

  var _super = _createSuper(EmbeddedFont);

  function EmbeddedFont(document, font, id) {
    var _this;

    _classCallCheck(this, EmbeddedFont);

    _this = _super.call(this);
    _this.document = document;
    _this.font = font;
    _this.id = id;
    _this.subset = _this.font.createSubset();
    _this.unicode = [[0]];
    _this.widths = [_this.font.getGlyph(0).advanceWidth];
    _this.name = _this.font.postscriptName;
    _this.scale = 1000 / _this.font.unitsPerEm;
    _this.ascender = _this.font.ascent * _this.scale;
    _this.descender = _this.font.descent * _this.scale;
    _this.xHeight = _this.font.xHeight * _this.scale;
    _this.capHeight = _this.font.capHeight * _this.scale;
    _this.lineGap = _this.font.lineGap * _this.scale;
    _this.bbox = _this.font.bbox;

    if (document.options.fontLayoutCache !== false) {
      _this.layoutCache = Object.create(null);
    }

    return _this;
  }

  _createClass(EmbeddedFont, [{
    key: "layoutRun",
    value: function layoutRun(text, features) {
      var run = this.font.layout(text, features); // Normalize position values

      for (var i = 0; i < run.positions.length; i++) {
        var position = run.positions[i];

        for (var key in position) {
          position[key] *= this.scale;
        }

        position.advanceWidth = run.glyphs[i].advanceWidth * this.scale;
      }

      return run;
    }
  }, {
    key: "layoutCached",
    value: function layoutCached(text) {
      if (!this.layoutCache) {
        return this.layoutRun(text);
      }

      var cached;

      if (cached = this.layoutCache[text]) {
        return cached;
      }

      var run = this.layoutRun(text);
      this.layoutCache[text] = run;
      return run;
    }
  }, {
    key: "layout",
    value: function layout(text, features, onlyWidth) {
      // Skip the cache if any user defined features are applied
      if (features) {
        return this.layoutRun(text, features);
      }

      var glyphs = onlyWidth ? null : [];
      var positions = onlyWidth ? null : [];
      var advanceWidth = 0; // Split the string by words to increase cache efficiency.
      // For this purpose, spaces and tabs are a good enough delimeter.

      var last = 0;
      var index = 0;

      while (index <= text.length) {
        var needle;

        if (index === text.length && last < index || (needle = text.charAt(index), [' ', '\t'].includes(needle))) {
          var run = this.layoutCached(text.slice(last, ++index));

          if (!onlyWidth) {
            glyphs = glyphs.concat(run.glyphs);
            positions = positions.concat(run.positions);
          }

          advanceWidth += run.advanceWidth;
          last = index;
        } else {
          index++;
        }
      }

      return {
        glyphs: glyphs,
        positions: positions,
        advanceWidth: advanceWidth
      };
    }
  }, {
    key: "encode",
    value: function encode(text, features) {
      var _this$layout = this.layout(text, features),
          glyphs = _this$layout.glyphs,
          positions = _this$layout.positions;

      var res = [];

      for (var i = 0; i < glyphs.length; i++) {
        var glyph = glyphs[i];
        var gid = this.subset.includeGlyph(glyph.id);
        res.push("0000".concat(gid.toString(16)).slice(-4));

        if (this.widths[gid] == null) {
          this.widths[gid] = glyph.advanceWidth * this.scale;
        }

        if (this.unicode[gid] == null) {
          this.unicode[gid] = glyph.codePoints;
        }
      }

      return [res, positions];
    }
  }, {
    key: "widthOfString",
    value: function widthOfString(string, size, features) {
      var width = this.layout(string, features, true).advanceWidth;
      var scale = size / 1000;
      return width * scale;
    }
  }, {
    key: "embed",
    value: function embed() {
      var _this2 = this;

      var isCFF = this.subset.cff != null;
      var fontFile = this.document.ref();

      if (isCFF) {
        fontFile.data.Subtype = 'CIDFontType0C';
      }

      this.subset.encodeStream().on('data', function (data) {
        return fontFile.write(data);
      }).on('end', function () {
        return fontFile.end();
      });
      var familyClass = ((this.font['OS/2'] != null ? this.font['OS/2'].sFamilyClass : undefined) || 0) >> 8;
      var flags = 0;

      if (this.font.post.isFixedPitch) {
        flags |= 1 << 0;
      }

      if (1 <= familyClass && familyClass <= 7) {
        flags |= 1 << 1;
      }

      flags |= 1 << 2; // assume the font uses non-latin characters

      if (familyClass === 10) {
        flags |= 1 << 3;
      }

      if (this.font.head.macStyle.italic) {
        flags |= 1 << 6;
      } // generate a tag (6 uppercase letters. 17 is the char code offset from '0' to 'A'. 73 will map to 'Z')


      var tag = [1, 2, 3, 4, 5, 6].map(function (i) {
        return String.fromCharCode((_this2.id.charCodeAt(i) || 73) + 17);
      }).join('');
      var name = tag + '+' + this.font.postscriptName;
      var bbox = this.font.bbox;
      var descriptor = this.document.ref({
        Type: 'FontDescriptor',
        FontName: name,
        Flags: flags,
        FontBBox: [bbox.minX * this.scale, bbox.minY * this.scale, bbox.maxX * this.scale, bbox.maxY * this.scale],
        ItalicAngle: this.font.italicAngle,
        Ascent: this.ascender,
        Descent: this.descender,
        CapHeight: (this.font.capHeight || this.font.ascent) * this.scale,
        XHeight: (this.font.xHeight || 0) * this.scale,
        StemV: 0
      }); // not sure how to calculate this

      if (isCFF) {
        descriptor.data.FontFile3 = fontFile;
      } else {
        descriptor.data.FontFile2 = fontFile;
      }

      descriptor.end();
      var descendantFontData = {
        Type: 'Font',
        Subtype: 'CIDFontType0',
        BaseFont: name,
        CIDSystemInfo: {
          Registry: new String('Adobe'),
          Ordering: new String('Identity'),
          Supplement: 0
        },
        FontDescriptor: descriptor,
        W: [0, this.widths]
      };

      if (!isCFF) {
        descendantFontData.Subtype = 'CIDFontType2';
        descendantFontData.CIDToGIDMap = 'Identity';
      }

      var descendantFont = this.document.ref(descendantFontData);
      descendantFont.end();
      this.dictionary.data = {
        Type: 'Font',
        Subtype: 'Type0',
        BaseFont: name,
        Encoding: 'Identity-H',
        DescendantFonts: [descendantFont],
        ToUnicode: this.toUnicodeCmap()
      };
      return this.dictionary.end();
    } // Maps the glyph ids encoded in the PDF back to unicode strings
    // Because of ligature substitutions and the like, there may be one or more
    // unicode characters represented by each glyph.

  }, {
    key: "toUnicodeCmap",
    value: function toUnicodeCmap() {
      var cmap = this.document.ref();
      var entries = [];

      var _iterator = _createForOfIteratorHelper(this.unicode),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var codePoints = _step.value;
          var encoded = []; // encode codePoints to utf16

          var _iterator2 = _createForOfIteratorHelper(codePoints),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var value = _step2.value;

              if (value > 0xffff) {
                value -= 0x10000;
                encoded.push(toHex(value >>> 10 & 0x3ff | 0xd800));
                value = 0xdc00 | value & 0x3ff;
              }

              encoded.push(toHex(value));
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          entries.push("<".concat(encoded.join(' '), ">"));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      cmap.end("/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo <<\n  /Registry (Adobe)\n  /Ordering (UCS)\n  /Supplement 0\n>> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<0000><ffff>\nendcodespacerange\n1 beginbfrange\n<0000> <".concat(toHex(entries.length - 1), "> [").concat(entries.join(' '), "]\nendbfrange\nendcmap\nCMapName currentdict /CMap defineresource pop\nend\nend"));
      return cmap;
    }
  }]);

  return EmbeddedFont;
}(PDFFont);

var PDFFontFactory = /*#__PURE__*/function () {
  function PDFFontFactory() {
    _classCallCheck(this, PDFFontFactory);
  }

  _createClass(PDFFontFactory, null, [{
    key: "open",
    value: function open(document, src, family, id) {
      var font;

      if (typeof src === 'string') {
        if (StandardFont.isStandardFont(src)) {
          return new StandardFont(document, src, id);
        }

        src = fs.readFileSync(src);
      }

      if (Buffer.isBuffer(src)) {
        font = fontkit.create(src, family);
      } else if (src instanceof Uint8Array) {
        font = fontkit.create(Buffer.from(src), family);
      } else if (src instanceof ArrayBuffer) {
        font = fontkit.create(Buffer.from(new Uint8Array(src)), family);
      }

      if (font == null) {
        throw new Error('Not a supported font format or standard PDF font.');
      }

      return new EmbeddedFont(document, font, id);
    }
  }]);

  return PDFFontFactory;
}();

var FontsMixin = {
  initFonts: function initFonts() {
    var defaultFont = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Helvetica';
    // Lookup table for embedded fonts
    this._fontFamilies = {};
    this._fontCount = 0; // Font state

    this._fontSize = 12;
    this._font = null;
    this._registeredFonts = {}; // Set the default font

    if (defaultFont) {
      this.font(defaultFont);
    }
  },
  font: function font(src, family, size) {
    var cacheKey, font;

    if (typeof family === 'number') {
      size = family;
      family = null;
    } // check registered fonts if src is a string


    if (typeof src === 'string' && this._registeredFonts[src]) {
      cacheKey = src;
      var _this$_registeredFont = this._registeredFonts[src];
      src = _this$_registeredFont.src;
      family = _this$_registeredFont.family;
    } else {
      cacheKey = family || src;

      if (typeof cacheKey !== 'string') {
        cacheKey = null;
      }
    }

    if (size != null) {
      this.fontSize(size);
    } // fast path: check if the font is already in the PDF


    if (font = this._fontFamilies[cacheKey]) {
      this._font = font;
      return this;
    } // load the font


    var id = "F".concat(++this._fontCount);
    this._font = PDFFontFactory.open(this, src, family, id); // check for existing font familes with the same name already in the PDF
    // useful if the font was passed as a buffer

    if (font = this._fontFamilies[this._font.name]) {
      this._font = font;
      return this;
    } // save the font for reuse later


    if (cacheKey) {
      this._fontFamilies[cacheKey] = this._font;
    }

    if (this._font.name) {
      this._fontFamilies[this._font.name] = this._font;
    }

    return this;
  },
  fontSize: function fontSize(_fontSize) {
    this._fontSize = _fontSize;
    return this;
  },
  currentLineHeight: function currentLineHeight(includeGap) {
    if (includeGap == null) {
      includeGap = false;
    }

    return this._font.lineHeight(this._fontSize, includeGap);
  },
  registerFont: function registerFont(name, src, family) {
    this._registeredFonts[name] = {
      src: src,
      family: family
    };
    return this;
  }
};

var LineWrapper = /*#__PURE__*/function (_EventEmitter) {
  _inherits(LineWrapper, _EventEmitter);

  var _super = _createSuper(LineWrapper);

  function LineWrapper(document, options) {
    var _this;

    _classCallCheck(this, LineWrapper);

    _this = _super.call(this);
    _this.document = document;
    _this.indent = options.indent || 0;
    _this.characterSpacing = options.characterSpacing || 0;
    _this.wordSpacing = options.wordSpacing === 0;
    _this.columns = options.columns || 1;
    _this.columnGap = options.columnGap != null ? options.columnGap : 18; // 1/4 inch

    _this.lineWidth = (options.width - _this.columnGap * (_this.columns - 1)) / _this.columns;
    _this.spaceLeft = _this.lineWidth;
    _this.startX = _this.document.x;
    _this.startY = _this.document.y;
    _this.column = 1;
    _this.ellipsis = options.ellipsis;
    _this.continuedX = 0;
    _this.features = options.features; // calculate the maximum Y position the text can appear at

    if (options.height != null) {
      _this.height = options.height;
      _this.maxY = _this.startY + options.height;
    } else {
      _this.maxY = _this.document.page.maxY();
    } // handle paragraph indents


    _this.on('firstLine', function (options) {
      // if this is the first line of the text segment, and
      // we're continuing where we left off, indent that much
      // otherwise use the user specified indent option
      var indent = _this.continuedX || _this.indent;
      _this.document.x += indent;
      _this.lineWidth -= indent;
      return _this.once('line', function () {
        _this.document.x -= indent;
        _this.lineWidth += indent;

        if (options.continued && !_this.continuedX) {
          _this.continuedX = _this.indent;
        }

        if (!options.continued) {
          return _this.continuedX = 0;
        }
      });
    }); // handle left aligning last lines of paragraphs


    _this.on('lastLine', function (options) {
      var align = options.align;

      if (align === 'justify') {
        options.align = 'left';
      }

      _this.lastLine = true;
      return _this.once('line', function () {
        _this.document.y += options.paragraphGap || 0;
        options.align = align;
        return _this.lastLine = false;
      });
    });

    return _this;
  }

  _createClass(LineWrapper, [{
    key: "wordWidth",
    value: function wordWidth(word) {
      return this.document.widthOfString(word, this) + this.characterSpacing + this.wordSpacing;
    }
  }, {
    key: "eachWord",
    value: function eachWord(text, fn) {
      // setup a unicode line breaker
      var bk;
      var breaker = new LineBreaker(text);
      var last = null;
      var wordWidths = Object.create(null);

      while (bk = breaker.nextBreak()) {
        var shouldContinue;
        var word = text.slice((last != null ? last.position : undefined) || 0, bk.position);
        var w = wordWidths[word] != null ? wordWidths[word] : wordWidths[word] = this.wordWidth(word); // if the word is longer than the whole line, chop it up
        // TODO: break by grapheme clusters, not JS string characters

        if (w > this.lineWidth + this.continuedX) {
          // make some fake break objects
          var lbk = last;
          var fbk = {};

          while (word.length) {
            // fit as much of the word as possible into the space we have
            var l, mightGrow;

            if (w > this.spaceLeft) {
              // start our check at the end of our available space - this method is faster than a loop of each character and it resolves
              // an issue with long loops when processing massive words, such as a huge number of spaces
              l = Math.ceil(this.spaceLeft / (w / word.length));
              w = this.wordWidth(word.slice(0, l));
              mightGrow = w <= this.spaceLeft && l < word.length;
            } else {
              l = word.length;
            }

            var mustShrink = w > this.spaceLeft && l > 0; // shrink or grow word as necessary after our near-guess above

            while (mustShrink || mightGrow) {
              if (mustShrink) {
                w = this.wordWidth(word.slice(0, --l));
                mustShrink = w > this.spaceLeft && l > 0;
              } else {
                w = this.wordWidth(word.slice(0, ++l));
                mustShrink = w > this.spaceLeft && l > 0;
                mightGrow = w <= this.spaceLeft && l < word.length;
              }
            } // check for the edge case where a single character cannot fit into a line.


            if (l === 0 && this.spaceLeft === this.lineWidth) {
              l = 1;
            } // send a required break unless this is the last piece and a linebreak is not specified


            fbk.required = bk.required || l < word.length;
            shouldContinue = fn(word.slice(0, l), w, fbk, lbk);
            lbk = {
              required: false
            }; // get the remaining piece of the word

            word = word.slice(l);
            w = this.wordWidth(word);

            if (shouldContinue === false) {
              break;
            }
          }
        } else {
          // otherwise just emit the break as it was given to us
          shouldContinue = fn(word, w, bk, last);
        }

        if (shouldContinue === false) {
          break;
        }

        last = bk;
      }
    }
  }, {
    key: "wrap",
    value: function wrap(text, options) {
      var _this2 = this;

      // override options from previous continued fragments
      if (options.indent != null) {
        this.indent = options.indent;
      }

      if (options.characterSpacing != null) {
        this.characterSpacing = options.characterSpacing;
      }

      if (options.wordSpacing != null) {
        this.wordSpacing = options.wordSpacing;
      }

      if (options.ellipsis != null) {
        this.ellipsis = options.ellipsis;
      } // make sure we're actually on the page
      // and that the first line of is never by
      // itself at the bottom of a page (orphans)


      var nextY = this.document.y + this.document.currentLineHeight(true);

      if (this.document.y > this.maxY || nextY > this.maxY) {
        this.nextSection();
      }

      var buffer = '';
      var textWidth = 0;
      var wc = 0;
      var lc = 0;
      var y = this.document.y; // used to reset Y pos if options.continued (below)

      var emitLine = function emitLine() {
        options.textWidth = textWidth + _this2.wordSpacing * (wc - 1);
        options.wordCount = wc;
        options.lineWidth = _this2.lineWidth;
        y = _this2.document.y;

        _this2.emit('line', buffer, options, _this2);

        return lc++;
      };

      this.emit('sectionStart', options, this);
      this.eachWord(text, function (word, w, bk, last) {
        if (last == null || last.required) {
          _this2.emit('firstLine', options, _this2);

          _this2.spaceLeft = _this2.lineWidth;
        }

        if (w <= _this2.spaceLeft) {
          buffer += word;
          textWidth += w;
          wc++;
        }

        if (bk.required || w > _this2.spaceLeft) {
          // if the user specified a max height and an ellipsis, and is about to pass the
          // max height and max columns after the next line, append the ellipsis
          var lh = _this2.document.currentLineHeight(true);

          if (_this2.height != null && _this2.ellipsis && _this2.document.y + lh * 2 > _this2.maxY && _this2.column >= _this2.columns) {
            if (_this2.ellipsis === true) {
              _this2.ellipsis = '…';
            } // map default ellipsis character


            buffer = buffer.replace(/\s+$/, '');
            textWidth = _this2.wordWidth(buffer + _this2.ellipsis); // remove characters from the buffer until the ellipsis fits
            // to avoid infinite loop need to stop while-loop if buffer is empty string

            while (buffer && textWidth > _this2.lineWidth) {
              buffer = buffer.slice(0, -1).replace(/\s+$/, '');
              textWidth = _this2.wordWidth(buffer + _this2.ellipsis);
            } // need to add ellipsis only if there is enough space for it


            if (textWidth <= _this2.lineWidth) {
              buffer = buffer + _this2.ellipsis;
            }

            textWidth = _this2.wordWidth(buffer);
          }

          if (bk.required) {
            if (w > _this2.spaceLeft) {
              emitLine();
              buffer = word;
              textWidth = w;
              wc = 1;
            }

            _this2.emit('lastLine', options, _this2);
          }

          emitLine(); // if we've reached the edge of the page,
          // continue on a new page or column

          if (_this2.document.y + lh > _this2.maxY) {
            var shouldContinue = _this2.nextSection(); // stop if we reached the maximum height


            if (!shouldContinue) {
              wc = 0;
              buffer = '';
              return false;
            }
          } // reset the space left and buffer


          if (bk.required) {
            _this2.spaceLeft = _this2.lineWidth;
            buffer = '';
            textWidth = 0;
            return wc = 0;
          } else {
            // reset the space left and buffer
            _this2.spaceLeft = _this2.lineWidth - w;
            buffer = word;
            textWidth = w;
            return wc = 1;
          }
        } else {
          return _this2.spaceLeft -= w;
        }
      });

      if (wc > 0) {
        this.emit('lastLine', options, this);
        emitLine();
      }

      this.emit('sectionEnd', options, this); // if the wrap is set to be continued, save the X position
      // to start the first line of the next segment at, and reset
      // the y position

      if (options.continued === true) {
        if (lc > 1) {
          this.continuedX = 0;
        }

        this.continuedX += options.textWidth || 0;
        return this.document.y = y;
      } else {
        return this.document.x = this.startX;
      }
    }
  }, {
    key: "nextSection",
    value: function nextSection(options) {
      this.emit('sectionEnd', options, this);

      if (++this.column > this.columns) {
        // if a max height was specified by the user, we're done.
        // otherwise, the default is to make a new page at the bottom.
        if (this.height != null) {
          return false;
        }

        this.document.continueOnNewPage();
        this.column = 1;
        this.startY = this.document.page.margins.top;
        this.maxY = this.document.page.maxY();
        this.document.x = this.startX;

        if (this.document._fillColor) {
          var _this$document;

          (_this$document = this.document).fillColor.apply(_this$document, _toConsumableArray(this.document._fillColor));
        }

        this.emit('pageBreak', options, this);
      } else {
        this.document.x += this.lineWidth + this.columnGap;
        this.document.y = this.startY;
        this.emit('columnBreak', options, this);
      }

      this.emit('sectionStart', options, this);
      return true;
    }
  }]);

  return LineWrapper;
}(EventEmitter);

var number$2 = PDFObject.number;
var TextMixin = {
  initText: function initText() {
    this._line = this._line.bind(this); // Current coordinates

    this.x = 0;
    this.y = 0;
    return this._lineGap = 0;
  },
  lineGap: function lineGap(_lineGap) {
    this._lineGap = _lineGap;
    return this;
  },
  moveDown: function moveDown(lines) {
    if (lines == null) {
      lines = 1;
    }

    this.y += this.currentLineHeight(true) * lines + this._lineGap;
    return this;
  },
  moveUp: function moveUp(lines) {
    if (lines == null) {
      lines = 1;
    }

    this.y -= this.currentLineHeight(true) * lines + this._lineGap;
    return this;
  },
  _text: function _text(text, x, y, options, lineCallback) {
    var _this = this;

    options = this._initOptions(x, y, options); // Convert text to a string

    text = text == null ? '' : "".concat(text); // if the wordSpacing option is specified, remove multiple consecutive spaces

    if (options.wordSpacing) {
      text = text.replace(/\s{2,}/g, ' ');
    }

    var addStructure = function addStructure() {
      if (options.structParent) {
        options.structParent.add(_this.struct(options.structType || 'P', [_this.markStructureContent(options.structType || 'P')]));
      }
    }; // word wrapping


    if (options.width) {
      var wrapper = this._wrapper;

      if (!wrapper) {
        wrapper = new LineWrapper(this, options);
        wrapper.on('line', lineCallback);
        wrapper.on('firstLine', addStructure);
      }

      this._wrapper = options.continued ? wrapper : null;
      this._textOptions = options.continued ? options : null;
      wrapper.wrap(text, options); // render paragraphs as single lines
    } else {
      var _iterator = _createForOfIteratorHelper(text.split('\n')),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var line = _step.value;
          addStructure();
          lineCallback(line, options);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    return this;
  },
  text: function text(_text2, x, y, options) {
    return this._text(_text2, x, y, options, this._line);
  },
  widthOfString: function widthOfString(string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return this._font.widthOfString(string, this._fontSize, options.features) + (options.characterSpacing || 0) * (string.length - 1);
  },
  heightOfString: function heightOfString(text, options) {
    var _this2 = this;

    var x = this.x,
        y = this.y;
    options = this._initOptions(options);
    options.height = Infinity; // don't break pages

    var lineGap = options.lineGap || this._lineGap || 0;

    this._text(text, this.x, this.y, options, function () {
      return _this2.y += _this2.currentLineHeight(true) + lineGap;
    });

    var height = this.y - y;
    this.x = x;
    this.y = y;
    return height;
  },
  list: function list(_list, x, y, options, wrapper) {
    var _this3 = this;

    options = this._initOptions(x, y, options);
    var listType = options.listType || 'bullet';
    var unit = Math.round(this._font.ascender / 1000 * this._fontSize);
    var midLine = unit / 2;
    var r = options.bulletRadius || unit / 3;
    var indent = options.textIndent || (listType === 'bullet' ? r * 5 : unit * 2);
    var itemIndent = options.bulletIndent || (listType === 'bullet' ? r * 8 : unit * 2);
    var level = 1;
    var items = [];
    var levels = [];
    var numbers = [];

    var flatten = function flatten(list) {
      var n = 1;

      for (var _i = 0; _i < list.length; _i++) {
        var item = list[_i];

        if (Array.isArray(item)) {
          level++;
          flatten(item);
          level--;
        } else {
          items.push(item);
          levels.push(level);

          if (listType !== 'bullet') {
            numbers.push(n++);
          }
        }
      }
    };

    flatten(_list);

    var label = function label(n) {
      switch (listType) {
        case 'numbered':
          return "".concat(n, ".");

        case 'lettered':
          var letter = String.fromCharCode((n - 1) % 26 + 65);
          var times = Math.floor((n - 1) / 26 + 1);
          var text = Array(times + 1).join(letter);
          return "".concat(text, ".");
      }
    };

    wrapper = new LineWrapper(this, options);
    wrapper.on('line', this._line);
    level = 1;
    var i = 0;
    wrapper.on('firstLine', function () {
      var item, itemType, labelType, bodyType;

      if (options.structParent) {
        if (options.structTypes) {
          var _options$structTypes = _slicedToArray(options.structTypes, 3);

          itemType = _options$structTypes[0];
          labelType = _options$structTypes[1];
          bodyType = _options$structTypes[2];
        } else {
          itemType = 'LI';
          labelType = 'Lbl';
          bodyType = 'LBody';
        }
      }

      if (itemType) {
        item = _this3.struct(itemType);
        options.structParent.add(item);
      } else if (options.structParent) {
        item = options.structParent;
      }

      var l;

      if ((l = levels[i++]) !== level) {
        var diff = itemIndent * (l - level);
        _this3.x += diff;
        wrapper.lineWidth -= diff;
        level = l;
      }

      if (item && (labelType || bodyType)) {
        item.add(_this3.struct(labelType || bodyType, [_this3.markStructureContent(labelType || bodyType)]));
      }

      switch (listType) {
        case 'bullet':
          _this3.circle(_this3.x - indent + r, _this3.y + midLine, r);

          _this3.fill();

          break;

        case 'numbered':
        case 'lettered':
          var text = label(numbers[i - 1]);

          _this3._fragment(text, _this3.x - indent, _this3.y, options);

          break;
      }

      if (item && labelType && bodyType) {
        item.add(_this3.struct(bodyType, [_this3.markStructureContent(bodyType)]));
      }

      if (item && item !== options.structParent) {
        item.end();
      }
    });
    wrapper.on('sectionStart', function () {
      var pos = indent + itemIndent * (level - 1);
      _this3.x += pos;
      return wrapper.lineWidth -= pos;
    });
    wrapper.on('sectionEnd', function () {
      var pos = indent + itemIndent * (level - 1);
      _this3.x -= pos;
      return wrapper.lineWidth += pos;
    });
    wrapper.wrap(items.join('\n'), options);
    return this;
  },
  _initOptions: function _initOptions() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var y = arguments.length > 1 ? arguments[1] : undefined;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (typeof x === 'object') {
      options = x;
      x = null;
    } // clone options object


    var result = Object.assign({}, options); // extend options with previous values for continued text

    if (this._textOptions) {
      for (var key in this._textOptions) {
        var val = this._textOptions[key];

        if (key !== 'continued') {
          if (result[key] === undefined) {
            result[key] = val;
          }
        }
      }
    } // Update the current position


    if (x != null) {
      this.x = x;
    }

    if (y != null) {
      this.y = y;
    } // wrap to margins if no x or y position passed


    if (result.lineBreak !== false) {
      if (result.width == null) {
        result.width = this.page.width - this.x - this.page.margins.right;
      }

      result.width = Math.max(result.width, 0);
    }

    if (!result.columns) {
      result.columns = 0;
    }

    if (result.columnGap == null) {
      result.columnGap = 18;
    } // 1/4 inch


    return result;
  },
  _line: function _line(text) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var wrapper = arguments.length > 2 ? arguments[2] : undefined;

    this._fragment(text, this.x, this.y, options);

    var lineGap = options.lineGap || this._lineGap || 0;

    if (!wrapper) {
      return this.x += this.widthOfString(text);
    } else {
      return this.y += this.currentLineHeight(true) + lineGap;
    }
  },
  _fragment: function _fragment(text, x, y, options) {
    var _this4 = this;

    var dy, encoded, i, positions, textWidth, words;
    text = "".concat(text).replace(/\n/g, '');

    if (text.length === 0) {
      return;
    } // handle options


    var align = options.align || 'left';
    var wordSpacing = options.wordSpacing || 0;
    var characterSpacing = options.characterSpacing || 0; // text alignments

    if (options.width) {
      switch (align) {
        case 'right':
          textWidth = this.widthOfString(text.replace(/\s+$/, ''), options);
          x += options.lineWidth - textWidth;
          break;

        case 'center':
          x += options.lineWidth / 2 - options.textWidth / 2;
          break;

        case 'justify':
          // calculate the word spacing value
          words = text.trim().split(/\s+/);
          textWidth = this.widthOfString(text.replace(/\s+/g, ''), options);
          var spaceWidth = this.widthOfString(' ') + characterSpacing;
          wordSpacing = Math.max(0, (options.lineWidth - textWidth) / Math.max(1, words.length - 1) - spaceWidth);
          break;
      }
    } // text baseline alignments based on http://wiki.apache.org/xmlgraphics-fop/LineLayout/AlignmentHandling


    if (typeof options.baseline === 'number') {
      dy = -options.baseline;
    } else {
      switch (options.baseline) {
        case 'svg-middle':
          dy = 0.5 * this._font.xHeight;
          break;

        case 'middle':
        case 'svg-central':
          dy = 0.5 * (this._font.descender + this._font.ascender);
          break;

        case 'bottom':
        case 'ideographic':
          dy = this._font.descender;
          break;

        case 'alphabetic':
          dy = 0;
          break;

        case 'mathematical':
          dy = 0.5 * this._font.ascender;
          break;

        case 'hanging':
          dy = 0.8 * this._font.ascender;
          break;

        case 'top':
          dy = this._font.ascender;
          break;

        default:
          dy = this._font.ascender;
      }

      dy = dy / 1000 * this._fontSize;
    } // calculate the actual rendered width of the string after word and character spacing


    var renderedWidth = options.textWidth + wordSpacing * (options.wordCount - 1) + characterSpacing * (text.length - 1); // create link annotations if the link option is given

    if (options.link != null) {
      this.link(x, y, renderedWidth, this.currentLineHeight(), options.link);
    }

    if (options.goTo != null) {
      this.goTo(x, y, renderedWidth, this.currentLineHeight(), options.goTo);
    }

    if (options.destination != null) {
      this.addNamedDestination(options.destination, 'XYZ', x, y, null);
    } // create underline


    if (options.underline) {
      this.save();

      if (!options.stroke) {
        this.strokeColor.apply(this, _toConsumableArray(this._fillColor || []));
      }

      var lineWidth = this._fontSize < 10 ? 0.5 : Math.floor(this._fontSize / 10);
      this.lineWidth(lineWidth);
      var lineY = y + this.currentLineHeight() - lineWidth;
      this.moveTo(x, lineY);
      this.lineTo(x + renderedWidth, lineY);
      this.stroke();
      this.restore();
    } // create strikethrough line


    if (options.strike) {
      this.save();

      if (!options.stroke) {
        this.strokeColor.apply(this, _toConsumableArray(this._fillColor || []));
      }

      var _lineWidth = this._fontSize < 10 ? 0.5 : Math.floor(this._fontSize / 10);

      this.lineWidth(_lineWidth);

      var _lineY = y + this.currentLineHeight() / 2;

      this.moveTo(x, _lineY);
      this.lineTo(x + renderedWidth, _lineY);
      this.stroke();
      this.restore();
    }

    this.save(); // oblique (angle in degrees or boolean)

    if (options.oblique) {
      var skew;

      if (typeof options.oblique === 'number') {
        skew = -Math.tan(options.oblique * Math.PI / 180);
      } else {
        skew = -0.25;
      }

      this.transform(1, 0, 0, 1, x, y);
      this.transform(1, 0, skew, 1, -skew * dy, 0);
      this.transform(1, 0, 0, 1, -x, -y);
    } // flip coordinate system


    this.transform(1, 0, 0, -1, 0, this.page.height);
    y = this.page.height - y - dy; // add current font to page if necessary

    if (this.page.fonts[this._font.id] == null) {
      this.page.fonts[this._font.id] = this._font.ref();
    } // begin the text object


    this.addContent('BT'); // text position

    this.addContent("1 0 0 1 ".concat(number$2(x), " ").concat(number$2(y), " Tm")); // font and font size

    this.addContent("/".concat(this._font.id, " ").concat(number$2(this._fontSize), " Tf")); // rendering mode

    var mode = options.fill && options.stroke ? 2 : options.stroke ? 1 : 0;

    if (mode) {
      this.addContent("".concat(mode, " Tr"));
    } // Character spacing


    if (characterSpacing) {
      this.addContent("".concat(number$2(characterSpacing), " Tc"));
    } // Add the actual text
    // If we have a word spacing value, we need to encode each word separately
    // since the normal Tw operator only works on character code 32, which isn't
    // used for embedded fonts.


    if (wordSpacing) {
      words = text.trim().split(/\s+/);
      wordSpacing += this.widthOfString(' ') + characterSpacing;
      wordSpacing *= 1000 / this._fontSize;
      encoded = [];
      positions = [];

      var _iterator2 = _createForOfIteratorHelper(words),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var word = _step2.value;

          var _this$_font$encode = this._font.encode(word, options.features),
              _this$_font$encode2 = _slicedToArray(_this$_font$encode, 2),
              encodedWord = _this$_font$encode2[0],
              positionsWord = _this$_font$encode2[1];

          encoded = encoded.concat(encodedWord);
          positions = positions.concat(positionsWord); // add the word spacing to the end of the word
          // clone object because of cache

          var space = {};
          var object = positions[positions.length - 1];

          for (var key in object) {
            var val = object[key];
            space[key] = val;
          }

          space.xAdvance += wordSpacing;
          positions[positions.length - 1] = space;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    } else {
      var _this$_font$encode3 = this._font.encode(text, options.features);

      var _this$_font$encode4 = _slicedToArray(_this$_font$encode3, 2);

      encoded = _this$_font$encode4[0];
      positions = _this$_font$encode4[1];
    }

    var scale = this._fontSize / 1000;
    var commands = [];
    var last = 0;
    var hadOffset = false; // Adds a segment of text to the TJ command buffer

    var addSegment = function addSegment(cur) {
      if (last < cur) {
        var hex = encoded.slice(last, cur).join('');
        var advance = positions[cur - 1].xAdvance - positions[cur - 1].advanceWidth;
        commands.push("<".concat(hex, "> ").concat(number$2(-advance)));
      }

      return last = cur;
    }; // Flushes the current TJ commands to the output stream


    var flush = function flush(i) {
      addSegment(i);

      if (commands.length > 0) {
        _this4.addContent("[".concat(commands.join(' '), "] TJ"));

        return commands.length = 0;
      }
    };

    for (i = 0; i < positions.length; i++) {
      // If we have an x or y offset, we have to break out of the current TJ command
      // so we can move the text position.
      var pos = positions[i];

      if (pos.xOffset || pos.yOffset) {
        // Flush the current buffer
        flush(i); // Move the text position and flush just the current character

        this.addContent("1 0 0 1 ".concat(number$2(x + pos.xOffset * scale), " ").concat(number$2(y + pos.yOffset * scale), " Tm"));
        flush(i + 1);
        hadOffset = true;
      } else {
        // If the last character had an offset, reset the text position
        if (hadOffset) {
          this.addContent("1 0 0 1 ".concat(number$2(x), " ").concat(number$2(y), " Tm"));
          hadOffset = false;
        } // Group segments that don't have any advance adjustments


        if (pos.xAdvance - pos.advanceWidth !== 0) {
          addSegment(i + 1);
        }
      }

      x += pos.xAdvance * scale;
    } // Flush any remaining commands


    flush(i); // end the text object

    this.addContent('ET'); // restore flipped coordinate system

    return this.restore();
  }
};

var MARKERS = [0xffc0, 0xffc1, 0xffc2, 0xffc3, 0xffc5, 0xffc6, 0xffc7, 0xffc8, 0xffc9, 0xffca, 0xffcb, 0xffcc, 0xffcd, 0xffce, 0xffcf];
var COLOR_SPACE_MAP = {
  1: 'DeviceGray',
  3: 'DeviceRGB',
  4: 'DeviceCMYK'
};

var JPEG = /*#__PURE__*/function () {
  function JPEG(data, label) {
    _classCallCheck(this, JPEG);

    var marker;
    this.data = data;
    this.label = label;

    if (this.data.readUInt16BE(0) !== 0xffd8) {
      throw 'SOI not found in JPEG';
    }

    var pos = 2;

    while (pos < this.data.length) {
      marker = this.data.readUInt16BE(pos);
      pos += 2;

      if (MARKERS.includes(marker)) {
        break;
      }

      pos += this.data.readUInt16BE(pos);
    }

    if (!MARKERS.includes(marker)) {
      throw 'Invalid JPEG.';
    }

    pos += 2;
    this.bits = this.data[pos++];
    this.height = this.data.readUInt16BE(pos);
    pos += 2;
    this.width = this.data.readUInt16BE(pos);
    pos += 2;
    var channels = this.data[pos++];
    this.colorSpace = COLOR_SPACE_MAP[channels];
    this.obj = null;
  }

  _createClass(JPEG, [{
    key: "embed",
    value: function embed(document) {
      if (this.obj) {
        return;
      }

      this.obj = document.ref({
        Type: 'XObject',
        Subtype: 'Image',
        BitsPerComponent: this.bits,
        Width: this.width,
        Height: this.height,
        ColorSpace: this.colorSpace,
        Filter: 'DCTDecode'
      }); // add extra decode params for CMYK images. By swapping the
      // min and max values from the default, we invert the colors. See
      // section 4.8.4 of the spec.

      if (this.colorSpace === 'DeviceCMYK') {
        this.obj.data['Decode'] = [1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0];
      }

      this.obj.end(this.data); // free memory

      return this.data = null;
    }
  }]);

  return JPEG;
}();

var PNGImage = /*#__PURE__*/function () {
  function PNGImage(data, label) {
    _classCallCheck(this, PNGImage);

    this.label = label;
    this.image = new PNG(data);
    this.width = this.image.width;
    this.height = this.image.height;
    this.imgData = this.image.imgData;
    this.obj = null;
  }

  _createClass(PNGImage, [{
    key: "embed",
    value: function embed(document) {
      var dataDecoded = false;
      this.document = document;

      if (this.obj) {
        return;
      }

      var hasAlphaChannel = this.image.hasAlphaChannel;
      var isInterlaced = this.image.interlaceMethod === 1;
      this.obj = this.document.ref({
        Type: 'XObject',
        Subtype: 'Image',
        BitsPerComponent: hasAlphaChannel ? 8 : this.image.bits,
        Width: this.width,
        Height: this.height,
        Filter: 'FlateDecode'
      });

      if (!hasAlphaChannel) {
        var params = this.document.ref({
          Predictor: isInterlaced ? 1 : 15,
          Colors: this.image.colors,
          BitsPerComponent: this.image.bits,
          Columns: this.width
        });
        this.obj.data['DecodeParms'] = params;
        params.end();
      }

      if (this.image.palette.length === 0) {
        this.obj.data['ColorSpace'] = this.image.colorSpace;
      } else {
        // embed the color palette in the PDF as an object stream
        var palette = this.document.ref();
        palette.end(Buffer.from(this.image.palette)); // build the color space array for the image

        this.obj.data['ColorSpace'] = ['Indexed', 'DeviceRGB', this.image.palette.length / 3 - 1, palette];
      } // For PNG color types 0, 2 and 3, the transparency data is stored in
      // a dedicated PNG chunk.


      if (this.image.transparency.grayscale != null) {
        // Use Color Key Masking (spec section 4.8.5)
        // An array with N elements, where N is two times the number of color components.
        var val = this.image.transparency.grayscale;
        this.obj.data['Mask'] = [val, val];
      } else if (this.image.transparency.rgb) {
        // Use Color Key Masking (spec section 4.8.5)
        // An array with N elements, where N is two times the number of color components.
        var rgb = this.image.transparency.rgb;
        var mask = [];

        var _iterator = _createForOfIteratorHelper(rgb),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var x = _step.value;
            mask.push(x, x);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        this.obj.data['Mask'] = mask;
      } else if (this.image.transparency.indexed) {
        // Create a transparency SMask for the image based on the data
        // in the PLTE and tRNS sections. See below for details on SMasks.
        dataDecoded = true;
        return this.loadIndexedAlphaChannel();
      } else if (hasAlphaChannel) {
        // For PNG color types 4 and 6, the transparency data is stored as a alpha
        // channel mixed in with the main image data. Separate this data out into an
        // SMask object and store it separately in the PDF.
        dataDecoded = true;
        return this.splitAlphaChannel();
      }

      if (isInterlaced && !dataDecoded) {
        return this.decodeData();
      }

      this.finalize();
    }
  }, {
    key: "finalize",
    value: function finalize() {
      if (this.alphaChannel) {
        var sMask = this.document.ref({
          Type: 'XObject',
          Subtype: 'Image',
          Height: this.height,
          Width: this.width,
          BitsPerComponent: 8,
          Filter: 'FlateDecode',
          ColorSpace: 'DeviceGray',
          Decode: [0, 1]
        });
        sMask.end(this.alphaChannel);
        this.obj.data['SMask'] = sMask;
      } // add the actual image data


      this.obj.end(this.imgData); // free memory

      this.image = null;
      return this.imgData = null;
    }
  }, {
    key: "splitAlphaChannel",
    value: function splitAlphaChannel() {
      var _this = this;

      return this.image.decodePixels(function (pixels) {
        var a, p;
        var colorCount = _this.image.colors;
        var pixelCount = _this.width * _this.height;
        var imgData = Buffer.alloc(pixelCount * colorCount);
        var alphaChannel = Buffer.alloc(pixelCount);
        var i = p = a = 0;
        var len = pixels.length; // For 16bit images copy only most significant byte (MSB) - PNG data is always stored in network byte order (MSB first)

        var skipByteCount = _this.image.bits === 16 ? 1 : 0;

        while (i < len) {
          for (var colorIndex = 0; colorIndex < colorCount; colorIndex++) {
            imgData[p++] = pixels[i++];
            i += skipByteCount;
          }

          alphaChannel[a++] = pixels[i++];
          i += skipByteCount;
        }

        _this.imgData = zlib.deflateSync(imgData);
        _this.alphaChannel = zlib.deflateSync(alphaChannel);
        return _this.finalize();
      });
    }
  }, {
    key: "loadIndexedAlphaChannel",
    value: function loadIndexedAlphaChannel() {
      var _this2 = this;

      var transparency = this.image.transparency.indexed;
      return this.image.decodePixels(function (pixels) {
        var alphaChannel = Buffer.alloc(_this2.width * _this2.height);
        var i = 0;

        for (var j = 0, end = pixels.length; j < end; j++) {
          alphaChannel[i++] = transparency[pixels[j]];
        }

        _this2.alphaChannel = zlib.deflateSync(alphaChannel);
        return _this2.finalize();
      });
    }
  }, {
    key: "decodeData",
    value: function decodeData() {
      var _this3 = this;

      this.image.decodePixels(function (pixels) {
        _this3.imgData = zlib.deflateSync(pixels);

        _this3.finalize();
      });
    }
  }]);

  return PNGImage;
}();

var PDFImage = /*#__PURE__*/function () {
  function PDFImage() {
    _classCallCheck(this, PDFImage);
  }

  _createClass(PDFImage, null, [{
    key: "open",
    value: function open(src, label) {
      var data;

      if (Buffer.isBuffer(src)) {
        data = src;
      } else if (src instanceof ArrayBuffer) {
        data = Buffer.from(new Uint8Array(src));
      } else {
        var match;

        if (match = /^data:.+;base64,(.*)$/.exec(src)) {
          data = Buffer.from(match[1], 'base64');
        } else {
          data = fs.readFileSync(src);

          if (!data) {
            return;
          }
        }
      }

      if (data[0] === 0xff && data[1] === 0xd8) {
        return new JPEG(data, label);
      } else if (data[0] === 0x89 && data.toString('ascii', 1, 4) === 'PNG') {
        return new PNGImage(data, label);
      } else {
        throw new Error('Unknown image format.');
      }
    }
  }]);

  return PDFImage;
}();

var ImagesMixin = {
  initImages: function initImages() {
    this._imageRegistry = {};
    return this._imageCount = 0;
  },
  image: function image(src, x, y) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var bh, bp, bw, image, ip, left, left1;

    if (typeof x === 'object') {
      options = x;
      x = null;
    }

    x = (left = x != null ? x : options.x) != null ? left : this.x;
    y = (left1 = y != null ? y : options.y) != null ? left1 : this.y;

    if (typeof src === 'string') {
      image = this._imageRegistry[src];
    }

    if (!image) {
      if (src.width && src.height) {
        image = src;
      } else {
        image = this.openImage(src);
      }
    }

    if (!image.obj) {
      image.embed(this);
    }

    if (this.page.xobjects[image.label] == null) {
      this.page.xobjects[image.label] = image.obj;
    }

    var w = options.width || image.width;
    var h = options.height || image.height;

    if (options.width && !options.height) {
      var wp = w / image.width;
      w = image.width * wp;
      h = image.height * wp;
    } else if (options.height && !options.width) {
      var hp = h / image.height;
      w = image.width * hp;
      h = image.height * hp;
    } else if (options.scale) {
      w = image.width * options.scale;
      h = image.height * options.scale;
    } else if (options.fit) {
      var _options$fit = _slicedToArray(options.fit, 2);

      bw = _options$fit[0];
      bh = _options$fit[1];
      bp = bw / bh;
      ip = image.width / image.height;

      if (ip > bp) {
        w = bw;
        h = bw / ip;
      } else {
        h = bh;
        w = bh * ip;
      }
    } else if (options.cover) {
      var _options$cover = _slicedToArray(options.cover, 2);

      bw = _options$cover[0];
      bh = _options$cover[1];
      bp = bw / bh;
      ip = image.width / image.height;

      if (ip > bp) {
        h = bh;
        w = bh * ip;
      } else {
        w = bw;
        h = bw / ip;
      }
    }

    if (options.fit || options.cover) {
      if (options.align === 'center') {
        x = x + bw / 2 - w / 2;
      } else if (options.align === 'right') {
        x = x + bw - w;
      }

      if (options.valign === 'center') {
        y = y + bh / 2 - h / 2;
      } else if (options.valign === 'bottom') {
        y = y + bh - h;
      }
    } // create link annotations if the link option is given


    if (options.link != null) {
      this.link(x, y, w, h, options.link);
    }

    if (options.goTo != null) {
      this.goTo(x, y, w, h, options.goTo);
    }

    if (options.destination != null) {
      this.addNamedDestination(options.destination, 'XYZ', x, y, null);
    } // Set the current y position to below the image if it is in the document flow


    if (this.y === y) {
      this.y += h;
    }

    this.save();
    this.transform(w, 0, 0, -h, x, y + h);
    this.addContent("/".concat(image.label, " Do"));
    this.restore();
    return this;
  },
  openImage: function openImage(src) {
    var image;

    if (typeof src === 'string') {
      image = this._imageRegistry[src];
    }

    if (!image) {
      image = PDFImage.open(src, "I".concat(++this._imageCount));

      if (typeof src === 'string') {
        this._imageRegistry[src] = image;
      }
    }

    return image;
  }
};

var AnnotationsMixin = {
  annotate: function annotate(x, y, w, h, options) {
    options.Type = 'Annot';
    options.Rect = this._convertRect(x, y, w, h);
    options.Border = [0, 0, 0];

    if (options.Subtype === 'Link' && typeof options.F === 'undefined') {
      options.F = 1 << 2; // Print Annotation Flag
    }

    if (options.Subtype !== 'Link') {
      if (options.C == null) {
        options.C = this._normalizeColor(options.color || [0, 0, 0]);
      }
    } // convert colors


    delete options.color;

    if (typeof options.Dest === 'string') {
      options.Dest = new String(options.Dest);
    } // Capitalize keys


    for (var key in options) {
      var val = options[key];
      options[key[0].toUpperCase() + key.slice(1)] = val;
    }

    var ref = this.ref(options);
    this.page.annotations.push(ref);
    ref.end();
    return this;
  },
  note: function note(x, y, w, h, contents) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    options.Subtype = 'Text';
    options.Contents = new String(contents);
    options.Name = 'Comment';

    if (options.color == null) {
      options.color = [243, 223, 92];
    }

    return this.annotate(x, y, w, h, options);
  },
  goTo: function goTo(x, y, w, h, name) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    options.Subtype = 'Link';
    options.A = this.ref({
      S: 'GoTo',
      D: new String(name)
    });
    options.A.end();
    return this.annotate(x, y, w, h, options);
  },
  link: function link(x, y, w, h, url) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    options.Subtype = 'Link';

    if (typeof url === 'number') {
      // Link to a page in the document (the page must already exist)
      var pages = this._root.data.Pages.data;

      if (url >= 0 && url < pages.Kids.length) {
        options.A = this.ref({
          S: 'GoTo',
          D: [pages.Kids[url], 'XYZ', null, null, null]
        });
        options.A.end();
      } else {
        throw new Error("The document has no page ".concat(url));
      }
    } else {
      // Link to an external url
      options.A = this.ref({
        S: 'URI',
        URI: new String(url)
      });
      options.A.end();
    }

    return this.annotate(x, y, w, h, options);
  },
  _markup: function _markup(x, y, w, h) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    var _this$_convertRect = this._convertRect(x, y, w, h),
        _this$_convertRect2 = _slicedToArray(_this$_convertRect, 4),
        x1 = _this$_convertRect2[0],
        y1 = _this$_convertRect2[1],
        x2 = _this$_convertRect2[2],
        y2 = _this$_convertRect2[3];

    options.QuadPoints = [x1, y2, x2, y2, x1, y1, x2, y1];
    options.Contents = new String();
    return this.annotate(x, y, w, h, options);
  },
  highlight: function highlight(x, y, w, h) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    options.Subtype = 'Highlight';

    if (options.color == null) {
      options.color = [241, 238, 148];
    }

    return this._markup(x, y, w, h, options);
  },
  underline: function underline(x, y, w, h) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    options.Subtype = 'Underline';
    return this._markup(x, y, w, h, options);
  },
  strike: function strike(x, y, w, h) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    options.Subtype = 'StrikeOut';
    return this._markup(x, y, w, h, options);
  },
  lineAnnotation: function lineAnnotation(x1, y1, x2, y2) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    options.Subtype = 'Line';
    options.Contents = new String();
    options.L = [x1, this.page.height - y1, x2, this.page.height - y2];
    return this.annotate(x1, y1, x2, y2, options);
  },
  rectAnnotation: function rectAnnotation(x, y, w, h) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    options.Subtype = 'Square';
    options.Contents = new String();
    return this.annotate(x, y, w, h, options);
  },
  ellipseAnnotation: function ellipseAnnotation(x, y, w, h) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    options.Subtype = 'Circle';
    options.Contents = new String();
    return this.annotate(x, y, w, h, options);
  },
  textAnnotation: function textAnnotation(x, y, w, h, text) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    options.Subtype = 'FreeText';
    options.Contents = new String(text);
    options.DA = new String();
    return this.annotate(x, y, w, h, options);
  },
  fileAnnotation: function fileAnnotation(x, y, w, h) {
    var file = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    // create hidden file
    var filespec = this.file(file.src, Object.assign({
      hidden: true
    }, file));
    options.Subtype = 'FileAttachment';
    options.FS = filespec; // add description from filespec unless description (Contents) has already been set

    if (options.Contents) {
      options.Contents = new String(options.Contents);
    } else if (filespec.data.Desc) {
      options.Contents = filespec.data.Desc;
    }

    return this.annotate(x, y, w, h, options);
  },
  _convertRect: function _convertRect(x1, y1, w, h) {
    // flip y1 and y2
    var y2 = y1;
    y1 += h; // make x2

    var x2 = x1 + w; // apply current transformation matrix to points

    var _this$_ctm = _slicedToArray(this._ctm, 6),
        m0 = _this$_ctm[0],
        m1 = _this$_ctm[1],
        m2 = _this$_ctm[2],
        m3 = _this$_ctm[3],
        m4 = _this$_ctm[4],
        m5 = _this$_ctm[5];

    x1 = m0 * x1 + m2 * y1 + m4;
    y1 = m1 * x1 + m3 * y1 + m5;
    x2 = m0 * x2 + m2 * y2 + m4;
    y2 = m1 * x2 + m3 * y2 + m5;
    return [x1, y1, x2, y2];
  }
};

var PDFOutline = /*#__PURE__*/function () {
  function PDFOutline(document, parent, title, dest) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
      expanded: false
    };

    _classCallCheck(this, PDFOutline);

    this.document = document;
    this.options = options;
    this.outlineData = {};

    if (dest !== null) {
      this.outlineData['Dest'] = [dest.dictionary, 'Fit'];
    }

    if (parent !== null) {
      this.outlineData['Parent'] = parent;
    }

    if (title !== null) {
      this.outlineData['Title'] = new String(title);
    }

    this.dictionary = this.document.ref(this.outlineData);
    this.children = [];
  }

  _createClass(PDFOutline, [{
    key: "addItem",
    value: function addItem(title) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        expanded: false
      };
      var result = new PDFOutline(this.document, this.dictionary, title, this.document.page, options);
      this.children.push(result);
      return result;
    }
  }, {
    key: "endOutline",
    value: function endOutline() {
      if (this.children.length > 0) {
        if (this.options.expanded) {
          this.outlineData.Count = this.children.length;
        }

        var first = this.children[0],
            last = this.children[this.children.length - 1];
        this.outlineData.First = first.dictionary;
        this.outlineData.Last = last.dictionary;

        for (var i = 0, len = this.children.length; i < len; i++) {
          var child = this.children[i];

          if (i > 0) {
            child.outlineData.Prev = this.children[i - 1].dictionary;
          }

          if (i < this.children.length - 1) {
            child.outlineData.Next = this.children[i + 1].dictionary;
          }

          child.endOutline();
        }
      }

      return this.dictionary.end();
    }
  }]);

  return PDFOutline;
}();

var OutlineMixin = {
  initOutline: function initOutline() {
    return this.outline = new PDFOutline(this, null, null, null);
  },
  endOutline: function endOutline() {
    this.outline.endOutline();

    if (this.outline.children.length > 0) {
      this._root.data.Outlines = this.outline.dictionary;
      return this._root.data.PageMode = 'UseOutlines';
    }
  }
};

/*
PDFStructureContent - a reference to a marked structure content
By Ben Schmidt
*/
var PDFStructureContent = /*#__PURE__*/function () {
  function PDFStructureContent(pageRef, mcid) {
    _classCallCheck(this, PDFStructureContent);

    this.refs = [{
      pageRef: pageRef,
      mcid: mcid
    }];
  }

  _createClass(PDFStructureContent, [{
    key: "push",
    value: function push(structContent) {
      var _this = this;

      structContent.refs.forEach(function (ref) {
        return _this.refs.push(ref);
      });
    }
  }]);

  return PDFStructureContent;
}();

var PDFStructureElement = /*#__PURE__*/function () {
  function PDFStructureElement(document, type) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, PDFStructureElement);

    this.document = document;
    this._attached = false;
    this._ended = false;
    this._flushed = false;
    this.dictionary = document.ref({
      // Type: "StructElem",
      S: type
    });
    var data = this.dictionary.data;

    if (Array.isArray(options) || this._isValidChild(options)) {
      children = options;
      options = {};
    }

    if (typeof options.title !== 'undefined') {
      data.T = new String(options.title);
    }

    if (typeof options.lang !== 'undefined') {
      data.Lang = new String(options.lang);
    }

    if (typeof options.alt !== 'undefined') {
      data.Alt = new String(options.alt);
    }

    if (typeof options.expanded !== 'undefined') {
      data.E = new String(options.expanded);
    }

    if (typeof options.actual !== 'undefined') {
      data.ActualText = new String(options.actual);
    }

    this._children = [];

    if (children) {
      if (!Array.isArray(children)) {
        children = [children];
      }

      children.forEach(function (child) {
        return _this.add(child);
      });
      this.end();
    }
  }

  _createClass(PDFStructureElement, [{
    key: "add",
    value: function add(child) {
      if (this._ended) {
        throw new Error("Cannot add child to already-ended structure element");
      }

      if (!this._isValidChild(child)) {
        throw new Error("Invalid structure element child");
      }

      if (child instanceof PDFStructureElement) {
        child.setParent(this.dictionary);

        if (this._attached) {
          child.setAttached();
        }
      }

      if (child instanceof PDFStructureContent) {
        this._addContentToParentTree(child);
      }

      if (typeof child === 'function' && this._attached) {
        // _contentForClosure() adds the content to the parent tree
        child = this._contentForClosure(child);
      }

      this._children.push(child);

      return this;
    }
  }, {
    key: "_addContentToParentTree",
    value: function _addContentToParentTree(content) {
      var _this2 = this;

      content.refs.forEach(function (_ref) {
        var pageRef = _ref.pageRef,
            mcid = _ref.mcid;

        var pageStructParents = _this2.document.getStructParentTree().get(pageRef.data.StructParents);

        pageStructParents[mcid] = _this2.dictionary;
      });
    }
  }, {
    key: "setParent",
    value: function setParent(parentRef) {
      if (this.dictionary.data.P) {
        throw new Error("Structure element added to more than one parent");
      }

      this.dictionary.data.P = parentRef;

      this._flush();
    }
  }, {
    key: "setAttached",
    value: function setAttached() {
      var _this3 = this;

      if (this._attached) {
        return;
      }

      this._children.forEach(function (child, index) {
        if (child instanceof PDFStructureElement) {
          child.setAttached();
        }

        if (typeof child === 'function') {
          _this3._children[index] = _this3._contentForClosure(child);
        }
      });

      this._attached = true;

      this._flush();
    }
  }, {
    key: "end",
    value: function end() {
      if (this._ended) {
        return;
      }

      this._children.filter(function (child) {
        return child instanceof PDFStructureElement;
      }).forEach(function (child) {
        return child.end();
      });

      this._ended = true;

      this._flush();
    }
  }, {
    key: "_isValidChild",
    value: function _isValidChild(child) {
      return child instanceof PDFStructureElement || child instanceof PDFStructureContent || typeof child === 'function';
    }
  }, {
    key: "_contentForClosure",
    value: function _contentForClosure(closure) {
      var content = this.document.markStructureContent(this.dictionary.data.S);
      closure();
      this.document.endMarkedContent();

      this._addContentToParentTree(content);

      return content;
    }
  }, {
    key: "_isFlushable",
    value: function _isFlushable() {
      if (!this.dictionary.data.P || !this._ended) {
        return false;
      }

      return this._children.every(function (child) {
        if (typeof child === 'function') {
          return false;
        }

        if (child instanceof PDFStructureElement) {
          return child._isFlushable();
        }

        return true;
      });
    }
  }, {
    key: "_flush",
    value: function _flush() {
      var _this4 = this;

      if (this._flushed || !this._isFlushable()) {
        return;
      }

      this.dictionary.data.K = [];

      this._children.forEach(function (child) {
        return _this4._flushChild(child);
      });

      this.dictionary.end(); // free memory used by children; the dictionary itself may still be
      // referenced by a parent structure element or root, but we can
      // at least trim the tree here

      this._children = [];
      this.dictionary.data.K = null;
      this._flushed = true;
    }
  }, {
    key: "_flushChild",
    value: function _flushChild(child) {
      var _this5 = this;

      if (child instanceof PDFStructureElement) {
        this.dictionary.data.K.push(child.dictionary);
      }

      if (child instanceof PDFStructureContent) {
        child.refs.forEach(function (_ref2) {
          var pageRef = _ref2.pageRef,
              mcid = _ref2.mcid;

          if (!_this5.dictionary.data.Pg) {
            _this5.dictionary.data.Pg = pageRef;
          }

          if (_this5.dictionary.data.Pg === pageRef) {
            _this5.dictionary.data.K.push(mcid);
          } else {
            _this5.dictionary.data.K.push({
              Type: "MCR",
              Pg: pageRef,
              MCID: mcid
            });
          }
        });
      }
    }
  }]);

  return PDFStructureElement;
}();

var PDFNumberTree = /*#__PURE__*/function (_PDFTree) {
  _inherits(PDFNumberTree, _PDFTree);

  var _super = _createSuper(PDFNumberTree);

  function PDFNumberTree() {
    _classCallCheck(this, PDFNumberTree);

    return _super.apply(this, arguments);
  }

  _createClass(PDFNumberTree, [{
    key: "_compareKeys",
    value: function _compareKeys(a, b) {
      return parseInt(a) - parseInt(b);
    }
  }, {
    key: "_keysName",
    value: function _keysName() {
      return "Nums";
    }
  }, {
    key: "_dataForKey",
    value: function _dataForKey(k) {
      return parseInt(k);
    }
  }]);

  return PDFNumberTree;
}(PDFTree);

var MarkingsMixin = {
  initMarkings: function initMarkings(options) {
    this.structChildren = [];

    if (options.tagged) {
      this.getMarkInfoDictionary().data.Marked = true;
      this.getStructTreeRoot();
    }
  },
  markContent: function markContent(tag) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (tag === 'Artifact' || options && options.mcid) {
      var toClose = 0;
      this.page.markings.forEach(function (marking) {
        if (toClose || marking.structContent || marking.tag === 'Artifact') {
          toClose++;
        }
      });

      while (toClose--) {
        this.endMarkedContent();
      }
    }

    if (!options) {
      this.page.markings.push({
        tag: tag
      });
      this.addContent("/".concat(tag, " BMC"));
      return this;
    }

    this.page.markings.push({
      tag: tag,
      options: options
    });
    var dictionary = {};

    if (typeof options.mcid !== 'undefined') {
      dictionary.MCID = options.mcid;
    }

    if (tag === 'Artifact') {
      if (typeof options.type === 'string') {
        dictionary.Type = options.type;
      }

      if (Array.isArray(options.bbox)) {
        dictionary.BBox = [options.bbox[0], this.page.height - options.bbox[3], options.bbox[2], this.page.height - options.bbox[1]];
      }

      if (Array.isArray(options.attached) && options.attached.every(function (val) {
        return typeof val === 'string';
      })) {
        dictionary.Attached = options.attached;
      }
    }

    if (tag === 'Span') {
      if (options.lang) {
        dictionary.Lang = new String(options.lang);
      }

      if (options.alt) {
        dictionary.Alt = new String(options.alt);
      }

      if (options.expanded) {
        dictionary.E = new String(options.expanded);
      }

      if (options.actual) {
        dictionary.ActualText = new String(options.actual);
      }
    }

    this.addContent("/".concat(tag, " ").concat(PDFObject.convert(dictionary), " BDC"));
    return this;
  },
  markStructureContent: function markStructureContent(tag) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var pageStructParents = this.getStructParentTree().get(this.page.structParentTreeKey);
    var mcid = pageStructParents.length;
    pageStructParents.push(null);
    this.markContent(tag, _objectSpread2(_objectSpread2({}, options), {}, {
      mcid: mcid
    }));
    var structContent = new PDFStructureContent(this.page.dictionary, mcid);
    this.page.markings.slice(-1)[0].structContent = structContent;
    return structContent;
  },
  endMarkedContent: function endMarkedContent() {
    this.page.markings.pop();
    this.addContent('EMC');
    return this;
  },
  struct: function struct(type) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    return new PDFStructureElement(this, type, options, children);
  },
  addStructure: function addStructure(structElem) {
    var structTreeRoot = this.getStructTreeRoot();
    structElem.setParent(structTreeRoot);
    structElem.setAttached();
    this.structChildren.push(structElem);

    if (!structTreeRoot.data.K) {
      structTreeRoot.data.K = [];
    }

    structTreeRoot.data.K.push(structElem.dictionary);
    return this;
  },
  initPageMarkings: function initPageMarkings(pageMarkings) {
    var _this = this;

    pageMarkings.forEach(function (marking) {
      if (marking.structContent) {
        var structContent = marking.structContent;

        var newStructContent = _this.markStructureContent(marking.tag, marking.options);

        structContent.push(newStructContent);
        _this.page.markings.slice(-1)[0].structContent = structContent;
      } else {
        _this.markContent(marking.tag, marking.options);
      }
    });
  },
  endPageMarkings: function endPageMarkings(page) {
    var pageMarkings = page.markings;
    pageMarkings.forEach(function () {
      return page.write('EMC');
    });
    page.markings = [];
    return pageMarkings;
  },
  getMarkInfoDictionary: function getMarkInfoDictionary() {
    if (!this._root.data.MarkInfo) {
      this._root.data.MarkInfo = this.ref({});
    }

    return this._root.data.MarkInfo;
  },
  getStructTreeRoot: function getStructTreeRoot() {
    if (!this._root.data.StructTreeRoot) {
      this._root.data.StructTreeRoot = this.ref({
        Type: 'StructTreeRoot',
        ParentTree: new PDFNumberTree(),
        ParentTreeNextKey: 0
      });
    }

    return this._root.data.StructTreeRoot;
  },
  getStructParentTree: function getStructParentTree() {
    return this.getStructTreeRoot().data.ParentTree;
  },
  createStructParentTreeNextKey: function createStructParentTreeNextKey() {
    // initialise the MarkInfo dictionary
    this.getMarkInfoDictionary();
    var structTreeRoot = this.getStructTreeRoot();
    var key = structTreeRoot.data.ParentTreeNextKey++;
    structTreeRoot.data.ParentTree.add(key, []);
    return key;
  },
  endMarkings: function endMarkings() {
    var structTreeRoot = this._root.data.StructTreeRoot;

    if (structTreeRoot) {
      structTreeRoot.end();
      this.structChildren.forEach(function (structElem) {
        return structElem.end();
      });
    }

    if (this._root.data.MarkInfo) {
      this._root.data.MarkInfo.end();
    }
  }
};

var FIELD_FLAGS = {
  readOnly: 1,
  required: 2,
  noExport: 4,
  multiline: 0x1000,
  password: 0x2000,
  toggleToOffButton: 0x4000,
  radioButton: 0x8000,
  pushButton: 0x10000,
  combo: 0x20000,
  edit: 0x40000,
  sort: 0x80000,
  multiSelect: 0x200000,
  noSpell: 0x400000
};
var FIELD_JUSTIFY = {
  left: 0,
  center: 1,
  right: 2
};
var VALUE_MAP = {
  value: 'V',
  defaultValue: 'DV'
};
var FORMAT_SPECIAL = {
  zip: '0',
  zipPlus4: '1',
  zip4: '1',
  phone: '2',
  ssn: '3'
};
var FORMAT_DEFAULT = {
  number: {
    nDec: 0,
    sepComma: false,
    negStyle: 'MinusBlack',
    currency: '',
    currencyPrepend: true
  },
  percent: {
    nDec: 0,
    sepComma: false
  }
};
var AcroFormMixin = {
  /**
   * Must call if adding AcroForms to a document. Must also call font() before
   * this method to set the default font.
   */
  initForm: function initForm() {
    if (!this._font) {
      throw new Error('Must set a font before calling initForm method');
    }

    this._acroform = {
      fonts: {},
      defaultFont: this._font.name
    };
    this._acroform.fonts[this._font.id] = this._font.ref();
    var data = {
      Fields: [],
      NeedAppearances: true,
      DA: new String("/".concat(this._font.id, " 0 Tf 0 g")),
      DR: {
        Font: {}
      }
    };
    data.DR.Font[this._font.id] = this._font.ref();
    var AcroForm = this.ref(data);
    this._root.data.AcroForm = AcroForm;
    return this;
  },

  /**
   * Called automatically by document.js
   */
  endAcroForm: function endAcroForm() {
    var _this = this;

    if (this._root.data.AcroForm) {
      if (!Object.keys(this._acroform.fonts).length && !this._acroform.defaultFont) {
        throw new Error('No fonts specified for PDF form');
      }

      var fontDict = this._root.data.AcroForm.data.DR.Font;
      Object.keys(this._acroform.fonts).forEach(function (name) {
        fontDict[name] = _this._acroform.fonts[name];
      });

      this._root.data.AcroForm.data.Fields.forEach(function (fieldRef) {
        _this._endChild(fieldRef);
      });

      this._root.data.AcroForm.end();
    }

    return this;
  },
  _endChild: function _endChild(ref) {
    var _this2 = this;

    if (Array.isArray(ref.data.Kids)) {
      ref.data.Kids.forEach(function (childRef) {
        _this2._endChild(childRef);
      });
      ref.end();
    }

    return this;
  },

  /**
   * Creates and adds a form field to the document. Form fields are intermediate
   * nodes in a PDF form that are used to specify form name heirarchy and form
   * value defaults.
   * @param {string} name - field name (T attribute in field dictionary)
   * @param {object} options  - other attributes to include in field dictionary
   */
  formField: function formField(name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var fieldDict = this._fieldDict(name, null, options);

    var fieldRef = this.ref(fieldDict);

    this._addToParent(fieldRef);

    return fieldRef;
  },

  /**
   * Creates and adds a Form Annotation to the document. Form annotations are
   * called Widget annotations internally within a PDF file.
   * @param {string} name - form field name (T attribute of widget annotation
   * dictionary)
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @param {object} options
   */
  formAnnotation: function formAnnotation(name, type, x, y, w, h) {
    var options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};

    var fieldDict = this._fieldDict(name, type, options);

    fieldDict.Subtype = 'Widget';

    if (fieldDict.F === undefined) {
      fieldDict.F = 4; // print the annotation
    } // Add Field annot to page, and get it's ref


    this.annotate(x, y, w, h, fieldDict);
    var annotRef = this.page.annotations[this.page.annotations.length - 1];
    return this._addToParent(annotRef);
  },
  formText: function formText(name, x, y, w, h) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    return this.formAnnotation(name, 'text', x, y, w, h, options);
  },
  formPushButton: function formPushButton(name, x, y, w, h) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    return this.formAnnotation(name, 'pushButton', x, y, w, h, options);
  },
  formCombo: function formCombo(name, x, y, w, h) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    return this.formAnnotation(name, 'combo', x, y, w, h, options);
  },
  formList: function formList(name, x, y, w, h) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    return this.formAnnotation(name, 'list', x, y, w, h, options);
  },
  formRadioButton: function formRadioButton(name, x, y, w, h) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    return this.formAnnotation(name, 'radioButton', x, y, w, h, options);
  },
  formCheckbox: function formCheckbox(name, x, y, w, h) {
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    return this.formAnnotation(name, 'checkbox', x, y, w, h, options);
  },
  _addToParent: function _addToParent(fieldRef) {
    var parent = fieldRef.data.Parent;

    if (parent) {
      if (!parent.data.Kids) {
        parent.data.Kids = [];
      }

      parent.data.Kids.push(fieldRef);
    } else {
      this._root.data.AcroForm.data.Fields.push(fieldRef);
    }

    return this;
  },
  _fieldDict: function _fieldDict(name, type) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!this._acroform) {
      throw new Error('Call document.initForms() method before adding form elements to document');
    }

    var opts = Object.assign({}, options);

    if (type !== null) {
      opts = this._resolveType(type, options);
    }

    opts = this._resolveFlags(opts);
    opts = this._resolveJustify(opts);
    opts = this._resolveFont(opts);
    opts = this._resolveStrings(opts);
    opts = this._resolveColors(opts);
    opts = this._resolveFormat(opts);
    opts.T = new String(name);

    if (opts.parent) {
      opts.Parent = opts.parent;
      delete opts.parent;
    }

    return opts;
  },
  _resolveType: function _resolveType(type, opts) {
    if (type === 'text') {
      opts.FT = 'Tx';
    } else if (type === 'pushButton') {
      opts.FT = 'Btn';
      opts.pushButton = true;
    } else if (type === 'radioButton') {
      opts.FT = 'Btn';
      opts.radioButton = true;
    } else if (type === 'checkbox') {
      opts.FT = 'Btn';
    } else if (type === 'combo') {
      opts.FT = 'Ch';
      opts.combo = true;
    } else if (type === 'list') {
      opts.FT = 'Ch';
    } else {
      throw new Error("Invalid form annotation type '".concat(type, "'"));
    }

    return opts;
  },
  _resolveFormat: function _resolveFormat(opts) {
    var f = opts.format;

    if (f && f.type) {
      var fnKeystroke;
      var fnFormat;
      var params = '';

      if (FORMAT_SPECIAL[f.type] !== undefined) {
        fnKeystroke = "AFSpecial_Keystroke";
        fnFormat = "AFSpecial_Format";
        params = FORMAT_SPECIAL[f.type];
      } else {
        var format = f.type.charAt(0).toUpperCase() + f.type.slice(1);
        fnKeystroke = "AF".concat(format, "_Keystroke");
        fnFormat = "AF".concat(format, "_Format");

        if (f.type === 'date') {
          fnKeystroke += 'Ex';
          params = String(f.param);
        } else if (f.type === 'time') {
          params = String(f.param);
        } else if (f.type === 'number') {
          var p = Object.assign({}, FORMAT_DEFAULT.number, f);
          params = String([String(p.nDec), p.sepComma ? '0' : '1', '"' + p.negStyle + '"', 'null', '"' + p.currency + '"', String(p.currencyPrepend)].join(','));
        } else if (f.type === 'percent') {
          var _p = Object.assign({}, FORMAT_DEFAULT.percent, f);

          params = String([String(_p.nDec), _p.sepComma ? '0' : '1'].join(','));
        }
      }

      opts.AA = opts.AA ? opts.AA : {};
      opts.AA.K = {
        S: 'JavaScript',
        JS: new String("".concat(fnKeystroke, "(").concat(params, ");"))
      };
      opts.AA.F = {
        S: 'JavaScript',
        JS: new String("".concat(fnFormat, "(").concat(params, ");"))
      };
    }

    delete opts.format;
    return opts;
  },
  _resolveColors: function _resolveColors(opts) {
    var color = this._normalizeColor(opts.backgroundColor);

    if (color) {
      if (!opts.MK) {
        opts.MK = {};
      }

      opts.MK.BG = color;
    }

    color = this._normalizeColor(opts.borderColor);

    if (color) {
      if (!opts.MK) {
        opts.MK = {};
      }

      opts.MK.BC = color;
    }

    delete opts.backgroundColor;
    delete opts.borderColor;
    return opts;
  },
  _resolveFlags: function _resolveFlags(options) {
    var result = 0;
    Object.keys(options).forEach(function (key) {
      if (FIELD_FLAGS[key]) {
        result |= FIELD_FLAGS[key];
        delete options[key];
      }
    });

    if (result !== 0) {
      options.Ff = options.Ff ? options.Ff : 0;
      options.Ff |= result;
    }

    return options;
  },
  _resolveJustify: function _resolveJustify(options) {
    var result = 0;

    if (options.align !== undefined) {
      if (typeof FIELD_JUSTIFY[options.align] === 'number') {
        result = FIELD_JUSTIFY[options.align];
      }

      delete options.align;
    }

    if (result !== 0) {
      options.Q = result; // default
    }

    return options;
  },
  _resolveFont: function _resolveFont(options) {
    // add current font to document-level AcroForm dict if necessary
    if (this._acroform.fonts[this._font.id] === null) {
      this._acroform.fonts[this._font.id] = this._font.ref();
    } // add current font to field's resource dict (RD) if not the default acroform font


    if (this._acroform.defaultFont !== this._font.name) {
      options.DR = {
        Font: {}
      }; // Get the fontSize option. If not set use auto sizing

      var fontSize = options.fontSize || 0;
      options.DR.Font[this._font.id] = this._font.ref();
      options.DA = new String("/".concat(this._font.id, " ").concat(fontSize, " Tf 0 g"));
    }

    return options;
  },
  _resolveStrings: function _resolveStrings(options) {
    var select = [];

    function appendChoices(a) {
      if (Array.isArray(a)) {
        for (var idx = 0; idx < a.length; idx++) {
          if (typeof a[idx] === 'string') {
            select.push(new String(a[idx]));
          } else {
            select.push(a[idx]);
          }
        }
      }
    }

    appendChoices(options.Opt);

    if (options.select) {
      appendChoices(options.select);
      delete options.select;
    }

    if (select.length) {
      options.Opt = select;
    }

    Object.keys(VALUE_MAP).forEach(function (key) {
      if (options[key] !== undefined) {
        options[VALUE_MAP[key]] = options[key];
        delete options[key];
      }
    });
    ['V', 'DV'].forEach(function (key) {
      if (typeof options[key] === 'string') {
        options[key] = new String(options[key]);
      }
    });

    if (options.MK && options.MK.CA) {
      options.MK.CA = new String(options.MK.CA);
    }

    if (options.label) {
      options.MK = options.MK ? options.MK : {};
      options.MK.CA = new String(options.label);
      delete options.label;
    }

    return options;
  }
};

var AttachmentsMixin = {
  /**
   * Embed contents of `src` in PDF
   * @param {Buffer | ArrayBuffer | string} src input Buffer, ArrayBuffer, base64 encoded string or path to file
   * @param {object} options
   *  * options.name: filename to be shown in PDF, will use `src` if none set
   *  * options.type: filetype to be shown in PDF
   *  * options.description: description to be shown in PDF
   *  * options.hidden: if true, do not add attachment to EmbeddedFiles dictionary. Useful for file attachment annotations
   *  * options.creationDate: override creation date
   *  * options.modifiedDate: override modified date
   * @returns filespec reference
   */
  file: function file(src) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    options.name = options.name || src;
    var refBody = {
      Type: 'EmbeddedFile',
      Params: {}
    };
    var data;

    if (!src) {
      throw new Error('No src specified');
    }

    if (Buffer.isBuffer(src)) {
      data = src;
    } else if (src instanceof ArrayBuffer) {
      data = Buffer.from(new Uint8Array(src));
    } else {
      var match;

      if (match = /^data:(.*);base64,(.*)$/.exec(src)) {
        if (match[1]) {
          refBody.Subtype = match[1].replace('/', '#2F');
        }

        data = Buffer.from(match[2], 'base64');
      } else {
        data = fs.readFileSync(src);

        if (!data) {
          throw new Error("Could not read contents of file at filepath ".concat(src));
        } // update CreationDate and ModDate


        var _fs$statSync = fs.statSync(src),
            birthtime = _fs$statSync.birthtime,
            ctime = _fs$statSync.ctime;

        refBody.Params.CreationDate = birthtime;
        refBody.Params.ModDate = ctime;
      }
    } // override creation date and modified date


    if (options.creationDate instanceof Date) {
      refBody.Params.CreationDate = options.creationDate;
    }

    if (options.modifiedDate instanceof Date) {
      refBody.Params.ModDate = options.modifiedDate;
    } // add optional subtype


    if (options.type) {
      refBody.Subtype = options.type.replace('/', '#2F');
    } // add checksum and size information


    var checksum = CryptoJS.MD5(CryptoJS.lib.WordArray.create(new Uint8Array(data)));
    refBody.Params.CheckSum = new String(checksum);
    refBody.Params.Size = data.byteLength; // save some space when embedding the same file again
    // if a file with the same name and metadata exists, reuse its reference

    var ref;
    if (!this._fileRegistry) this._fileRegistry = {};
    var file = this._fileRegistry[options.name];

    if (file && isEqual(refBody, file)) {
      ref = file.ref;
    } else {
      ref = this.ref(refBody);
      ref.end(data);
      this._fileRegistry[options.name] = _objectSpread2(_objectSpread2({}, refBody), {}, {
        ref: ref
      });
    } // add filespec for embedded file


    var fileSpecBody = {
      Type: 'Filespec',
      F: new String(options.name),
      EF: {
        F: ref
      },
      UF: new String(options.name)
    };

    if (options.description) {
      fileSpecBody.Desc = new String(options.description);
    }

    var filespec = this.ref(fileSpecBody);
    filespec.end();

    if (!options.hidden) {
      this.addNamedEmbeddedFile(options.name, filespec);
    }

    return filespec;
  }
};
/** check two embedded file metadata objects for equality */

function isEqual(a, b) {
  return a.Subtype === b.Subtype && a.Params.CheckSum.toString() === b.Params.CheckSum.toString() && a.Params.Size === b.Params.Size && a.Params.CreationDate === b.Params.CreationDate && a.Params.ModDate === b.Params.ModDate;
}

var PDFDocument = /*#__PURE__*/function (_stream$Readable) {
  _inherits(PDFDocument, _stream$Readable);

  var _super = _createSuper(PDFDocument);

  function PDFDocument() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, PDFDocument);

    _this = _super.call(this, options);
    _this.options = options; // PDF version

    switch (options.pdfVersion) {
      case '1.4':
        _this.version = 1.4;
        break;

      case '1.5':
        _this.version = 1.5;
        break;

      case '1.6':
        _this.version = 1.6;
        break;

      case '1.7':
      case '1.7ext3':
        _this.version = 1.7;
        break;

      default:
        _this.version = 1.3;
        break;
    } // Whether streams should be compressed


    _this.compress = _this.options.compress != null ? _this.options.compress : true;
    _this._pageBuffer = [];
    _this._pageBufferStart = 0; // The PDF object store

    _this._offsets = [];
    _this._waiting = 0;
    _this._ended = false;
    _this._offset = 0;

    var Pages = _this.ref({
      Type: 'Pages',
      Count: 0,
      Kids: []
    });

    var Names = _this.ref({
      Dests: new PDFNameTree()
    });

    _this._root = _this.ref({
      Type: 'Catalog',
      Pages: Pages,
      Names: Names
    });

    if (_this.options.lang) {
      _this._root.data.Lang = new String(_this.options.lang);
    } // The current page


    _this.page = null; // Initialize mixins

    _this.initColor();

    _this.initVector();

    _this.initFonts(options.font);

    _this.initText();

    _this.initImages();

    _this.initOutline();

    _this.initMarkings(options); // Initialize the metadata


    _this.info = {
      Producer: 'PDFKit',
      Creator: 'PDFKit',
      CreationDate: new Date()
    };

    if (_this.options.info) {
      for (var key in _this.options.info) {
        var val = _this.options.info[key];
        _this.info[key] = val;
      }
    }

    if (_this.options.displayTitle) {
      _this._root.data.ViewerPreferences = _this.ref({
        DisplayDocTitle: true
      });
    } // Generate file ID


    _this._id = PDFSecurity.generateFileID(_this.info); // Initialize security settings

    _this._security = PDFSecurity.create(_assertThisInitialized(_this), options); // Write the header
    // PDF version

    _this._write("%PDF-".concat(_this.version)); // 4 binary chars, as recommended by the spec


    _this._write('%\xFF\xFF\xFF\xFF'); // Add the first page


    if (_this.options.autoFirstPage !== false) {
      _this.addPage();
    }

    return _this;
  }

  _createClass(PDFDocument, [{
    key: "addPage",
    value: function addPage(options) {
      if (options == null) {
        options = this.options;
      } // end the current page if needed


      if (!this.options.bufferPages) {
        this.flushPages();
      } // create a page object


      this.page = new PDFPage(this, options);

      this._pageBuffer.push(this.page); // add the page to the object store


      var pages = this._root.data.Pages.data;
      pages.Kids.push(this.page.dictionary);
      pages.Count++; // reset x and y coordinates

      this.x = this.page.margins.left;
      this.y = this.page.margins.top; // flip PDF coordinate system so that the origin is in
      // the top left rather than the bottom left

      this._ctm = [1, 0, 0, 1, 0, 0];
      this.transform(1, 0, 0, -1, 0, this.page.height);
      this.emit('pageAdded');
      return this;
    }
  }, {
    key: "continueOnNewPage",
    value: function continueOnNewPage(options) {
      var pageMarkings = this.endPageMarkings(this.page);
      this.addPage(options);
      this.initPageMarkings(pageMarkings);
      return this;
    }
  }, {
    key: "bufferedPageRange",
    value: function bufferedPageRange() {
      return {
        start: this._pageBufferStart,
        count: this._pageBuffer.length
      };
    }
  }, {
    key: "switchToPage",
    value: function switchToPage(n) {
      var page;

      if (!(page = this._pageBuffer[n - this._pageBufferStart])) {
        throw new Error("switchToPage(".concat(n, ") out of bounds, current buffer covers pages ").concat(this._pageBufferStart, " to ").concat(this._pageBufferStart + this._pageBuffer.length - 1));
      }

      return this.page = page;
    }
  }, {
    key: "flushPages",
    value: function flushPages() {
      // this local variable exists so we're future-proof against
      // reentrant calls to flushPages.
      var pages = this._pageBuffer;
      this._pageBuffer = [];
      this._pageBufferStart += pages.length;

      var _iterator = _createForOfIteratorHelper(pages),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var page = _step.value;
          this.endPageMarkings(page);
          page.end();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "addNamedDestination",
    value: function addNamedDestination(name) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (args.length === 0) {
        args = ['XYZ', null, null, null];
      }

      if (args[0] === 'XYZ' && args[2] !== null) {
        args[2] = this.page.height - args[2];
      }

      args.unshift(this.page.dictionary);

      this._root.data.Names.data.Dests.add(name, args);
    }
  }, {
    key: "addNamedEmbeddedFile",
    value: function addNamedEmbeddedFile(name, ref) {
      if (!this._root.data.Names.data.EmbeddedFiles) {
        // disabling /Limits for this tree fixes attachments not showing in Adobe Reader
        this._root.data.Names.data.EmbeddedFiles = new PDFNameTree({
          limits: false
        });
      } // add filespec to EmbeddedFiles


      this._root.data.Names.data.EmbeddedFiles.add(name, ref);
    }
  }, {
    key: "addNamedJavaScript",
    value: function addNamedJavaScript(name, js) {
      if (!this._root.data.Names.data.JavaScript) {
        this._root.data.Names.data.JavaScript = new PDFNameTree();
      }

      var data = {
        JS: new String(js),
        S: 'JavaScript'
      };

      this._root.data.Names.data.JavaScript.add(name, data);
    }
  }, {
    key: "ref",
    value: function ref(data) {
      var ref = new PDFReference(this, this._offsets.length + 1, data);

      this._offsets.push(null); // placeholder for this object's offset once it is finalized


      this._waiting++;
      return ref;
    }
  }, {
    key: "_read",
    value: function _read() {} // do nothing, but this method is required by node

  }, {
    key: "_write",
    value: function _write(data) {
      if (!Buffer.isBuffer(data)) {
        data = Buffer.from(data + '\n', 'binary');
      }

      this.push(data);
      return this._offset += data.length;
    }
  }, {
    key: "addContent",
    value: function addContent(data) {
      this.page.write(data);
      return this;
    }
  }, {
    key: "_refEnd",
    value: function _refEnd(ref) {
      this._offsets[ref.id - 1] = ref.offset;

      if (--this._waiting === 0 && this._ended) {
        this._finalize();

        return this._ended = false;
      }
    }
  }, {
    key: "write",
    value: function write(filename, fn) {
      // print a deprecation warning with a stacktrace
      var err = new Error("PDFDocument#write is deprecated, and will be removed in a future version of PDFKit. Please pipe the document into a Node stream.");
      console.warn(err.stack);
      this.pipe(fs.createWriteStream(filename));
      this.end();
      return this.once('end', fn);
    }
  }, {
    key: "end",
    value: function end() {
      this.flushPages();
      this._info = this.ref();

      for (var key in this.info) {
        var val = this.info[key];

        if (typeof val === 'string') {
          val = new String(val);
        }

        var entry = this.ref(val);
        entry.end();
        this._info.data[key] = entry;
      }

      this._info.end();

      for (var name in this._fontFamilies) {
        var font = this._fontFamilies[name];
        font.finalize();
      }

      this.endOutline();
      this.endMarkings();

      this._root.end();

      this._root.data.Pages.end();

      this._root.data.Names.end();

      this.endAcroForm();

      if (this._root.data.ViewerPreferences) {
        this._root.data.ViewerPreferences.end();
      }

      if (this._security) {
        this._security.end();
      }

      if (this._waiting === 0) {
        return this._finalize();
      } else {
        return this._ended = true;
      }
    }
  }, {
    key: "_finalize",
    value: function _finalize() {
      // generate xref
      var xRefOffset = this._offset;

      this._write('xref');

      this._write("0 ".concat(this._offsets.length + 1));

      this._write('0000000000 65535 f ');

      var _iterator2 = _createForOfIteratorHelper(this._offsets),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var offset = _step2.value;
          offset = "0000000000".concat(offset).slice(-10);

          this._write(offset + ' 00000 n ');
        } // trailer

      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var trailer = {
        Size: this._offsets.length + 1,
        Root: this._root,
        Info: this._info,
        ID: [this._id, this._id]
      };

      if (this._security) {
        trailer.Encrypt = this._security.dictionary;
      }

      this._write('trailer');

      this._write(PDFObject.convert(trailer));

      this._write('startxref');

      this._write("".concat(xRefOffset));

      this._write('%%EOF'); // end the stream


      return this.push(null);
    }
  }, {
    key: "toString",
    value: function toString() {
      return '[object PDFDocument]';
    }
  }]);

  return PDFDocument;
}(stream.Readable);

var mixin = function mixin(methods) {
  Object.assign(PDFDocument.prototype, methods);
};

mixin(ColorMixin);
mixin(VectorMixin);
mixin(FontsMixin);
mixin(TextMixin);
mixin(ImagesMixin);
mixin(AnnotationsMixin);
mixin(OutlineMixin);
mixin(MarkingsMixin);
mixin(AcroFormMixin);
mixin(AttachmentsMixin);
PDFDocument.LineWrapper = LineWrapper;

export default PDFDocument;
//# sourceMappingURL=pdfkit.es5.js.map
