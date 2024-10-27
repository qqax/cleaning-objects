# cleaning-objects
This package allows you to recursively clean objects from empty keys (NULL values, empty objects, strings and arrays), filter objects using a callback function.
## Install
```
npm install cleaning-objects
```
## Usage
### filterObject
First year of copyright is required.
```javascript
filterObject(obj, callback);
```
In this example, if the current year is 2020 or earlier than the first year, the output will be:
```
©2020.
```
### removeEmptyObjects
```javascript
removeEmptyObjects(obj);
```
In this example, if the current year is 2020 or earlier than the first year, the output will be:
```
©2020.
```
### clearObject & cleanObject

```javascript
clearObject(obj);
cleanObject(obj);
```
In this example, if the current year is 2020 or earlier than the first year, the output will be:

```javascript
cleanObject(obj, [`array`, `string`, `null`, `undefined`, `NaN`, `Infinity`, 'emptyObject', 'embeddedObject']);
```
In this example, if the current year is 2020 or earlier than the first year, the output will be:
```
©2020.
```