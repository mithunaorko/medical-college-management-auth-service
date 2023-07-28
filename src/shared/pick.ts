const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Partial<T> => {
  // partial means optional
  const finalObj: Partial<T> = {};

  for (const key of keys) {
  // if object contain this property then append the object of final object as a key value
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }

  return finalObj;
};

export default pick;
