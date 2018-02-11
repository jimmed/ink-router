import {
  makeLocationMatcher,
  parseQueryString
} from './utils'

const describeLocationMatcher = ({
  description,
  path,
  exact = false,
  cases = []
}) => {
  describe(description, () => {
    let matcher
    beforeEach(() => {
      matcher = makeLocationMatcher(path, exact)
    })
    afterEach(() => {
      matcher = null
    })
    cases.forEach(
      ({ path, params = {}, search = '', hash = '', match = true }) => {
        it(`should${match ? '' : ' not'} match ${path}`, () => {
          const actual = matcher({ pathname: path, search, hash })
          if (match) {
            expect(actual).toBeTruthy()
            expect(actual.params).toEqual(params)
          } else {
            expect(actual).toBe(null)
          }
        })
      }
    )
  })
}

describe('makeLocationMatcher', () => {
  describeLocationMatcher({
    description: 'given a simple path',
    path: '/',
    cases: [{ path: '/' }, { path: '/cats' }]
  })
  describeLocationMatcher({
    description: 'given a simple exact path',
    path: '/',
    exact: true,
    cases: [{ path: '/' }, { path: '/cats', match: false }]
  })
  describeLocationMatcher({
    description: 'given a path with parameters',
    path: '/cats/:catID',
    cases: [
      { path: '/', match: false },
      { path: '/cats', match: false },
      { path: '/cats/bobby', params: { catID: 'bobby' } },
      { path: '/cats/bootsy', params: { catID: 'bootsy' } }
    ]
  })
  describeLocationMatcher({
    description: 'given a simple path with a query string',
    path: '/cat',
    cases: [{ path: '/cat', search: '?name=bobby', params: { name: 'bobby' } }]
  })
  describeLocationMatcher({
    description: 'given a simple exact path with a query string',
    path: '/cat',
    exact: true,
    cases: [
      { path: '/cat', search: '?name=bobby', params: { name: 'bobby' } },
      {
        path: '/cat/stats',
        search: '?name=bobby',
        params: { name: 'bobby' },
        match: false
      }
    ]
  })
  describeLocationMatcher({
    description: 'given a path with parameters and a query string',
    path: '/cats/:catID',
    cases: [
      {
        path: '/cats/1',
        search: '?name=bobby',
        params: { catID: '1', name: 'bobby' }
      }
    ]
  })
})

describe('parseQueryString', () => {
  it('should return an empty object with an empty string', () => {
    const expected = {}
    const actual = parseQueryString('')
    expect(actual).toEqual(expected)
  })

  it('should parse a set of simple variables', () => {
    const expected = { foo: 'bar', baz: 'quux' }
    const actual = parseQueryString('foo=bar&baz=quux')
    expect(actual).toEqual(expected)
  })

  it('should return true for variables with no value', () => {
    const expected = { foo: 'bar', baz: true }
    const actual = parseQueryString('foo=bar&baz')
    expect(actual).toEqual(expected)
  })

  it('should return true for variables with a trailing equals sign', () => {
    const expected = { foo: 'bar', baz: true }
    const actual = parseQueryString('foo=bar&baz=')
    expect(actual).toEqual(expected)
  })
})
