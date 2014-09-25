var values = require('dom-value-stream')
  , events = require('dom-event-stream')

var Component = require('../lib/component')

var testTemplate = require('./templates/main.ract')

module.exports = createTest

function Test(el, initial) {
  Component.call(this, el, testTemplate, initial)

  this.initialize()
}

Test.prototype = Object.create(Component.prototype)

Test.prototype.initialize = function() {
  this.state.listen(
      events(this.el.querySelector('[rel=text]'), 'input').pipe(values())
    , 'data'
    , ['text']
  )

  this.emit('ready')
}

function createTest(el) {
  return new Test(el)
}
