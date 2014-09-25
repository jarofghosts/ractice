var EE = require('events').EventEmitter

var events = require('dom-event-stream')

var Component = require('../lib/component')

var anotherTemplate = require('./templates/another.ract')

module.exports = createAnother

function Another(el, initial) {
  Component.call(this, el, anotherTemplate, {data: initial})

  initialize(this)
}

Another.prototype = Object.create(Component.prototype)

function initialize(self) {
  var ee = new EE
    , b = 0

  self.state.listen(ee, 'data', ['color'])

  events(self.el, 'click').on('data', function() {
    b = b ? 0 : 1

    ee.emit('data', b ? 'red' : 'blue')
  })

  self.emit('ready')
}

function createAnother(el, initial) {
  return new Another(el, initial)
}
