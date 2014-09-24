var Duplex = require('stream').Duplex

var Ractive = require('ractive/ractive.runtime')
  , values = require('dom-value-stream')
  , events = require('dom-event-stream')
  , Estate = require('estate')

var testTemplate = require('./templates/main.ract')

module.exports = createTest

function Test(el, initial) {
  Duplex.call(this, {objectMode: true})

  this.el = el
  var Component = Ractive.extend(testTemplate)

  this.component = new Component({el: el, data: initial || {}})
  this.state = new Estate(initial)

  this.state.on('data', this.push.bind(this))
  this.state.on('data', this.component.set.bind(this.component))

  this.initialize()
}

Test.prototype = Object.create(Duplex.prototype)

Test.prototype.initialize = function() {
  this.state.listen(
      events(this.el.querySelector('[rel=text]'), 'input').pipe(values())
    , 'data'
    , ['text']
  )

  this.emit('ready')
}

Test.prototype._read = function() {
}

Test.prototype._write = function(data, enc, next) {
  this.component.set(data)
  this.state = new Estate(data)

  next()
}

function createTest(el) {
  return new Test(el)
}
