// Clase para validar variables

const typeOf = (
  varObj,
  type = undefined,
  condition = true,
  callback = undefined
) => {
  let variable;
  let varName = '';
  if (Object.keys(varObj)[0] !== '0') {
    varName = Object.keys(varObj)[0];
    variable = varObj[varName];
  } else {
    variable = varObj;
  }
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
  // Si se especificó un tipo devuelve true o false
  // Si no devolverá un string con el nombre del tipo
  let realType = result;
  if (type) {
    if ((result === type) === condition) result = true;
    else result = false;
  }
  if (callback && !result) {
    let error = new Error(errorMessage(varName, realType, type, condition));
    if (typeof callback === 'function') callback(error);
    else throw error;
  } else return result;

  function errorMessage(name, realType, evalType, condition) {
    if (name.length > 0) name = `'${varName}' `;
    else name = '';
    if (realType === 'regexp') realType = 'regular expression';
    if (evalType === 'regexp') evalType = 'regular expression';
    if (condition)
      return `Type of variable ${name}is ${realType} where ${evalType} was expected`;
    else return `Type of variable ${name}can't be ${realType}`;
  }
};

class ErrorType {
  constructor(varObj = {}, config = {}, callback = undefined) {
    this._selfEval(varObj, config, callback);
    this.varObj = varObj;
    this.config = config;
    this.callback = callback;
  }
  _selfEval(varObj, config, callback) {
    // Valida
    if (varObj === null) throw new TypeError(`Argument 'varObj' can't be null`);
    if (typeof varObj === 'undefined')
      throw new TypeError(`Argument 'varObj' can't be undefined`);
    if (typeof varObj !== 'object' && varObj.constructor !== Object)
      throw new TypeError(
        `Argument 'varObj' must contain the variable into brackets: '{ variable }'`
      );
    // if (!Object.keys(varObj)[0])
    //   throw new TypeError(`Argument 'varObj' can't be empty`);
    if (typeof config !== 'object' && config.constructor !== Object)
      throw new TypeError(`Argument 'config' must be an object`);
    if (callback) {
      if (typeof callback !== 'function' && typeof callback !== 'undefined')
        throw new TypeError(`Argument 'callback' must be a function`);
    } else {
      if (this.callback) callback = this.callback;
    }
  }
  //eval = (varObj = {}, config = {}, callback = undefined) => {
  eval = (config = {}, callback = undefined) => {
    // Si 'varObj' está vacía entonces asigna 'this.varObj'
    // if (!Object.keys(varObj)[0]) varObj = this.varObj;
    let varObj = this.varObj;
    // Sobreescribe sin alterar 'this.config'
    config = Object.assign(Object.assign({}, this.config), config);
    if (!callback) callback = this.callback;
    this._selfEval(varObj, config, callback);
    // Desestructura lo que debe/puede contener 'config'
    let { type, not, errorMessage, throwError, destructuring } = config;
    if (!destructuring) destructuring = true;
    let varName;
    if (destructuring) {
      varName = Object.keys(varObj)[0];
    }
    let value;
    if (destructuring) value = varObj[varName];
    else value = varObj;
    let error;
    let article;
    let nameMessage = '';
    let typeMessage = type;
    let isValid = false;
    if (typeOf(value, type)) isValid = true;
    if (!errorMessage)
      if (type === 'undefined' || type === 'null') {
        article = '';
      } else {
        if (new RegExp('^[aeiou].*', 'i').test(typeMessage)) {
          article = 'an ';
        } else {
          article = 'a ';
        }
      }
    if (!errorMessage) {
      if (typeof varName !== 'undefined') nameMessage = `'${varName}' `;
      if (!not)
        errorMessage = `Variable ${nameMessage}must be ${article}${typeMessage}`;
      else
        errorMessage = `Variable ${nameMessage}can't be ${article}${typeMessage}`;
    }
    if ((!isValid && !not) || (isValid && not))
      error = new TypeError(errorMessage);
    if (!callback) throwError = true; // Fuerzo a que lance el error si no hay callback
    if (error && throwError) throw error;
    if (callback) callback(error);
    return this;
  };
  array = (config, callback) => {
    if (!config) config = {};
    config.type = 'array';
    this.eval(config, callback);
    return this;
  };
  boolean = (config, callback) => {
    if (!config) config = {};
    config.type = 'boolean';
    this.eval(config, callback);
    return this;
  };
  error = (config, callback) => {
    if (!config) config = {};
    config.type = 'error';
    this.eval(config, callback);
    return this;
  };
  date = (config, callback) => {
    if (!config) config = {};
    config.type = 'date';
    this.eval(config, callback);
    return this;
  };
  function = (config, callback) => {
    if (!config) config = {};
    config.type = 'function';
    this.eval(config, callback);
    return this;
  };
  number = (config, callback) => {
    if (!config) config = {};
    config.type = 'number';
    this.eval(config, callback);
    return this;
  };
  null = (config, callback) => {
    if (!config) config = {};
    config.type = 'null';
    this.eval(config, callback);
    return this;
  };
  object = (config, callback) => {
    if (!config) config = {};
    config.type = 'object';
    this.eval(config, callback);
    return this;
  };
  regexp = (config, callback) => {
    if (!config) config = {};
    config.type = 'regexp';
    this.eval(config, callback);
    return this;
  };
  string = (config, callback) => {
    if (!config) config = {};
    config.type = 'string';
    this.eval(config, callback);
    return this;
  };
  symbol = (config, callback) => {
    if (!config) config = {};
    config.type = 'symbol';
    this.eval(config, callback);
    return this;
  };
  undefined = (config, callback) => {
    if (!config) config = {};
    config.type = 'undefined';
    this.eval(config, callback);
    return this;
  };
  // Not
  notArray = (config, callback) => {
    if (!config) config = {};
    config.not = true;
    this.array(config, callback);
    return this;
  };
  notBoolean = (config, callback) => {
    if (!config) config = {};
    config.not = true;
    this.boolean(config, callback);
    return this;
  };
  notError = (config, callback) => {
    if (!config) config = {};
    config.not = true;
    this.error(config, callback);
    return this;
  };
  notDate = (config, callback) => {
    if (!config) config = {};
    config.not = true;
    this.date(config, callback);
    return this;
  };
  notFunction = (config, callback) => {
    if (!config) config = {};
    config.not = true;
    this.function(config, callback);
    return this;
  };
  notNumber = (config, callback) => {
    if (!config) config = {};
    config.not = true;
    this.number(config, callback);
    return this;
  };
  notNull = (config, callback) => {
    if (!config) config = {};
    config.not = true;
    this.null(config, callback);
    return this;
  };
  notObject = (config, callback) => {
    if (!config) config = {};
    config.not = true;
    this.object(config, callback);
    return this;
  };
  notRegexp = (config, callback) => {
    if (!config) config = {};
    config.not = true;
    this.regexp(config, callback);
    return this;
  };
  notString = (config, callback) => {
    if (!config) config = {};
    config.not = true;
    this.string(config, callback);
    return this;
  };
  notSymbol = (config, callback) => {
    if (!config) config = {};
    config.not = true;
    this.symbol(config, callback);
    return this;
  };
  notUndefined = (config, callback) => {
    if (!config) config = {};
    config.not = true;
    this.undefined(config, callback);
    return this;
  };
}

class CheckType extends ErrorType {
  constructor(varObj = {}, config = {}, callback = undefined) {
    config.destructuring = false;
    super(varObj, config, callback);
  }
}

const IS = false;
const IS_NOT = true;
module.exports = { typeOf, ErrorType, CheckType };
