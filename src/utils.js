import pathToRegExp from 'path-to-regexp'

export const makeLocationMatcher = (path, exact) => {
  const pathKeys = []
  const pathRegExp = pathToRegExp(path, pathKeys, { end: exact })
  return (location = {}) => {
    if (!location || !location.pathname) {
      return null
    }
    const pathMatch = pathRegExp.exec(location.pathname)
    return pathMatch && transformPathMatch(pathMatch, location, pathKeys)
  }
}

export const transformPathMatch = ([path, ...match], location, keys) => {
  const pathParams = keys.reduce((acc, key, index) => {
    acc[key.name] = match[index]
    return acc
  }, {})

  const queryParams = location.search.startsWith('?')
    ? parseQueryString(location.search.slice(1))
    : {}

  const params = { ...pathParams, ...queryParams, ...location.state }

  return { path, params }
}

export const parseQueryString = query =>
  query.split('&').reduce((acc, pair) => {
    if (!pair) return acc
    const [key, ...value] = pair.split('=')
    acc[key] = value.join('=') || true
    return acc
  }, {})
