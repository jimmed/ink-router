import React from 'react'
import { render } from 'ink-testing-library'
import Router from './router'

describe('<Router />', () => {
  describe('with default props', () => {
    it('should render without throwing an error', () => {
      expect(() => render(<Router>Hello</Router>)).not.toThrow()
    })

    it('should render the one child passed to it', () => {
      const {lastFrame} = render(<Router>Hello</Router>)
      expect(lastFrame()).toEqual('Hello')
    })
  })
})