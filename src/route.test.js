import React from 'react';
import { render } from 'ink-testing-library'
import Route from './route'
import Router from './router'

describe('<Route />', () => {
  describe('given a single route with default props', () => {
    it('should render the component', () => {
      const {lastFrame} = render(
        <Router>
          <Route component={() => 'Hello'} />
        </Router>
      )
      expect(lastFrame()).toBe('Hello')
    })
  })

  describe('given multiple exact routes', () => {
    it('should match /', () => {
      const {lastFrame} = render(
        <Router>
          <Route path="/" exact component={() => 'A'} />
          <Route path="/B" component={() => 'B'} />
          <Route path="/C" component={() => 'C'} />
        </Router>
      )
      expect(lastFrame()).toBe('A')
    })

    it('should match /B', () => {
      const {lastFrame} = render(
        <Router initialEntries={['/B']}>
          <Route path="/" exact component={() => 'A'} />
          <Route path="/B" component={() => 'B'} />
          <Route path="/C" component={() => 'C'} />
        </Router>
      )
      expect(lastFrame()).toBe('B')
    })

    it('should match /C', () => {
      const {lastFrame} = render(
        <Router initialEntries={['/B']}>
          <Route path="/" exact component={() => 'A'} />
          <Route path="/B" component={() => 'B'} />
          <Route path="/C" component={() => 'C'} />
        </Router>
      )
      expect(lastFrame()).toBe('B')
    })
  })

  describe('given multiple inexact routes', () => {
    it('can match multiple', () => {
      const {lastFrame} = render(
        <Router initialEntries={['/B']}>
          <Route path="/" component={() => 'A'} />
          <Route path="/B" component={() => 'B'} />
          <Route path="/C" component={() => 'C'} />
        </Router>
      )
      expect(lastFrame()).toBe('A\nB')
    })
  })
})
