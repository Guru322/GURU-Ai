var concat = require('simple-concat')
var MultiStream = require('../')
var str = require('string-to-stream')
var test = require('tape')
var through = require('through')

test('combine streams', function (t) {
  var streams = [
    str('1'),
    str('2'),
    str('3')
  ]

  var stream = MultiStream(streams)
    .on('error', function (err) {
      t.fail(err)
    })

  concat(stream, function (err, data) {
    t.error(err)
    t.equal(data.toString(), '123')
    t.end()
  })
})

test('combine streams (classic)', function (t) {
  var streams = [
    through(),
    through(),
    through()
  ]

  var stream = MultiStream(streams)
    .on('error', function (err) {
      t.fail(err)
    })

  concat(stream, function (err, data) {
    t.error(err)
    t.equal(data.toString(), '123')
    t.end()
  })

  streams[0].end('1')
  streams[1].end('2')
  streams[2].end('3')
})

test('lazy stream creation', function (t) {
  var streams = [
    str('1'),
    function () {
      return str('2')
    },
    function () {
      return str('3')
    }
  ]

  var stream = MultiStream(streams)
    .on('error', function (err) {
      t.fail(err)
    })

  concat(stream, function (err, data) {
    t.error(err)
    t.equal(data.toString(), '123')
    t.end()
  })
})

test('lazy stream via factory', function (t) {
  var count = 0
  function factory (cb) {
    if (count > 2) return cb(null, null)
    count++
    setTimeout(function () {
      cb(null, str(count.toString()))
    }, 0)
  }

  var stream = MultiStream(factory)
    .on('error', function (err) {
      t.fail(err)
    })

  concat(stream, function (err, data) {
    t.error(err)
    t.equal(data.toString(), '123')
    t.end()
  })
})

test('lazy stream via factory (factory returns error)', function (t) {
  t.plan(2)
  var count = 0
  function factory (cb) {
    if (count > 2) return cb(new Error('factory error'))
    count++
    setTimeout(function () {
      cb(null, str(count.toString()))
    }, 0)
  }

  MultiStream(factory)
    .on('error', function (err) {
      t.pass('got error', err)
    })
    .on('close', function () {
      t.pass('got close')
    })
    .resume()
})

test('lazy stream via factory (classic)', function (t) {
  var count = 0
  function factory (cb) {
    if (count > 2) return cb(null, null)
    count++
    var s = through()
    process.nextTick(function () {
      s.write(count.toString())
      s.end()
    })
    cb(null, s)
  }

  var stream = MultiStream(factory)
    .on('error', function (err) {
      t.fail(err)
    })

  concat(stream, function (err, data) {
    t.error(err)
    t.equal(data.toString(), '123')
    t.end()
  })
})

test('throw immediate error', function (t) {
  t.plan(1)

  var streams = [
    str('1'),
    through() // will emit 'error'
  ]

  MultiStream(streams).on('error', function (err) {
    t.ok(err instanceof Error, 'got expected error')
  })

  streams[1].emit('error', new Error('immediate error!'))
})
