var testComponent = require('./components/test')
  , nother = require('./components/another')

var another = nother(document.getElementById('main'), {color: 'blue'})

testComponent(another.el.querySelector('[rel=component-el]'))
testComponent(document.getElementById('main2'))
