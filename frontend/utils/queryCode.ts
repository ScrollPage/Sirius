export type Obj = { [key: string]: (string | number | boolean | undefined) };
type ClearObj = { [key: string]: (string | number | boolean) };

export const createApiWithQuery = (baseUrl: string, queryObject: Obj) => {
  const queryString = encodeQueryObjectToString(queryObject);
  let fullQueryString = "";
  if (queryString) {
    fullQueryString = "?" + queryString;
  }
  return baseUrl + fullQueryString;
};

export const encodeQueryObjectToString = (object: Obj) => {
  const clearObject = createClearObject(object)
  if (isEmpty(clearObject)) {
    return ""
  }
  let atLeastOne = false
  const result = Object.entries(clearObject)
    .map(pair => {
      atLeastOne = true
      return pair.join('=')
    })
    .join('&');
  if (!atLeastOne) {
    return ""
  }
  return result
}

export const createClearObject = (object: Obj): ClearObj => {
  Object.keys(object).forEach(key => !object[key] ? delete object[key] : {});
  return object as ClearObj
}

const isEmpty = (object: ClearObj): boolean => Object.keys(object).length === 0
