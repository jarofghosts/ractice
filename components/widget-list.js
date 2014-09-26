var EE = require('events').EventEmitter

var Component = require('../lib/component')

var widgetListTemplate = require('./templates/widget-list.ract')

module.exports = createWidgetList

function WidgetList(el, initial) {
  Component.call(this, el, widgetListTemplate, {data: initial})

  initialize(this)
}

WidgetList.prototype = Object.create(Component.prototype)

function initialize(self) {
  var ee = new EE

  self.state.listen(ee, 'data', ['widgets'])

  self.component.on('add', function(ev) {
    ev.original.preventDefault()

    var widgets = (self.state._state.widgets || []).slice()

    widgets.push({name: Date.now()})

    ee.emit('data', widgets)
  })

  self.component.on('remove', function(ev, id) {
    ev.original.preventDefault()

    var widgets = self.state._state.widgets.slice()

    widgets.splice(id, 1)

    ee.emit('data', widgets)
  })

  self.emit('ready')
}

function createWidgetList(el, initial) {
  return new WidgetList(el, initial || {widgets: []})
}
