var testComponent = require('./components/test')

var testStream = testComponent(document.getElementById('main'))

testStream.on('data', console.log.bind(console))
