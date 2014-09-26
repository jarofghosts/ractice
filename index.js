var testComponent = require('./components/test')
  , list = require('./components/widget-list')
  , nother = require('./components/another')

var another = nother(document.getElementById('main'), {color: 'blue'})

testComponent(another.el.querySelector('[rel=component-el]'))
testComponent(document.getElementById('main2'))
list(document.getElementById('list'))
