var Duplex = require('stream').Duplex

var Ractive = require('ractive/ractive.runtime')
  , Estate = require('estate')
  , extend = require('xtend')

Ractive.defaults.data = require('./filters')

module.exports = Component

function Component(el, template, _options) {
  var self = this
  var options = _options || {}

  Duplex.call(self, {objectMode: true})

  var RactiveComponent = Ractive.extend(template)

  self.el = el
  self.state = new Estate(options.data)
  self.component = new RactiveComponent(extend({
      el: el
    , twoway: false
    , modifyArrays: false
  }, options))

  self.state.on('data', function(data) {
    self.push(data)
    self.component.set(data)
  })
}

Component.prototype = Object.create(Duplex.prototype)

Component.prototype._read = function() {
}

Component.prototype._write = function writeComponent(data, enc, next) {
  this.component.set(data)
  this.state = new Estate(data)

  next()
}
