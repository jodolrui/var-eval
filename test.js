const { typeOf, typeEval, checkArgs } = require('./var-eval.js');

console.log('--- start ---');

test(1, 2);
function test(args, type) {
  checkArgs([{ args }, { type }], ['number', 'array']);
}

console.log('--- end ---');
