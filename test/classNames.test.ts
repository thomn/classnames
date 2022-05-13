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

            const actual = classNames('foo', Buffer.from('bar'), new class {});
            const expected = 'foo';

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

    describe('examples', () => {
        describe('basic', () => {
            it('should match README', () => {
                const color = 'green';
                const size = 'big';
                const pos = null;

                const actual = classNames({
                    [color]: color,
                    ['font-' + size]: size,
                    ['position-' + pos]: pos,
                });

                const expected = 'green font-big';

                assert(actual === expected);
            });
        });

        describe('complete', () => {
            it('should match README', () => {
                const string = 'uppercase';
                const array = ['italic' , 'bold'];
                const object = {icon: true};

                const actual = classNames(
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
                );

                const expected = 'modal show small icon text-italic text-bold text-uppercase positive';

                assert(actual === expected);
            })
        })
    })
});
