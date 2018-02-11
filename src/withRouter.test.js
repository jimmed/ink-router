import { h, Text, renderToString } from 'ink'
import withRouter from './withRouter'
import Router from './router'

describe('withRouter', () => {
  describe('when wrapping a component', () => {
    let WrappedComponent
    beforeEach(() => {
      WrappedComponent = withRouter(() => {})
    })

    it('should return a function', () => {
      expect(typeof WrappedComponent).toBe('function')
    })
  })

  describe('when mounted outside of a Router context', () => {
    let WrappedComponent
    beforeEach(() => {
      WrappedComponent = withRouter(() => {})
    })

    it('should throw an error', () => {
      expect(() => {
        renderToString(<WrappedComponent />)
      }).toThrow(/must be rendered in the context/)
    })
  })

  describe('when mounted in a Router context', () => {
    let WrappedComponent
    let InnerComponent
    beforeEach(() => {
      InnerComponent = jest.fn(() => null)
      WrappedComponent = withRouter(InnerComponent)
    })

    it('should pass a location prop', () => {
      const rendered = renderToString(
        <Router>
          <WrappedComponent />
        </Router>
      )
      expect(InnerComponent.mock.calls[0][0]).toMatchObject({
        location: {
          pathname: '/'
        }
      })
    })

    it('should pass a history prop', () => {
      const rendered = renderToString(
        <Router>
          <WrappedComponent />
        </Router>
      )
      expect(InnerComponent.mock.calls[0][0]).toMatchObject({
        history: {
          action: 'POP',
          location: { pathname: '/' }
        }
      })
    })
  })
})
