import _ from 'lodash'

const obj = { foo: 'foo' }

_.has(obj, 'foo')

// Post data to parent thread
self.postMessage({ type: 'hello' })

// Respond to message from parent thread
self.addEventListener('message', (event) => console.log(event))