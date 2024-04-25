'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = exports.constants = void 0

var _fs2 = _interopRequireDefault(require('fs'))

var _util = require('util')

var _path = require('path')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg)
    var value = info.value
  } catch (error) {
    reject(error)
    return
  }
  if (info.done) {
    resolve(value)
  } else {
    Promise.resolve(value).then(_next, _throw)
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args)
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value)
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err)
      }
      _next(undefined)
    })
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError('attempted to get private field on non-instance')
  }
  return fn
}

const fs = {
  read: (0, _util.promisify)(_fs2.default.read),
  write: (0, _util.promisify)(_fs2.default.write),
  open: (0, _util.promisify)(_fs2.default.open),
  close: (0, _util.promisify)(_fs2.default.close),
}
const nullByte = Buffer.alloc(1)
nullByte[0] = 0
const constants = {
  TYPE_LOSSY: 0,
  TYPE_LOSSLESS: 1,
  TYPE_EXTENDED: 2,
}
exports.constants = constants

function VP8Width(data) {
  let n = (data[7] << 8) | data[6]
  return n & 0b0011111111111111
}

function VP8Height(data) {
  let n = (data[9] << 8) | data[8]
  return n & 0b0011111111111111
}

function VP8LWidth(data) {
  let n = (data[2] << 8) | data[1]
  return (n & 0b0011111111111111) + 1
}

function VP8LHeight(data) {
  let n = (data[4] << 16) | (data[3] << 8) | data[2]
  n = n >> 6
  return (n & 0b0011111111111111) + 1
}

function doesVP8LHaveAlpha(data) {
  return !!(data[4] & 0b00010000)
}

function createBasicChunk(name, data) {
  let chunk = Buffer.alloc(8),
    size = data.length,
    out
  chunk.write(name, 0)
  chunk.writeUInt32LE(size, 4)
  out = [chunk, data]

  if (size & 1) {
    out[2] = nullByte
  }

  return out
}

var _convertToExtended = new WeakSet()

var _demuxFrame = new WeakSet()

var _readHeader = new WeakSet()

var _readChunkHeader = new WeakSet()

var _readChunkHeader_buf = new WeakSet()

var _readChunk_raw = new WeakSet()

var _readChunk_VP = new WeakSet()

var _readChunk_VP8_buf = new WeakSet()

var _readChunk_VP8L = new WeakSet()

var _readChunk_VP8L_buf = new WeakSet()

var _readChunk_VP8X = new WeakSet()

var _readChunk_ANIM = new WeakSet()

var _readChunk_ANMF = new WeakSet()

var _readChunk_ALPH = new WeakSet()

var _readChunk_ALPH_buf = new WeakSet()

var _readChunk_ICCP = new WeakSet()

var _readChunk_EXIF = new WeakSet()

var _readChunk_XMP = new WeakSet()

var _readChunk_Skip = new WeakSet()

var _read = new WeakSet()

class Image {
  constructor() {
    _read.add(this)

    _readChunk_Skip.add(this)

    _readChunk_XMP.add(this)

    _readChunk_EXIF.add(this)

    _readChunk_ICCP.add(this)

    _readChunk_ALPH_buf.add(this)

    _readChunk_ALPH.add(this)

    _readChunk_ANMF.add(this)

    _readChunk_ANIM.add(this)

    _readChunk_VP8X.add(this)

    _readChunk_VP8L_buf.add(this)

    _readChunk_VP8L.add(this)

    _readChunk_VP8_buf.add(this)

    _readChunk_VP.add(this)

    _readChunk_raw.add(this)

    _readChunkHeader_buf.add(this)

    _readChunkHeader.add(this)

    _readHeader.add(this)

    _demuxFrame.add(this)

    _convertToExtended.add(this)

    _defineProperty(this, 'data', null)

    _defineProperty(this, 'loaded', false)

    _defineProperty(this, 'path', '')
  }

  clear() {
    this.data = null
    this.path = ''
    this.loaded = false
  }

  get width() {
    if (!this.loaded) {
      return undefined
    }

    let d = this.data
    return d.extended ? d.extended.width : d.vp8l ? d.vp8l.width : d.vp8 ? d.vp8.width : undefined
  }

  get height() {
    if (!this.loaded) {
      return undefined
    }

    let d = this.data
    return d.extended
      ? d.extended.height
      : d.vp8l
        ? d.vp8l.height
        : d.vp8
          ? d.vp8.height
          : undefined
  }

  get type() {
    return this.loaded ? this.data.type : undefined
  }

  get hasAnim() {
    return this.loaded ? (this.data.extended ? this.data.extended.hasAnim : false) : false
  }

  get anim() {
    return this.hasAnim ? this.data.anim : undefined
  }

  get frameCount() {
    return this.anim ? this.anim.frameCount : 0
  }

  get iccp() {
    return this.data.extended
      ? this.data.extended.hasICCP
        ? this.data.iccp.raw
        : undefined
      : undefined
  }

  set iccp(raw) {
    if (!this.data.extended) {
      _classPrivateMethodGet(this, _convertToExtended, _convertToExtended2).call(this)
    }

    if (raw === undefined) {
      this.data.extended.hasICCP = false
      delete this.data.iccp
    } else {
      this.data.iccp = {
        raw,
      }
      this.data.extended.hasICCP = true
    }
  }

  get exif() {
    return this.data.extended
      ? this.data.extended.hasEXIF
        ? this.data.exif.raw
        : undefined
      : undefined
  }

  set exif(raw) {
    if (!this.data.extended) {
      _classPrivateMethodGet(this, _convertToExtended, _convertToExtended2).call(this)
    }

    if (raw === undefined) {
      this.data.extended.hasEXIF = false
      delete this.data.exif
    } else {
      this.data.exif = {
        raw,
      }
      this.data.extended.hasEXIF = true
    }
  }

  get xmp() {
    return this.data.extended
      ? this.data.extended.hasXMP
        ? this.data.xmp.raw
        : undefined
      : undefined
  }

  set xmp(raw) {
    if (!this.data.extended) {
      _classPrivateMethodGet(this, _convertToExtended, _convertToExtended2).call(this)
    }

    if (raw === undefined) {
      this.data.extended.hasXMP = false
      delete this.data.xmp
    } else {
      this.data.xmp = {
        raw,
      }
      this.data.extended.hasXMP = true
    }
  }

  load(path) {
    var _this = this

    return _asyncToGenerator(function* () {
      _this.path = path
      _this.data = yield _classPrivateMethodGet(_this, _read, _read2).call(_this, path)
      _this.loaded = true
    })()
  }

  demuxAnim(path, frame = -1, prefix = '#FNAME#') {
    var _this2 = this

    return _asyncToGenerator(function* () {
      let start = 0,
        end = _this2.frameCount

      if (end == 0) {
        throw new Error("This WebP isn't an animation")
      }

      if (frame != -1) {
        start = end = frame
      }

      for (let i = start; i <= end; i++) {
        yield _classPrivateMethodGet(_this2, _demuxFrame, _demuxFrame2).call(
          _this2,
          `${path}/${prefix}_${i}.webp`.replace(
            /#FNAME#/g,
            (0, _path.basename)(_this2.path, '.webp')
          ),
          _this2.anim.frames[i]
        )
      }
    })()
  }

  replaceFrame(path, frame) {
    var _this3 = this

    return _asyncToGenerator(function* () {
      if (!_this3.hasAnim) {
        throw new Error("WebP isn't animated")
      }

      if (frame < 0 || frame >= _this3.frameCount) {
        throw new Error(`Frame index ${frame} out of bounds (0<=index<${_this3.frameCount})`)
      }

      let r = new Image()
      yield r.load(path)

      switch (r.type) {
        case constants.TYPE_LOSSY:
        case constants.TYPE_LOSSLESS:
          break

        case constants.TYPE_EXTENDED:
          if (r.hasAnim) {
            throw new Error('Merging animations not currently supported')
          }

          break

        default:
          throw new Error('Unknown WebP type')
      }

      switch (_this3.anim.frames[frame].type) {
        case constants.TYPE_LOSSY:
          if (_this3.anim.frames[frame].vp8.alpha) {
            delete _this3.anim.frames[frame].alph
          }

          delete _this3.anim.frames[frame].vp8
          break

        case constants.TYPE_LOSSLESS:
          delete _this3.anim.frames[frame].vp8l
          break

        default:
          throw new Error('Unknown frame type')
      }

      switch (r.type) {
        case constants.TYPE_LOSSY:
          _this3.anim.frames[frame].vp8 = r.data.vp8
          break

        case constants.TYPE_LOSSLESS:
          _this3.anim.frames[frame].vp8l = r.data.vp8l
          break

        case constants.TYPE_EXTENDED:
          if (r.data.vp8) {
            _this3.anim.frames[frame].vp8 = r.data.vp8

            if (r.data.vp8.alpha) {
              _this3.anim.frames[frame].alph = r.data.alph
            }
          } else if (r.data.vp8l) {
            _this3.anim.frames[frame].vp8l = r.data.vp8l
          }

          break
      }

      _this3.anim.frames[frame].width = r.width
      _this3.anim.frames[frame].height = r.height
    })()
  }

  muxAnim({ path, bgColor = [255, 255, 255, 255], loops = 0 } = {}) {
    var _this4 = this

    return _asyncToGenerator(function* () {
      return Image.muxAnim({
        path,
        bgColor,
        loops,
        frames: _this4.frames,
      })
    })()
  }

  static muxAnim({
    path,
    frames,
    width = 0,
    height = 0,
    bgColor = [255, 255, 255, 255],
    loops = 0,
    delay = 100,
    x = 0,
    y = 0,
    blend = true,
    dispose = false,
  } = {}) {
    return _asyncToGenerator(function* () {
      let header = Buffer.alloc(12),
        chunk = Buffer.alloc(18),
        out = [],
        img,
        alpha = false,
        size,
        _w = 0,
        _h = 0

      let _width = width - 1,
        _height = height - 1

      if (frames.length == 0) {
        throw new Error('No frames to mux')
      } else if (_width <= 0 || _width > 1 << 24) {
        throw new Error('Width out of range')
      } else if (_height <= 0 || _height > 1 << 24) {
        throw new Error('Height out of range')
      } else if (_height * _width > Math.pow(2, 32) - 1) {
        throw new Error(`Width*height too large (${_width}, ${_height})`)
      } else if (loops < 0 || loops >= 1 << 24) {
        throw new Error('Loops out of range')
      } else if (delay < 0 || delay >= 1 << 24) {
        throw new Error('Delay out of range')
      } else if (x < 0 || x >= 1 << 24) {
        throw new Error('X out of range')
      } else if (y < 0 || y >= 1 << 24) {
        throw new Error('Y out of range')
      }

      header.write('RIFF', 0)
      header.write('WEBP', 8)
      chunk.write('VP8X', 0)
      chunk.writeUInt32LE(10, 4)
      chunk[8] |= 0b00000010

      if (width != 0) {
        chunk.writeUIntLE(_width, 12, 3)
      }

      if (height != 0) {
        chunk.writeUIntLE(_height, 15, 3)
      }

      out.push(header, chunk)
      chunk = Buffer.alloc(14)
      chunk.write('ANIM', 0)
      chunk.writeUInt32LE(6, 4)
      chunk.writeUInt8(bgColor[2], 8)
      chunk.writeUInt8(bgColor[1], 9)
      chunk.writeUInt8(bgColor[0], 10)
      chunk.writeUInt8(bgColor[3], 11)
      chunk.writeUInt16LE(loops, 12)
      out.push(chunk)

      for (let i = 0, l = frames.length; i < l; i++) {
        let _delay = typeof frames[i].delay === 'undefined' ? delay : frames[i].delay,
          _x = typeof frames[i].x === 'undefined' ? x : frames[i].x,
          _y = typeof frames[i].y === 'undefined' ? y : frames[i].y,
          _blend = typeof frames[i].blend === 'undefined' ? blend : frames[i].blend,
          _dispose = typeof frames[i].dispose === 'undefined' ? dispose : frames[i].dispose,
          size = 16,
          keepChunk = true,
          imgData

        if (delay < 0 || delay >= 1 << 24) {
          throw new Error(`Delay out of range on frame ${i}`)
        } else if (x < 0 || x >= 1 << 24) {
          throw new Error(`X out of range on frame ${i}`)
        } else if (y < 0 || y >= 1 << 24) {
          throw new Error(`Y out of range on frame ${i}`)
        }

        chunk = Buffer.alloc(24)
        chunk.write('ANMF', 0)
        chunk.writeUIntLE(_x, 8, 3)
        chunk.writeUIntLE(_y, 11, 3)
        chunk.writeUIntLE(_delay, 20, 3)

        if (!_blend) {
          chunk[23] |= 0b00000010
        }

        if (_dispose) {
          chunk[23] |= 0b00000001
        }

        if (frames[i].path) {
          img = new Image()
          yield img.load(frames[i].path)
        } else {
          img = {
            data: frames[i],
          }
        }

        chunk.writeUIntLE(img.data.width - 1, 14, 3)
        chunk.writeUIntLE(img.data.height - 1, 17, 3)

        switch (img.data.type) {
          case constants.TYPE_LOSSY:
            {
              let c = img.data.vp8
              _w = c.width > _w ? c.width : _w
              _h = c.height > _h ? c.height : _h
              size += c.raw.length + 8
              imgData = createBasicChunk('VP8 ', c.raw)
            }
            break

          case constants.TYPE_LOSSLESS:
            {
              let c = img.data.vp8l
              _w = c.width > _w ? c.width : _w
              _h = c.height > _h ? c.height : _h
              size += c.raw.length + 8

              if (c.alpha) {
                alpha = true
              }

              imgData = createBasicChunk('VP8L', c.raw)
            }
            break

          case constants.TYPE_EXTENDED:
            if (img.data.extended.hasAnim) {
              let fr = img.data.anim.frames
              keepChunk = false

              if (img.data.extended.hasAlpha) {
                alpha = true
              }

              for (let i = 0, l = fr.length; i < l; i++) {
                _w = fr[i].width + _x > _w ? fr[i].width + _x : _w
                _h = fr[i].height + _y > _h ? fr[i].height + _y : _h
                let b = Buffer.alloc(8)
                b.write('ANMF', 0)
                b.writeUInt32LE(fr[i].raw.length, 4)
                out.push(b, fr[i].raw)

                if (fr[i].raw.length & 1) {
                  out.push(nullByte)
                }

                b = fr[i].raw
                b.writeUIntLE(_x, 0, 3)
                b.writeUIntLE(_y, 3, 3)
                b.writeUIntLE(_delay, 12, 3)

                if (!_blend) {
                  b[15] |= 0b00000010
                } else {
                  b[15] &= 0b11111101
                }

                if (_dispose) {
                  b[15] |= 0b00000001
                } else {
                  b[15] &= 0b11111110
                }
              }
            } else {
              _w = img.data.extended.width > _w ? img.data.extended.width : _w
              _h = img.data.extended.height > _h ? img.data.extended.height : _h

              if (img.data.vp8) {
                imgData = []

                if (img.data.alph) {
                  alpha = true
                  imgData.push(...createBasicChunk('ALPH', img.data.alph.raw))
                  size += img.data.alph.raw.length + 8
                }

                imgData.push(...createBasicChunk('VP8 ', img.data.vp8.raw))
                size += img.data.vp8.raw.length + 8
              } else if (img.data.vp8l) {
                imgData = createBasicChunk('VP8L', img.data.vp8l.raw)

                if (img.data.vp8l.alpha) {
                  alpha = true
                }

                size += img.data.vp8l.raw.length + 8
              }
            }

            break

          default:
            throw new Error('Unknown image type')
        }

        if (keepChunk) {
          chunk.writeUInt32LE(size, 4)
          out.push(chunk, ...imgData)
        }
      }

      if (width == 0) {
        out[1].writeUIntLE(_w - 1, 12, 3)
      }

      if (height == 0) {
        out[1].writeUIntLE(_h - 1, 15, 3)
      }

      size = 4

      for (let i = 1, l = out.length; i < l; i++) {
        size += out[i].length
      }

      header.writeUInt32LE(size, 4)

      if (alpha) {
        out[1][8] |= 0b00010000
      }

      let fp = yield fs.open(path, 'w')

      for (let i = 0, l = out.length; i < l; i++) {
        yield fs.write(fp, out[i], 0, undefined, undefined)
      }

      yield fs.close(fp)
    })()
  }
}

var _convertToExtended2 = function _convertToExtended2() {
  if (!this.loaded) {
    throw new Error('No image loaded')
  }

  this.data.type = constants.TYPE_EXTENDED
  this.data.extended = {
    hasICC: false,
    hasAlpha: false,
    hasEXIF: false,
    hasXMP: false,
    width: this.vp8 ? this.vp8.width : this.vp8l ? this.vp8l.width : 1,
    height: this.vp8 ? this.vp8.height : this.vp8l ? this.vp8l.height : 1,
  }
}

var _demuxFrame2 = /*#__PURE__*/ (function () {
  var _demuxFrame3 = _asyncToGenerator(function* (path, frame) {
    let header = Buffer.alloc(12),
      size,
      chunk,
      out = []
    header.write('RIFF', 0)
    header.write('WEBP', 8)
    out.push(header)

    if (
      this.data.extended.hasICC ||
      this.data.extended.hasEXIF ||
      this.data.extended.hasXMP ||
      (frame.vp8 && frame.vp8.alpha)
    ) {
      chunk = Buffer.alloc(18)
      chunk.write('VP8X', 0)
      chunk.writeUInt32LE(10, 4)

      if (this.data.extended.hasICC) {
        chunk[8] |= 0b00100000
      }

      if ((frame.vp8l && frame.vp8l.alpha) || (frame.vp8 && frame.vp8.alpha)) {
        chunk[8] |= 0b00010000
      }

      if (this.data.extended.hasEXIF) {
        chunk[8] |= 0b00001000
      }

      if (this.data.extended.hasXMP) {
        chunk[8] |= 0b00000100
      }

      chunk.writeUIntLE(frame.width - 1, 12, 3)
      chunk.writeUIntLE(frame.height - 1, 15, 3)
      out.push(chunk)

      if (this.data.extended.hasICC) {
        out.push(...createBasicChunk('ICCP', this.data.extended.icc.raw))
      }
    }

    if (frame.vp8l) {
      out.push(...createBasicChunk('VP8L', frame.vp8l.raw))
    } else if (frame.vp8) {
      if (frame.vp8.alpha) {
        out.push(...createBasicChunk('ALPH', frame.alph.raw))
      }

      out.push(...createBasicChunk('VP8 ', frame.vp8.raw))
    } else {
      throw new Error('Frame has no VP8/VP8L?')
    }

    if (this.type == constants.TYPE_EXTENDED) {
      if (this.data.extended.hasEXIF) {
        out.push(...createBasicChunk('EXIF', this.data.extended.exif.raw))
      }

      if (this.data.extended.hasXMP) {
        out.push(...createBasicChunk('XMP ', this.data.extended.xmp.raw))
      }
    }

    size = 4

    for (let i = 1, l = out.length; i < l; i++) {
      size += out[i].length
    }

    header.writeUInt32LE(size, 4)
    let fp = yield fs.open(path, 'w')

    for (let i = 0, l = out.length; i < l; i++) {
      yield fs.write(fp, out[i], 0, undefined, undefined)
    }

    yield fs.close(fp)
  })

  function _demuxFrame2(_x2, _x3) {
    return _demuxFrame3.apply(this, arguments)
  }

  return _demuxFrame2
})()

var _readHeader2 = /*#__PURE__*/ (function () {
  var _readHeader3 = _asyncToGenerator(function* (fd) {
    let buf = Buffer.alloc(12)
    let { bytesRead } = yield fs.read(fd, buf, 0, 12, undefined)

    if (bytesRead != 12) {
      throw new Error('Reached end of file while reading header')
    }

    if (buf.toString('utf8', 0, 4) != 'RIFF') {
      throw new Error('Bad header (not RIFF)')
    }

    if (buf.toString('utf8', 8, 12) != 'WEBP') {
      throw new Error('Bad header (not WEBP)')
    }

    return {
      fileSize: buf.readUInt32LE(4),
    }
  })

  function _readHeader2(_x4) {
    return _readHeader3.apply(this, arguments)
  }

  return _readHeader2
})()

var _readChunkHeader2 = /*#__PURE__*/ (function () {
  var _readChunkHeader3 = _asyncToGenerator(function* (fd) {
    let buf = Buffer.alloc(8)
    let { bytesRead } = yield fs.read(fd, buf, 0, 8, undefined)

    if (bytesRead == 0) {
      return {
        fourCC: '\x00\x00\x00\x00',
        size: 0,
      }
    } else if (bytesRead < 8) {
      throw new Error('Reached end of file while reading chunk header')
    }

    return {
      fourCC: buf.toString('utf8', 0, 4),
      size: buf.readUInt32LE(4),
    }
  })

  function _readChunkHeader2(_x5) {
    return _readChunkHeader3.apply(this, arguments)
  }

  return _readChunkHeader2
})()

var _readChunkHeader_buf2 = function _readChunkHeader_buf2(buf, cursor) {
  if (cursor >= buf.length) {
    return {
      fourCC: '\x00\x00\x00\x00',
      size: 0,
    }
  }

  return {
    fourCC: buf.toString('utf8', cursor, cursor + 4),
    size: buf.readUInt32LE(cursor + 4),
  }
}

var _readChunk_raw2 = /*#__PURE__*/ (function () {
  var _readChunk_raw3 = _asyncToGenerator(function* (n, fd, size) {
    let buf = Buffer.alloc(size),
      discard = Buffer.alloc(1)
    let { bytesRead } = yield fs.read(fd, buf, 0, size, undefined)

    if (bytesRead != size) {
      throw new Error(`Reached end of file while reading ${n} chunk`)
    }

    if (size & 1) {
      yield fs.read(fd, discard, 0, 1, undefined)
    }

    return {
      raw: buf,
    }
  })

  function _readChunk_raw2(_x6, _x7, _x8) {
    return _readChunk_raw3.apply(this, arguments)
  }

  return _readChunk_raw2
})()

var _readChunk_VP2 = /*#__PURE__*/ (function () {
  var _readChunk_VP3 = _asyncToGenerator(function* (fd, size) {
    let buf = Buffer.alloc(size),
      discard = Buffer.alloc(1)
    let { bytesRead } = yield fs.read(fd, buf, 0, size, undefined)

    if (bytesRead != size) {
      throw new Error('Reached end of file while reading VP8 chunk')
    }

    if (size & 1) {
      yield fs.read(fd, discard, 0, 1, undefined)
    }

    return {
      raw: buf,
      width: VP8Width(buf, 8),
      height: VP8Height(buf, 8),
    }
  })

  function _readChunk_VP2(_x9, _x10) {
    return _readChunk_VP3.apply(this, arguments)
  }

  return _readChunk_VP2
})()

var _readChunk_VP8_buf2 = function _readChunk_VP8_buf2(buf, size, cursor) {
  if (cursor >= buf.length) {
    throw new Error('Reached end of buffer while reading VP8 chunk')
  }

  let raw = buf.slice(cursor, cursor + size)
  return {
    raw,
    width: VP8Width(raw),
    height: VP8Height(raw),
  }
}

var _readChunk_VP8L2 = /*#__PURE__*/ (function () {
  var _readChunk_VP8L3 = _asyncToGenerator(function* (fd, size) {
    let buf = Buffer.alloc(size),
      discard = Buffer.alloc(1)
    let { bytesRead } = yield fs.read(fd, buf, 0, size, undefined)

    if (bytesRead != size) {
      throw new Error('Reached end of file while reading VP8L chunk')
    }

    if (size & 1) {
      yield fs.read(fd, discard, 0, 1, undefined)
    }

    return {
      raw: buf,
      alpha: doesVP8LHaveAlpha(buf, 0),
      width: VP8LWidth(buf),
      height: VP8LHeight(buf),
    }
  })

  function _readChunk_VP8L2(_x11, _x12) {
    return _readChunk_VP8L3.apply(this, arguments)
  }

  return _readChunk_VP8L2
})()

var _readChunk_VP8L_buf2 = function _readChunk_VP8L_buf2(buf, size, cursor) {
  if (cursor >= buf.length) {
    throw new Error('Reached end of buffer while reading VP8L chunk')
  }

  let raw = buf.slice(cursor, cursor + size)
  return {
    raw,
    alpha: doesVP8LHaveAlpha(raw),
    width: VP8LWidth(raw),
    height: VP8LHeight(raw),
  }
}

var _readChunk_VP8X2 = /*#__PURE__*/ (function () {
  var _readChunk_VP8X3 = _asyncToGenerator(function* (fd, size) {
    let buf = Buffer.alloc(size)
    let { bytesRead } = yield fs.read(fd, buf, 0, size, undefined)

    if (bytesRead != size) {
      throw new Error('Reached end of file while reading VP8X chunk')
    }

    return {
      raw: buf,
      hasICC: !!(buf[0] & 0b00100000),
      hasAlpha: !!(buf[0] & 0b00010000),
      hasEXIF: !!(buf[0] & 0b00001000),
      hasXMP: !!(buf[0] & 0b00000100),
      hasAnim: !!(buf[0] & 0b00000010),
      width: buf.readUIntLE(4, 3) + 1,
      height: buf.readUIntLE(7, 3) + 1,
    }
  })

  function _readChunk_VP8X2(_x13, _x14) {
    return _readChunk_VP8X3.apply(this, arguments)
  }

  return _readChunk_VP8X2
})()

var _readChunk_ANIM2 = /*#__PURE__*/ (function () {
  var _readChunk_ANIM3 = _asyncToGenerator(function* (fd, size) {
    let buf = Buffer.alloc(size)
    let { bytesRead } = yield fs.read(fd, buf, 0, size, undefined)

    if (bytesRead != size) {
      throw new Error('Reached end of file while reading ANIM chunk')
    }

    return {
      raw: buf,
      bgColor: buf.slice(0, 4),
      loopCount: buf.readUInt16LE(4),
    }
  })

  function _readChunk_ANIM2(_x15, _x16) {
    return _readChunk_ANIM3.apply(this, arguments)
  }

  return _readChunk_ANIM2
})()

var _readChunk_ANMF2 = /*#__PURE__*/ (function () {
  var _readChunk_ANMF3 = _asyncToGenerator(function* (fd, size) {
    let buf = Buffer.alloc(size),
      discard = Buffer.alloc(1)
    let { bytesRead } = yield fs.read(fd, buf, 0, size, undefined)

    if (bytesRead != size) {
      throw new Error('Reached end of file while reading ANMF chunk')
    }

    if (size & 1) {
      yield fs.read(fd, discard, 0, 1, undefined)
    }

    let out = {
      raw: buf,
      x: buf.readUIntLE(0, 3),
      y: buf.readUIntLE(3, 3),
      width: buf.readUIntLE(6, 3) + 1,
      height: buf.readUIntLE(9, 3) + 1,
      duration: buf.readUIntLE(12, 3),
      blend: !(buf[15] & 0b00000010),
      dispose: !!(buf[15] & 0b00000001),
    }
    let keepLooping = true,
      cursor = 16

    while (keepLooping) {
      let header = _classPrivateMethodGet(this, _readChunkHeader_buf, _readChunkHeader_buf2).call(
          this,
          buf,
          cursor
        ),
        t

      cursor += 8

      switch (header.fourCC) {
        case 'VP8 ':
          if (!out.vp8) {
            out.type = constants.TYPE_LOSSY
            out.vp8 = _classPrivateMethodGet(this, _readChunk_VP8_buf, _readChunk_VP8_buf2).call(
              this,
              buf,
              header.size,
              cursor
            )
          }

          break

        case 'VP8L':
          if (!out.vp8l) {
            out.type = constants.TYPE_LOSSLESS
            out.vp8l = _classPrivateMethodGet(this, _readChunk_VP8L_buf, _readChunk_VP8L_buf2).call(
              this,
              buf,
              header.size,
              cursor
            )
          }

          break

        case 'ALPH':
          if (out.vp8) {
            out.alph = _classPrivateMethodGet(this, _readChunk_ALPH_buf, _readChunk_ALPH_buf2).call(
              this,
              buf,
              header.size,
              cursor
            )
            out.vp8.alpha = true
          }

          break

        case '\x00\x00\x00\x00':
        default:
          keepLooping = false
          break
      }

      cursor += header.size + 1

      if (header.size & 1) {
        cursor++
      }

      if (cursor >= buf.length) {
        keepLooping = false
      }
    }

    return out
  })

  function _readChunk_ANMF2(_x17, _x18) {
    return _readChunk_ANMF3.apply(this, arguments)
  }

  return _readChunk_ANMF2
})()

var _readChunk_ALPH2 = /*#__PURE__*/ (function () {
  var _readChunk_ALPH3 = _asyncToGenerator(function* (fd, size) {
    return _classPrivateMethodGet(this, _readChunk_raw, _readChunk_raw2).call(
      this,
      'ALPH',
      fd,
      size
    )
  })

  function _readChunk_ALPH2(_x19, _x20) {
    return _readChunk_ALPH3.apply(this, arguments)
  }

  return _readChunk_ALPH2
})()

var _readChunk_ALPH_buf2 = function _readChunk_ALPH_buf2(buf, size, cursor) {
  if (cusor >= buf.length) {
    throw new Error('Reached end of buffer while reading ALPH chunk')
  }

  return {
    raw: buf.slice(cursor, cursor + size),
  }
}

var _readChunk_ICCP2 = /*#__PURE__*/ (function () {
  var _readChunk_ICCP3 = _asyncToGenerator(function* (fd, size) {
    return _classPrivateMethodGet(this, _readChunk_raw, _readChunk_raw2).call(
      this,
      'ICCP',
      fd,
      size
    )
  })

  function _readChunk_ICCP2(_x21, _x22) {
    return _readChunk_ICCP3.apply(this, arguments)
  }

  return _readChunk_ICCP2
})()

var _readChunk_EXIF2 = /*#__PURE__*/ (function () {
  var _readChunk_EXIF3 = _asyncToGenerator(function* (fd, size) {
    return _classPrivateMethodGet(this, _readChunk_raw, _readChunk_raw2).call(
      this,
      'EXIF',
      fd,
      size
    )
  })

  function _readChunk_EXIF2(_x23, _x24) {
    return _readChunk_EXIF3.apply(this, arguments)
  }

  return _readChunk_EXIF2
})()

var _readChunk_XMP2 = /*#__PURE__*/ (function () {
  var _readChunk_XMP3 = _asyncToGenerator(function* (fd, size) {
    return _classPrivateMethodGet(this, _readChunk_raw, _readChunk_raw2).call(this, 'XML', fd, size)
  })

  function _readChunk_XMP2(_x25, _x26) {
    return _readChunk_XMP3.apply(this, arguments)
  }

  return _readChunk_XMP2
})()

var _readChunk_Skip2 = /*#__PURE__*/ (function () {
  var _readChunk_Skip3 = _asyncToGenerator(function* (fd, size) {
    let buf = Buffer.alloc(size),
      discard = Buffer.alloc(1)
    let { bytesRead } = yield fs.read(fd, buf, 0, size, undefined)

    if (bytesRead != size) {
      throw new Error('Reached end of file while skipping chunk')
    }

    if (size & 1) {
      yield fs.read(fd, discard, 0, 1, undefined)
    }
  })

  function _readChunk_Skip2(_x27, _x28) {
    return _readChunk_Skip3.apply(this, arguments)
  }

  return _readChunk_Skip2
})()

var _read2 = /*#__PURE__*/ (function () {
  var _read3 = _asyncToGenerator(function* (path) {
    let fd = yield fs.open(path, 'r'),
      out = {},
      keepLooping = true,
      first = true
    let { fileSize } = yield _classPrivateMethodGet(this, _readHeader, _readHeader2).call(this, fd)

    while (keepLooping) {
      let { fourCC, size } = yield _classPrivateMethodGet(
        this,
        _readChunkHeader,
        _readChunkHeader2
      ).call(this, fd)

      switch (fourCC) {
        case 'VP8 ':
          if (!out.vp8) {
            out.vp8 = yield _classPrivateMethodGet(this, _readChunk_VP, _readChunk_VP2).call(
              this,
              fd,
              size
            )
          } else {
            yield _classPrivateMethodGet(this, _readChunk_Skip, _readChunk_Skip2).call(
              this,
              fd,
              size
            )
          }

          if (first) {
            out.type = constants.TYPE_LOSSY
            keepLooping = false
          }

          break

        case 'VP8L':
          if (!out.vp8l) {
            out.vp8l = yield _classPrivateMethodGet(this, _readChunk_VP8L, _readChunk_VP8L2).call(
              this,
              fd,
              size
            )
          } else {
            yield _classPrivateMethodGet(this, _readChunk_Skip, _readChunk_Skip2).call(
              this,
              fd,
              size
            )
          }

          if (first) {
            out.type = constants.TYPE_LOSSLESS
            keepLooping = false
          }

          break

        case 'VP8X':
          if (!out.extended) {
            out.type = constants.TYPE_EXTENDED
            out.extended = yield _classPrivateMethodGet(
              this,
              _readChunk_VP8X,
              _readChunk_VP8X2
            ).call(this, fd, size)
          } else {
            yield _classPrivateMethodGet(this, _readChunk_Skip, _readChunk_Skip2).call(
              this,
              fd,
              size
            )
          }

          break

        case 'ANIM':
          if (!out.anim) {
            let { raw, bgColor, loopCount } = yield _classPrivateMethodGet(
              this,
              _readChunk_ANIM,
              _readChunk_ANIM2
            ).call(this, fd, size)
            out.anim = {
              backgroundColor: [bgColor[2], bgColor[1], bgColor[0], bgColor[3]],
              loopCount,
              frames: [],
            }
            out.anim.raw = raw
          } else {
            yield _classPrivateMethodGet(this, _readChunk_Skip, _readChunk_Skip2).call(
              this,
              fd,
              size
            )
          }

          break

        case 'ANMF':
          {
            let f = yield _classPrivateMethodGet(this, _readChunk_ANMF, _readChunk_ANMF2).call(
              this,
              fd,
              size
            )
            out.anim.frames.push(f)
          }
          break

        case 'ALPH':
          if (!out.alph) {
            out.alph = yield _classPrivateMethodGet(this, _readChunk_ALPH, _readChunk_ALPH2).call(
              this,
              fd,
              size
            )
          } else {
            yield _classPrivateMethodGet(this, _readChunk_Skip, _readChunk_Skip2).call(
              this,
              fd,
              size
            )
          }

          break

        case 'ICCP':
          if (!out.iccp) {
            out.iccp = yield _classPrivateMethodGet(this, _readChunk_ICCP, _readChunk_ICCP2).call(
              this,
              fd,
              size
            )
          } else {
            yield _classPrivateMethodGet(this, _readChunk_Skip, _readChunk_Skip2).call(
              this,
              fd,
              size
            )
          }

          break

        case 'EXIF':
          if (!out.exif) {
            out.exif = yield _classPrivateMethodGet(this, _readChunk_EXIF, _readChunk_EXIF2).call(
              this,
              fd,
              size
            )
          } else {
            yield _classPrivateMethodGet(this, _readChunk_Skip, _readChunk_Skip2).call(
              this,
              fd,
              size
            )
          }

          break

        case 'XMP ':
          if (!out.xmp) {
            out.xmp = yield _classPrivateMethodGet(this, _readChunk_XMP, _readChunk_XMP2).call(
              this,
              fd,
              size
            )
          } else {
            yield _classPrivateMethodGet(this, _readChunk_Skip, _readChunk_Skip2).call(
              this,
              fd,
              size
            )
          }

          break

        case '\x00\x00\x00\x00':
          keepLooping = false
          break

        default:
          yield _classPrivateMethodGet(this, _readChunk_Skip, _readChunk_Skip2).call(this, fd, size)
          break
      }

      first = false
    }

    if (out.type == constants.TYPE_EXTENDED && out.extended.hasAnim) {
      out.anim.frameCount = out.anim.frames.length
    }

    return out
  })

  function _read2(_x29) {
    return _read3.apply(this, arguments)
  }

  return _read2
})()

var _default = {
  TYPE_LOSSY: constants.TYPE_LOSSY,
  TYPE_LOSSLESS: constants.TYPE_LOSSLESS,
  TYPE_EXTENDED: constants.TYPE_EXTENDED,
  Image,
}
exports.default = _default
