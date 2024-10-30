import { cleanObject } from '../src';

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
    o: {a: {}},
}

test('clear all empty values in the object', () => {
    const result = cleanObject(obj);
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

test('clear all empty values in the object if keep array is empty', () => {
    const result = cleanObject(obj, new Set());
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
        },
    }
    expect(result).toStrictEqual(testObj);
});

test('clear all empty values in the object except array', () => {
    const result = cleanObject(obj, new Set(['array']));
    const testObj = {
        a: 1,
        b: "2",
        c: true,
        d: false,
        e: [5],
        f: [],
        m: {
            a: 1,
            b: "2",
            c: true,
            d: false,
            e: [5],
            f: [],
        },
    }
    expect(result).toStrictEqual(testObj);
});

test('clear all empty values in the object except strings', () => {
    const result = cleanObject(obj, new Set(['string']));
    const testObj = {
        a: 1,
        b: "2",
        c: true,
        d: false,
        e: [5],
        g: "",
        m: {
            a: 1,
            b: "2",
            c: true,
            d: false,
            e: [5],
            g: "",
        }
    }
    expect(result).toStrictEqual(testObj);
});

test('clear all empty values in the object except null', () => {
    const result = cleanObject(obj, new Set(['null']));
    const testObj = {
        a: 1,
        b: "2",
        c: true,
        d: false,
        e: [5],
        h: null,
        m: {
            a: 1,
            b: "2",
            c: true,
            d: false,
            e: [5],
            h: null,
        }
    }
    expect(result).toStrictEqual(testObj);
});

test('clear all empty values in the object except undefined', () => {
    const result = cleanObject(obj, new Set(['undefined']));
    const testObj = {
        a: 1,
        b: "2",
        c: true,
        d: false,
        e: [5],
        i: undefined,
        m: {
            a: 1,
            b: "2",
            c: true,
            d: false,
            e: [5],
            i: undefined,
        }
    }
    expect(result).toStrictEqual(testObj);
});

test('clear all empty values in the object except NaN', () => {
    const result = cleanObject(obj, new Set(['NaN']));
    const testObj = {
        a: 1,
        b: "2",
        c: true,
        d: false,
        e: [5],
        j: NaN,
        m: {
            a: 1,
            b: "2",
            c: true,
            d: false,
            e: [5],
            j: NaN,
        }
    }
    expect(result).toStrictEqual(testObj);
});

test('clear all empty values in the object except Infinity', () => {
    const result = cleanObject(obj, new Set(['Infinity']));
    const testObj = {
        a: 1,
        b: "2",
        c: true,
        d: false,
        e: [5],
        k: Infinity,
        m: {
            a: 1,
            b: "2",
            c: true,
            d: false,
            e: [5],
            k: Infinity,
        }
    }
    expect(result).toStrictEqual(testObj);
});

test('clear all empty values in the object except empty object', () => {
    const result = cleanObject(obj, new Set(['emptyObject']));
    const testObj = {
        a: 1,
        b: "2",
        c: true,
        d: false,
        e: [5],
        l: {},
        m: {
            a: 1,
            b: "2",
            c: true,
            d: false,
            e: [5],
            l: {},
        },
        o: {a: {}},
    }
    expect(result).toStrictEqual(testObj);
});

test('clear all empty values in the object except embedded object', () => {
    const result = cleanObject(obj, new Set(['embeddedObject']));
    const testObj = {
        a: 1,
        b: "2",
        c: true,
        d: false,
        e: [5],
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
        o: {a: {}},
    }
    expect(result).toStrictEqual(testObj);
});
