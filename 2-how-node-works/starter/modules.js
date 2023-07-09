// console.log(arguments)
// console.log(require('module').wrapper)

// module.exports
const Cal = require("./test-module-1");
const calc1 = new Cal();
console.log(calc1.add(2, 5));

// exports
const cal2 = require("./test-module-2");
console.log(cal2.multyply(2, 5));

const {add,multyply,divide} = require("./test-module-2");
console.log(multyply(285412, 254124521));

// caching 
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();