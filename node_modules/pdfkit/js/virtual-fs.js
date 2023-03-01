'use strict';

var VirtualFileSystem = /*#__PURE__*/function () {
  function VirtualFileSystem() {
    this.fileData = {};
  }

  var _proto = VirtualFileSystem.prototype;

  _proto.readFileSync = function readFileSync(fileName, options) {
    if (options === void 0) {
      options = {};
    }

    var encoding = typeof options === 'string' ? options : options.encoding;
    var virtualFileName = normalizeFilename(fileName);
    var data = this.fileData[virtualFileName];

    if (data == null) {
      throw new Error("File '" + virtualFileName + "' not found in virtual file system");
    }

    if (encoding) {
      // return a string
      return typeof data === 'string' ? data : data.toString(encoding);
    }

    return Buffer.from(data, typeof data === 'string' ? 'base64' : undefined);
  };

  _proto.writeFileSync = function writeFileSync(fileName, content) {
    this.fileData[normalizeFilename(fileName)] = content;
  };

  _proto.bindFileData = function bindFileData(data, options) {
    if (data === void 0) {
      data = {};
    }

    if (options === void 0) {
      options = {};
    }

    if (options.reset) {
      this.fileData = data;
    } else {
      Object.assign(this.fileData, data);
    }
  };

  return VirtualFileSystem;
}();

function normalizeFilename(fileName) {
  if (fileName.indexOf(__dirname) === 0) {
    fileName = fileName.substring(__dirname.length);
  }

  if (fileName.indexOf('/') === 0) {
    fileName = fileName.substring(1);
  }

  return fileName;
}

var virtualFs = new VirtualFileSystem();

module.exports = virtualFs;
