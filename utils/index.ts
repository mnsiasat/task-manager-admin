import _ from 'lodash'

type EnumType = { [key: string]: string | number }

function stringToEnum<T extends EnumType>(enumType: T, value: string): T[keyof T] {
  if (Object.values(enumType).includes(value)) {
    return value as T[keyof T]
  }
  throw new Error(`Invalid value: ${value} for enum ${Object.keys(enumType).join(', ')}`)
}

function removeEmptyProperties<T extends object>(obj: T): T {
  // Iterate over each property in the object
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const value = obj[key]
      // Check if the value is empty (null, undefined, empty string, or empty array)
      if (
        value === null ||
        value === undefined ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0)
      ) {
        // Delete the property if it's empty
        delete obj[key]
      }
    }
  }
  return obj
}

export { stringToEnum, removeEmptyProperties }
