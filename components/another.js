var EE = require('events').EventEmitter

var events = require('dom-event-stream')

var Component = require('../lib/component')

var anotherTemplate = require('./templates/another.ract')

module.exports = createAnother

function Another(el, initial) {
  Component.call(this, el, anotherTemplate, initial)

  this.initialize()
}

Another.prototype = Object.create(Component.prototype)

Another.prototype.initialize = function() {
  var ee = new EE
    , b = 0

  this.state.listen(ee, 'data', ['color'])

  events(this.el, 'click').on('data', function() {
    b = b ? 0 : 1

    ee.emit('data', b ? 'red' : 'blue')
  })

  this.emit('ready')
}

function createAnother(el, initial) {
  return new Another(el, initial)
}
