var values = require('dom-value-stream')
  , events = require('dom-event-stream')

var Component = require('../lib/component')

var testTemplate = require('./templates/main.ract')

module.exports = createTest

function Test(el) {
  Component.call(this, el, testTemplate)

  initialize(this)
}

Test.prototype = Object.create(Component.prototype)

function initialize(self) {
  self.state.listen(
      events(self.el.querySelector('[rel=text]'), 'input').pipe(values())
    , 'data'
    , ['text']
  )

  self.emit('ready')
}

function createTest(el) {
  return new Test(el)
}
