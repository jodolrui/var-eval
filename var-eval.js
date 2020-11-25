// Variable validation

const typeOf = (variable, type = undefined, condition = true) => {
  let result;
  if (
    typeof variable === 'object' &&
    variable !== null &&
    variable.constructor === Array
  )
    result = 'array';
  else if (typeof variable === 'boolean') result = 'boolean';
  else if (variable instanceof Error && typeof variable.message !== 'undefined')
    result = 'error';
  else if (variable instanceof Date) result = 'date';
  else if (typeof variable === 'function') result = 'function';
  else if (typeof variable === 'number' && isFinite(variable))
    result = 'number';
  else if (variable === null) result = 'null';
  else if (
    typeof variable === 'object' &&
    variable !== null &&
    variable.constructor === Object
  )
    result = 'object';
  else if (
    typeof variable === 'object' &&
    variable !== null &&
    variable.constructor === RegExp
  )
    result = 'regexp';
  else if (typeof variable === 'string' || variable instanceof String)
    result = 'string';
  else if (typeof variable === 'symbol') result = 'symbol';
  else if (typeof variable === 'undefined') result = 'undefined';
  if (type) {
    if ((result === type) === condition) result = true;
    else result = false;
  }
  return result;
};

const typeEval = (
  varObj,
  type = undefined,
  condition = true,
  callback = true
) => {
  let variable;
  let varName = '';
  if (Object.keys(varObj)[0] === '0') {
    variable = varObj;
  } else {
    varName = Object.keys(varObj)[0];
    variable = varObj[varName];
  }
  let realType = typeOf(variable);
  let result = typeOf(variable, type, condition);
  if (callback && !result) {
    let msg;
    if (typeof varName !== 'undefined' && varName.length > 0)
      varName = `'${varName}' `;
    else varName = '';
    // if (realType === 'regexp') realType = 'regular expression';
    // if (type === 'regexp') type = 'regular expression';
    let articles = [];
    [type, realType].forEach((element) => {
      if (element === 'undefined' || element === 'null') {
        articles.push('');
      } else {
        if (new RegExp('^[aeiou].*', 'i').test(element)) {
          articles.push('an ');
        } else {
          articles.push('a ');
        }
      }
    });
    if (condition)
      msg = `Variable ${varName}expects ${articles[0]}${type}, not ${articles[1]}${realType}`;
    else msg = `Variable ${varName}can't be ${realType}`;
    msg = msg.substring(0, 1).toUpperCase() + msg.substring(1);
    let error = new Error(msg);
    if (typeof callback === 'function') callback(error);
    else throw error;
  } else return result;
};

const checkArgs = (variables, types, callback = undefined) => {
  variables.forEach((element, index) => {
    typeEval(element, types[index], callback);
  });
};

module.exports = { typeOf, typeEval, checkArgs };
