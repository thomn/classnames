# @thomann/classnames
## Usage
This library accepts a wide variety of objects and creates a space delimited string for (react) classNames.

Every argument value gets checked for its "truthiness".
If a key value pair is given and value is "truthy", its key is going to be used as a classname.
If only a string given, its automatically used as a classname.

## Examples
### Basic
```js
compose('base', {
    'show': true,
    'hide': false
}); // == 'base show'
```

```js
const color = 'green';
const size = 'big';
const pos = null;

compose({
    [color]: color,
    ['font-' + size]: size,
    ['position-' + pos]: pos
}); // == 'green font-big'
// color and size variables are "truthy" so their keys are concatenated with their variable value
// pos variable is null and thus "falsy", no key concatenation is happening
```

### Complete

```js
const string = 'uppercase';
const array = ['italic' , 'bold'];
const object = {icon: true};

compose(
    'modal',                                    // strings; no evaluation
    {                                           // objects; property values are evaluated
        'warning': false,
        'show': true,
        'small': array.length >= 1
    },
    object,
    array.map((item) => 'text-' + item),       // arrays; no evaluation
    {
        ['text-' + string]: string,            // dynamic objects; (string != null) == true
        ['text-' + string]: null,              // dynamic objects; (null != null) == false
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
