var Duplex = require('stream').Duplex

var Ractive = require('ractive/ractive.runtime')
  , Estate = require('estate')

module.exports = Component

function Component(el, template, _initial) {
  var self = this
  var initial = _initial || {}

  Duplex.call(self, {objectMode: true})

  var RactiveComponent = Ractive.extend(template)

  self.el = el
  self.state = new Estate(initial)
  self.component = new RactiveComponent({
      el: el
    , data: initial
    , twoway: false
    , modifyArrays: false
    , 
  })

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
