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

test('clear all empty values in the object except array', () => {
    const result = cleanObject(obj, ['array']);
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
        }
    }
    expect(result).toStrictEqual(testObj);
});

test('clear all empty values in the object except strings', () => {
    const result = cleanObject(obj, ['string']);
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
    const result = cleanObject(obj, ['null']);
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
    const result = cleanObject(obj, ['undefined']);
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
    const result = cleanObject(obj, ['NaN']);
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
    const result = cleanObject(obj, ['Infinity']);
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
    const result = cleanObject(obj, ['emptyObject']);
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
        }
    }
    expect(result).toStrictEqual(testObj);
});

test('clear all empty values in the object except embedded object', () => {
    const result = cleanObject(obj, ['embeddedObject']);
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
    }
    expect(result).toStrictEqual(testObj);
});
