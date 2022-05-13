<h1 align="left">@thomann/classnames</h1>

[![npm version][npm-src]][npm-href]
[![types][types-src]][types-href]
[![size][size-src]][size-href]
[![coverage][coverage-src]][coverage-href]
[![vulnerabilities][vulnerabilities-src]][vulnerabilities-href]
[![dependencies][dep-src]][dep-href]
[![License][license-src]][license-href]

> conditionally construct className strings

## Installation
```bash
$ npm i @thomann/classnames
```

## Usage
```js
import classNames from '@thomann/classnames';

classNames('base', {
    'show': true,
    'hide': false
}); // == 'base show'
```
This library accepts a wide variety of objects and creates a space delimited string for (react) classNames.

Every argument value gets checked for its "truthiness".
If a key value pair is given and value is "truthy", its key is going to be used as a classname.
If only a string given, its automatically used as a classname.

### Supported value types
- `Boolean`
- `Number`
- `String`
- `Array`
- `Object`
- `Function`

## Examples
### Basic
```js
import classNames from '@thomann/classnames';

const color = 'green';
const size = 'big';
const pos = null;

classNames({
    [color]: color,
    ['font-' + size]: size,
    ['position-' + pos]: pos
}); // == 'green font-big'
```

### Complete
```js
import classNames from '@thomann/classnames';

const string = 'uppercase';
const array = ['italic' , 'bold'];
const object = {icon: true};

classNames(
    'modal',
    {
        'warning': false,
        'show': true,
        'small': array.length >= 1
    },
    object,
    array.map((item) => 'text-' + item),
    {
        ['text-' + string]: string,
        ['font-' + string]: null,
    },
    {
        positive: () => {
            return true;
        },
        negative: () => {
            return false;
        },
    }
); // == 'modal show small icon text-italic text-bold text-uppercase positive'
```

## Licence
MIT License, see [LICENSE](./LICENSE)

[npm-src]: https://badgen.net/npm/v/@thomann/classnames
[npm-href]: https://www.npmjs.com/package/@thomann/classnames
[size-src]: https://badgen.net/packagephobia/install/@thomann/classnames
[size-href]: https://packagephobia.com/result?p=@thomann/classnames
[types-src]: https://badgen.net/npm/types/@thomann/classnames
[types-href]: https://www.npmjs.com/package/@thomann/classnames
[coverage-src]: https://coveralls.io/repos/github/thomn/classnames/badge.svg?branch=master
[coverage-href]: https://coveralls.io/github/thomn/classnames?branch=master
[vulnerabilities-src]: https://snyk.io/test/github/thomn/classnames/badge.svg
[vulnerabilities-href]: https://snyk.io/test/github/thomn/classnames
[dep-src]: https://img.shields.io/librariesio/release/npm/@thomann/classnames
[dep-href]: https://img.shields.io/librariesio/release/npm/@thomann/classnames
[license-src]: https://badgen.net/github/license/thomn/classnames
[license-href]: LICENSE
