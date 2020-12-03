"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.factory = void 0;
var table = function (bool, number, string, array, object, fn) {
    var _a;
    return (_a = {},
        _a[Boolean.toString()] = bool,
        _a[Number.toString()] = number,
        _a[String.toString()] = string,
        _a[Array.toString()] = array,
        _a[Object.toString()] = object,
        _a[Function.toString()] = fn,
        _a);
};
var operations = table(function (value) { return value; }, function (value) { return value; }, function (value) { return value; }, function (value) { return classNames.apply(void 0, value); }, function (value) { return Object.keys(value).filter(function (key) { return classNames(value[key]); }); }, function (value) { return classNames(value()); });
var type = function (value) { return (value.constructor.toString()); };
var pipe = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (fns.reduce(function (acc, next) { return next(acc); }, args));
    };
};
var filter = function (values) { return (values.filter(Boolean)); };
var map = function (values) { return values.map(function (value) {
    return (operations[type(value)] || (function () { return value; }))(value);
}); };
var flatten = function (values) { return (values.reduce(function (acc, val) { return Array.isArray(val)
    ? acc.concat(flatten(val))
    : acc.concat(val); }, [])); };
var join = function (values) { return (values.join(' ')); };
var trim = function (values) { return (values.trim()); };
var classNames = pipe(filter, map, flatten, join, trim);
exports.factory = pipe(function (namespace) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (classNames.apply(void 0, __spreadArrays([namespace], args)));
}; });
exports.default = classNames;
