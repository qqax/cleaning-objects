# cleaning-objects
This package allows you to recursively clean objects from empty keys (NULL values, empty objects, strings and arrays), filter objects using a callback function.
## Install
```
npm install cleaning-objects
```
## Usage
### filterObject
This function allows you to filter object using callback filter function ([key: string, value: any]) => bool.
```javascript
const obj = {
    a: 1,
    b: "2",
    c: true,
    d: false,
    e: [5],
    k: Infinity
}

const callback = ([key, value]) => {
    return key === 'a' || value === Infinity;
}

const result = filterObject(obj, callback);

//the result will be {a: 1, k: Infinity}
```
### removeEmptyObjects
This function removes all empty objects from an object.
```javascript
const obj = {
    a: 1,
    b: {},
    e: {a: 5},
    k: "abc"
}

const result = removeEmptyObjects(obj);

//the result will be {a: 1, e: {a: 5}, k: "abc"}
```
### cleanObject
This function recursively removes empty strings, arrays and objects, as well as `null`, `undefined`, `NaN` and
`Infinity` values from an object.

```javascript
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

const result = cleanObject(obj);

/*
result will be {
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
*/
```
You can also create an array specifying which data types you want to exclude from processing:

```javascript
cleanObject(obj, [`array`, `string`, `null`, `undefined`, `NaN`, `Infinity`, 'emptyObject', 'embeddedObject']);
```