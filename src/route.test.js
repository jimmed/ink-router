import { h, renderToString } from 'ink'
import Route from './route'
import Router from './router'

describe('<Route />', () => {
  describe('given a single route with default props', () => {
    it('should render the component', () => {
      const rendered = renderToString(
        <Router>
          <Route component={() => 'Hello'} />
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
            <Route path="/" exact component={() => 'A'} />
            <Route path="/B" component={() => 'B'} />
            <Route path="/C" component={() => 'C'} />
          </Router>
        )
      ).toBe('A')
    })

    it('should match /B', () => {
      expect(
        renderToString(
          <Router initialEntries={['/B']}>
            <Route path="/" exact component={() => 'A'} />
            <Route path="/B" component={() => 'B'} />
            <Route path="/C" component={() => 'C'} />
          </Router>
        )
      ).toBe('B')
    })

    it('should match /C', () => {
      expect(
        renderToString(
          <Router initialEntries={['/B']}>
            <Route path="/" exact component={() => 'A'} />
            <Route path="/B" component={() => 'B'} />
            <Route path="/C" component={() => 'C'} />
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
            <Route path="/" component={() => 'A'} />
            <Route path="/B" component={() => 'B'} />
            <Route path="/C" component={() => 'C'} />
          </Router>
        )
      ).toBe('AB')
    })
  })
})
