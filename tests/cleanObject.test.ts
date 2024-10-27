import { clearObject } from '../src';

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

test('clear all empty values in the object', () => {
    const result = clearObject(obj);
    const testObj = {
        a: 1,
        b: "2",
        c: true,
        d: false,
        e: [5],
        m: {
            a: 1,
            b: "2",
            c: true,
            d: false,
            e: [5],
        }
    }
    expect(result).toStrictEqual(testObj);
});
