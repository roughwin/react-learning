const dev = require('./config.dev');
const prod = require('./config.prod');


module.exports = Object.keys(Object.assign({}, dev, prod)).reduce((result, key) => {
  console.log('--->', key);
  Object.defineProperty(result, key, {
    enumerable: true,
    configurable: false,
    get: () => {
      let xxx = true;
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
    },
  });
  return result;
}, {});
