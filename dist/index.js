"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var operations = table(function (value) { return value; }, function (value) { return value; }, function (value) { return value; }, function (value) { return useClassName.apply(void 0, value); }, function (value) { return Object.keys(value).filter(function (key) { return useClassName(value[key]); }); }, function (value) { return useClassName(value()); });
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
var useClassName = pipe(filter, map, flatten, join, trim);
exports.default = useClassName;
