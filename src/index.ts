export const filterObject = (obj: Record<string, any>, callback: (arg: [string, any]) => boolean): Record<string, any> =>
    Object.fromEntries(Object.entries(obj).filter(callback));

export const removeEmptyObjects = (obj: Record<string, any>): Record<string, any> =>
    filterObject(obj, ([_, value]) => !value || !Object.getPrototypeOf(value).isPrototypeOf(Object) || Object.keys(value).length > 0);

export function cleanObject(
    obj: Record<string, any>,
    keep?: (`array` | `string` | `null` | `undefined` | `NaN` | `Infinity` | 'emptyObject' | 'embeddedObject')[],
): Record<string, any> {

    if (!keep || keep.length === 0) {
        return cleanAll(obj);
    }

    const keepSet = new Set<`array` | `string` | `null` | `undefined` | `NaN` | `Infinity` | 'emptyObject' | 'embeddedObject'>(keep)

    const keepArray = keepSet.has("array");
    const keepString = keepSet.has("string");
    const keepNull = keepSet.has("null");
    const keepUndefined = keepSet.has("undefined");
    const keepNaN = keepSet.has("NaN");
    const keepInfinity = keepSet.has("Infinity");
    const keepEmptyObject = keepSet.has("emptyObject");
    const keepEmbeddedObject = keepSet.has("embeddedObject");

    return cleaner(obj, keepArray, keepString, keepNull, keepUndefined, keepNaN, keepInfinity, keepEmptyObject, keepEmbeddedObject)
}

function cleaner(obj: Record<string, any>,
                 keepArray: boolean | undefined,
                 keepString: boolean | undefined,
                 keepNull: boolean | undefined,
                 keepUndefined: boolean | undefined,
                 keepNaN: boolean | undefined,
                 keepInfinity: boolean | undefined,
                 keepEmptyObject: boolean | undefined,
                 keepEmbeddedObject: boolean | undefined
): Record<string, any> {
    return Object.entries(obj)
        .reduce((acc: Record<string, any>, [key, value]) => {
            if (value === null && !keepNull ||
                value === undefined && !keepUndefined ||
                (typeof value === 'number' && !keepNaN && Number.isNaN(value)) ||
                (!keepInfinity && value === Infinity) ||
                (typeof value === 'string' && !(keepString || value.trim())) ||
                (typeof value === 'object' && !!value && Object.keys(value).length === 0 &&
                    Array.isArray(value) && !keepArray)
            ) {
                return acc;
            }

            if (!keepEmbeddedObject && !!value && Object.getPrototypeOf(value).isPrototypeOf(Object)) {
                const newObj = cleaner(value, keepArray, keepString, keepNull, keepUndefined, keepNaN, keepInfinity, keepEmptyObject, keepEmbeddedObject);

                if (keepEmptyObject || Object.keys(newObj).length > 0) {
                    acc[key] = newObj;
                }

                return acc;
            }

            acc[key] = value;

            return acc;
        }, {});
}

function cleanAll(obj: Record<string, any>): Record<string, any> {
    return Object.entries(obj)
        .reduce((acc: Record<string, any>, [key, value]) => {
            if (value == null ||
                (typeof value === 'string' && !value.trim()) ||
                (typeof value === 'number' && !Number.isFinite(value)) ||
                ((typeof value === 'object' && Object.keys(value).length === 0) && Array.isArray(value)
                )
            ) {
                return acc;
            }

            if (Object.getPrototypeOf(value).isPrototypeOf(Object)) {
                const newObj = cleanAll(value);

                if (Object.keys(newObj).length > 0) {
                    acc[key] = newObj;
                }

                return acc;
            }

            acc[key] = value;
            return acc;
        }, {});
}