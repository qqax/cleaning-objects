import { removeEmptyObjects } from '../src';

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
    const result = removeEmptyObjects(obj);
    const testObj = {
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
        }
    }
    expect(result).toStrictEqual(testObj);
});
