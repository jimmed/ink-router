import React, { Component } from 'react'
import { Text } from 'ink'
import { render } from 'ink-testing-library'
import withRouter from './withRouter'
import Router from './router'
import { RouteContext } from './router'


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
      const VerifyNull = ({location}) => {
        expect(location).toBeNull();
        return null;
      }
      WrappedComponent = withRouter(VerifyNull)
    })
    it('should equal to default value of the context', () => {
      render(<WrappedComponent />)
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
      render(
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
      render(
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