/**
 * 增强型mock
 */
function _proxy() {
  // console.log('mocking less--->')
  return new Proxy({}, {
    get: (target, name) => {
      // console.log('getting: --->', name)
      return _proxy()
    }
  })
}
module.exports = _proxy()