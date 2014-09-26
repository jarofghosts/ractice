var testComponent = require('./components/test')
  , list = require('./components/widget-list')
  , nother = require('./components/another')

var another = nother(document.getElementById('main'), {color: 'blue'})

testComponent(another.el.querySelector('[rel=component-el]'))
testComponent(document.getElementById('main2'))
var listStream = list(document.getElementById('list'))

setInterval(function() {
  var random = Math.floor(Math.random() * 10)
    , widgets = []

  for(var i = 0; i < random; ++i) {
    widgets.push({name: Date.now() * Math.random()})
  }

  listStream.write({widgets: widgets})
}, 5000)
