import * as tape from "tape";
import classNames, {factory} from '../src/index';

tape('test classNames', ({plan, equal}) => {
    const props = {
        size: 'big',
        active: true,
    };

    const expect = 'true 1 foo biz buz bar buz btn-big active positiveComputation';
    const actual = classNames(true, false, 1, 0, 'foo', [
        'biz', 'buz',
    ], {
        bar: true, biz: false, buz: {foo: true, bar: false}, baz: {foo: false, bar: false},
    }, {
        ['btn-' + props.size]: (props.size),
        active: (props.active),
    },
    {
        positiveComputation: () => {
            return true;
        },
        negativeComputation: () => {
            return false;
        },
    });

    plan(1);
    equal(actual, expect);
});