import { h, renderToString } from 'ink'
import Router from './router'

describe('<Router />', () => {
  describe('with default props', () => {
    it('should render without throwing an error', () => {
      expect(() => renderToString(<Router>Hello</Router>)).not.toThrow()
    })

    it('should render the one child passed to it', () => {
      const actual = renderToString(<Router>Hello</Router>)
      expect(actual).toEqual('Hello')
    })
  })
})
