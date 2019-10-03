import React from 'react'
import { render } from 'ink-testing-library'
import Route from './route'
import Switch from './switch'
import Router from './router'

describe('<Switch />', () => {
  describe('given a single route with default props', () => {
    it('should render the component', () => {
      const {lastFrame} = render(
        <Router>
          <Switch>
            <Route component={() => 'Hello'} />
          </Switch>
        </Router>
      )
      expect(lastFrame()).toBe('Hello')
    })
  })

  describe('given multiple exact routes', () => {
    it('should match /', () => {
      const {lastFrame} = render(
        <Router>
          <Switch>
            <Route path="/" exact component={() => 'A'} />
            <Route path="/B" component={() => 'B'} />
            <Route path="/C" component={() => 'C'} />
          </Switch>
        </Router>
      )
      expect(
        lastFrame()
      ).toBe('A')
    })

    it('should match /B', () => {
      const {lastFrame} = render(
        <Router initialEntries={['/B']}>
          <Switch>
            <Route path="/" exact component={() => 'A'} />
            <Route path="/B" component={() => 'B'} />
            <Route path="/C" component={() => 'C'} />
          </Switch>
        </Router>
      )
      expect(
        lastFrame()
      ).toBe('B')
    })

    it('should match /C', () => {
      const {lastFrame} = render(
        <Router initialEntries={['/B']}>
          <Switch>
            <Route path="/" exact component={() => 'A'} />
            <Route path="/B" component={() => 'B'} />
            <Route path="/C" component={() => 'C'} />
          </Switch>
        </Router>
      )
      expect(
        lastFrame()
      ).toBe('B')
    })
  })

  describe('given multiple inexact routes', () => {
    it('can match multiple', () => {
      const {lastFrame} = render(
        <Router initialEntries={['/B']}>
          <Switch>
            <Route path="/" component={() => 'A'} />
            <Route path="/B" component={() => 'B'} />
            <Route path="/C" component={() => 'C'} />
          </Switch>
        </Router>
      )
      expect(
        lastFrame()
      ).toBe('B')
    })
  })
})
