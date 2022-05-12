"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.factory = void 0;
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
var operations = new Map([
    [Boolean.prototype.constructor, function (value) { return value; }],
    [Number.prototype.constructor, function (value) { return value; }],
    [String.prototype.constructor, function (value) { return value; }],
    [Array.prototype.constructor, function (value) { return classNames.apply(void 0, value); }],
    [Object.prototype.constructor, function (value) { return Object.keys(value).filter(function (key) { return classNames(value[key]); }); }],
    [Function.prototype.constructor, function (value) { return classNames(value()); }],
]);
var map = function (values) {
    var mapped = [];
    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        if (!value) {
            continue;
        }
        var type = value.constructor;
        var operation = operations.get(type);
        if (!operation) {
            continue;
        }
        mapped.push(operation(value));
    }
    return mapped;
};
var join = function (values) {
    var l = values.length;
    var string = '';
    for (var i = 0; i < l; i++) {
        var value = values[i];
        if (Array.isArray(value)) {
            string += join(value);
        }
        else {
            string += value;
        }
        if (i < l - 1) {
            string += ' ';
        }
    }
    return string;
};
var classNames = pipe(map, join);
exports.factory = pipe(function (namespace) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (classNames.apply(void 0, __spreadArray([namespace], args, false)));
}; });
exports.default = classNames;
