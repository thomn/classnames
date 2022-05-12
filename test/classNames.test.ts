import classNames, {factory} from '../src/index';
import * as assert from 'assert';

describe('@thomann/classnames', () => {
    describe('base', () => {
        it('should return computed className', () => {
            const props = {
                size: 'big',
                active: true,
            };

            const expected = 'true 1 foo biz buz bar btn-big active foo positiveComputation';
            const actual = classNames(
                true,
                false,
                1,
                undefined,
                NaN,
                null,
                0,
                'foo',
                [
                    'biz', 'buz',
                ],
                {
                    bar: true,
                },
                {
                    ['btn-' + props.size]: (props.size),
                    active: (props.active),
                },
                {
                    foo: 2,
                },
                {
                    positiveComputation: () => {
                        return true;
                    },
                    negativeComputation: () => {
                        return false;
                    },
                },
            );

            assert(actual === expected);
        });

        it('should ignore unknown parameters', () => {
            classNames(2, )

            classNames({"foo": "2"});

            const expected = classNames('foo', Buffer.from('bar'), new class {});
            const actual = 'foo';

            assert(actual === expected);
        });
    });

    describe('factory', () => {
        it('should return computed className', () => {
            const actual = factory('base')('a', {b: true, c: false});
            const expected = 'base a b';

            assert(actual === expected);
        });
    });
});
