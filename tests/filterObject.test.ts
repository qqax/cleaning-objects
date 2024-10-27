import {filterObject, KeyValueTuple} from '../src';

const obj = {
    a: 1,
    b: "2",
    c: true,
    d: false,
    e: [5],
    f: [],
    g: "",
    h: null,
    i: undefined,
    j: NaN,
    k: Infinity,
    l: {},
    m:  {
        a: 1,
        b: "2",
        c: true,
        d: false,
        e: [5],
        f: [],
        g: "",
        h: null,
        i: undefined,
        j: NaN,
        k: Infinity,
        l: {},
    },
}

test('clear all empty objects in the object', () => {
    const callback = (args:KeyValueTuple) => {
        const [key, value] = args;
        return key === 'a' || value === Infinity;
    }
    const result = filterObject(obj, callback)
    const testObj = {
        a: 1,
        k: Infinity,
    }
    expect(result).toStrictEqual(testObj);
});
