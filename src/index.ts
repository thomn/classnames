const OPERATIONS = new Map();
OPERATIONS.set(Boolean.prototype.constructor, (value) => value);
OPERATIONS.set(Number.prototype.constructor, (value) => value);
OPERATIONS.set(String.prototype.constructor, (value) => value);
OPERATIONS.set(Array.prototype.constructor, (value) => classNames(...value));
OPERATIONS.set(Object.prototype.constructor, (value) => Object.keys(value).filter(key => classNames(value[key])));
OPERATIONS.set(Function.prototype.constructor, (value) => classNames(value()));

/**
 *
 * @param values
 * @internal
 */
const map = (values: any[]): string | string[] => {
    const mapped = [];

    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (!value) {
            continue;
        }

        const type = value.constructor;
        const operation = OPERATIONS.get(type);
        if (!operation) {
            continue;
        }

        mapped.push(operation(value));
    }

    return mapped;
};

/**
 *
 * @param values
 * @internal
 */
const join = (values: any[]): string => {
    const l = values.length;
    let string = '';

    for (let i = 0; i < l; i++) {
        const value = values[i];
        if (Array.isArray(value)) {
            string += join(value);
        } else {
            string += value;
        }

        if (i < l - 1) {
            string += ' ';
        }
    }

    return string;
};

/**
 *
 * @param fns
 * @internal
 */
const pipe = <T>(...fns) => (...args): T => (
    fns.reduce((acc, next) => next(acc), args)
);

/**
 *
 * @param entries
 * @returns {string}
 */
const classNames = pipe<string>(
    map,
    join,
);

/**
 *
 * @param namespace
 */
const factory = pipe<(...args: any[]) => string>(
    (namespace: string) => (...args) => (
        classNames(namespace, ...args)
    ),
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 07.09.2019
 * Time: 21:59
 */
export {
    factory,
    classNames as default,
};
