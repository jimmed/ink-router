import { h, renderToString } from 'ink'
import Route from './route'
import Switch from './switch'
import Router from './router'

describe('<Switch />', () => {
  describe('given a single route with default props', () => {
    it('should render the component', () => {
      const rendered = renderToString(
        <Router>
          <Switch>
            <Route component={() => 'Hello'} />
          </Switch>
        </Router>
      )
      expect(rendered).toBe('Hello')
    })
  })

  describe('given multiple exact routes', () => {
    it('should match /', () => {
      expect(
        renderToString(
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
        renderToString(
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
        renderToString(
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
        renderToString(
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
