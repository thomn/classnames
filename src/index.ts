/**
 *
 * @param bool
 * @param number
 * @param string
 * @param array
 * @param object
 * @param fn
 * @internal
 */
const table = (bool, number, string, array, object, fn) => ({
    [Boolean.toString()]: bool,
    [Number.toString()]: number,
    [String.toString()]: string,
    [Array.toString()]: array,
    [Object.toString()]: object,
    [Function.toString()]: fn
});

/**
 *
 */
const operations = table(
    (value) => value,
    (value) => value,
    (value) => value,
    (value) => classNames(...value),
    (value) => Object.keys(value).filter(key => classNames(value[key])),
    (value) => classNames(value())
);

/**
 *
 * @param value
 * @internal
 */
const type = (value) => (
    value.constructor.toString()
);

/**
 *
 * @param fns
 * @internal
 */
const pipe = (...fns) => (...args) => (
    fns.reduce((acc, next) => next(acc), args)
);

/**
 *
 * @param values
 * @internal
 */
const filter = (values) => (
    values.filter(Boolean)
);

/**
 *
 * @param values
 * @internal
 */
const map = (values) => values.map(value =>
    (operations[type(value)] || (() => value))(value)
);

/**
 *
 * @param values
 * @internal
 */
const flatten = (values) => (
    values.reduce((acc, val) => Array.isArray(val)
        ? acc.concat(flatten(val))
        : acc.concat(val)
        , []
    )
);

/**
 *
 * @param values
 * @internal
 */
const join = (values) => (
    values.join(' ')
);

/**
 *
 * @param values
 * @internal
 */
const trim = (values) => (
    values.trim()
);

/**
 *
 * @param entries
 * @returns {string}
 */
const classNames = pipe(
    filter,
    map,
    flatten,
    join,
    trim
);

/**
 *
 * @param namespace
 */
export const factory = pipe(
    (namespace: string) => (...args) => (
        classNames(namespace, ...args)
    )
)

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 07.09.2019
 * Time: 21:59
 */
export default classNames;
