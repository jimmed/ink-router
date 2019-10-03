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
      expect(
        render(
          <Router>
            <Switch>
              <Route path="/" exact component={() => 'A'} />
              <Route path="/B" component={() => 'B'} />
              <Route path="/C" component={() => 'C'} />
            </Switch>
          </Router>
        )
      ).toBe('A')
    })

    it('should match /B', () => {
      expect(
        render(
          <Router initialEntries={['/B']}>
            <Switch>
              <Route path="/" exact component={() => 'A'} />
              <Route path="/B" component={() => 'B'} />
              <Route path="/C" component={() => 'C'} />
            </Switch>
          </Router>
        )
      ).toBe('B')
    })

    it('should match /C', () => {
      expect(
        render(
          <Router initialEntries={['/B']}>
            <Switch>
              <Route path="/" exact component={() => 'A'} />
              <Route path="/B" component={() => 'B'} />
              <Route path="/C" component={() => 'C'} />
            </Switch>
          </Router>
        )
      ).toBe('B')
    })
  })

  describe('given multiple inexact routes', () => {
    it('can match multiple', () => {
      expect(
        render(
          <Router initialEntries={['/B']}>
            <Switch>
              <Route path="/" component={() => 'A'} />
              <Route path="/B" component={() => 'B'} />
              <Route path="/C" component={() => 'C'} />
            </Switch>
          </Router>
        )
      ).toBe('B')
    })
  })
})
