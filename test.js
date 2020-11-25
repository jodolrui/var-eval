const { typeOf, ErrorType, CheckType } = require('./CheckVar.js');

console.log('--- start ---');

// let eval = [
//   { type: 'array', correct: [1], wrong: 1 },
//   { type: 'boolean', correct: true, wrong: 1 },
//   { type: 'error', correct: new Error('Error'), wrong: 1 },
//   { type: 'date', correct: new Date(), wrong: 1 },
//   { type: 'function', correct: () => {}, wrong: 1 },
//   { type: 'number', correct: 1, wrong: '1' },
//   { type: 'null', correct: null, wrong: 1 },
//   { type: 'object', correct: { a: 1 }, wrong: 1 },
//   { type: 'regexp', correct: /[a-z]/, wrong: 1 },
//   { type: 'string', correct: '1', wrong: 1 },
//   { type: 'symbol', correct: Symbol(), wrong: 1 },
//   { type: 'undefined', correct: undefined, wrong: 1 },
// ];

// eval.forEach((element) => {
//   let { type, correct, wrong } = element;

//   new CheckVar({ correct }, { type: type }, (error) => {
//     if (error) console.log(`Correct fails: `, element);
//   }).eval();
//   new CheckVar({ wrong }, { type: type }, (error) => {
//     if (!error) console.log(`Wrong fails: `, element);
//   }).eval();

//   new CheckVar({ correct }, { type: 'foo' }, (error) => {
//     if (error) console.log(`Correct fails: `, element);
//   }).eval({ type: type });
//   new CheckVar({ wrong }, { type: 'foo' }, (error) => {
//     if (!error) console.log(`Wrong fails: `, element);
//   }).eval({ type: type });

//   try {
//     new CheckVar({ correct }, { type: 'foo', throwError: true }, (error) => {
//       if (error) console.log(`Correct fails: `, element);
//     }).eval({ type: type });
//   } catch (error) {
//     if (error) console.log(`Ok error: `, element);
//   }

//   try {
//     new CheckVar({ wrong }, { type: 'foo', throwError: true }, (error) => {
//       if (error) console.log(`Wrong fails: `, element);
//     }).eval({ type: type });
//   } catch (error) {
//     if (error) console.log(`Ok error: `, element);
//   }

//   try {
//     new CheckVar(
//       { correct },
//       { type: 'foo', throwError: true, errorMessage: 'Está mal' },
//       (error) => {
//         if (error) console.log(`Correct fails: `, element);
//       }
//     ).eval({ type: type });
//   } catch (error) {
//     if (error) console.log(`Ok error: `, element);
//   }

//   try {
//     new CheckVar(
//       { wrong },
//       { type: 'foo', throwError: true, errorMessage: 'Está mal' },
//       (error) => {
//         no;
//         if (error) console.log(`Wrong fails: `, element);
//       }
//     ).eval({ type: type });
//   } catch (error) {
//     if (error) console.log(`Ok error: `, element);
//   }
// });

let abc = '1';
// new CheckVar({ abc }).number();

let type = typeOf({ abc });
console.log(type);

let dre = /a/;
let result = typeOf({ dre }, 'number', true, true);

if (result !== undefined) console.log(result);

console.log('--- end ---');
