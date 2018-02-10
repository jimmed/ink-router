import { h, Component } from 'ink'
import PropTypes from 'prop-types'
import pathToRegExp from 'path-to-regexp'
import withRouter from './withRouter'

export class Route extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    location: PropTypes.shape({
      key: PropTypes.string,
      pathname: PropTypes.string
    }),
    history: PropTypes.object
  }

  static defaultProps = {
    path: '/',
    exact: false,
    location: {}
  }

  constructor(props, context) {
    super(props, context)
    this.setPathToMatch(props)
    this.state = {
      match: this.matchLocation(props.location)
    }
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.path !== this.props.path ||
      newProps.exact !== this.props.exact
    ) {
      this.setPathToMatch(newProps)
    }
    if (newProps.location.key !== this.props.location.key) {
      this.setLocation(newProps)
    }
  }

  setPathToMatch({ path, exact }) {
    this.matchLocation = makeLocationMatcher(path, exact)
  }

  setLocation({ location }) {
    this.setState({ match: this.matchLocation(location) })
  }

  render({ exact, path, location, history, component: Component }, { match }) {
    return (
      match && <Component match={match} location={location} history={history} />
    )
  }
}

const makeLocationMatcher = (path, exact) => {
  const pathKeys = []
  const pathRegExp = pathToRegExp(path, pathKeys, { end: exact })
  return (location = {}) => {
    if (!location || !location.pathname) {
      return null
    }
    const pathMatch = pathRegExp.exec(location.pathname)
    return pathMatch && transformPathMatch(pathMatch, location, pathKeys)
  }
}

const transformPathMatch = ([path, ...match], location, keys) => {
  const pathParams = keys.reduce((acc, key, index) => {
    acc[key.name] = match[index]
    return acc
  }, {})

  const queryParams = location.search.startsWith('?')
    ? parseQueryString(location.search.slice(1))
    : {}

  const params = { ...pathParams, ...queryParams }

  return { path, params }
}

const parseQueryString = query =>
  query.split('&').reduce((acc, pair) => {
    const [key, ...value] = pair.split('=')
    acc[key] = value.join('=')
    return acc
  }, {})

export default withRouter(Route)
