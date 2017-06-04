'use strict';

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dev = require('./config.dev');
var prod = require('./config.prod');

module.exports = (0, _keys2.default)((0, _assign2.default)({}, dev, prod)).reduce(function (result, key) {
  console.log('--->', key);
  (0, _defineProperty2.default)(result, key, {
    enumerable: true,
    configurable: false,
    get: function get() {
      var xxx = true;
      try {
        if (document) {
          // browser
          xxx = /^crm2.*com$/.test(document.domain);
        }
      } catch (err) {
        // node
        xxx = process.env.NODE_ENV !== 'development';
      }
      return xxx ? prod[key] : dev[key];
    }
  });
  return result;
}, {});
