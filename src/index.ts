export interface KeyValueTuple extends Array<string | any> {
    0: string;
    1: any
}

export const filterObject = (obj: Record<string, any>, callback: (arg: KeyValueTuple) => boolean): Record<string, any> =>
    Object.fromEntries(Object.entries(obj).filter(callback));

export const removeEmptyObjects = (obj: Record<string, any>): Record<string, any> =>
    filterObject(obj, ([_, value]: KeyValueTuple) => !value || !Object.getPrototypeOf(value).isPrototypeOf(Object) || Object.keys(value).length > 0);

export function cleanObject(
    obj: Record<string, any>,
    keep?:  Set<`array` | `string` | `null` | `undefined` | `NaN` | `Infinity` | 'emptyObject' | 'embeddedObject'>
): Record<string, any> {

    if (!keep || keep.size === 0) {
        return cleanAll(obj);
    }

    const keepArray = keep?.has("array");
    const keepString = keep?.has("string");
    const keepNull = keep?.has("null");
    const keepUndefined = keep?.has("undefined");
    const keepNaN = keep?.has("NaN");
    const keepInfinity = keep?.has("Infinity");
    const keepEmptyObject = keep?.has("emptyObject");
    const keepEmbeddedObject = keep?.has("embeddedObject");

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