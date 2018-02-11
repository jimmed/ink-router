import { h, Text, Component } from 'ink'
import { inspect } from 'util'
import { makeLocationMatcher } from './utils'

class Switch extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.shape({
      _props: PropTypes.shape({
        path: PropTypes.string,
        exact: PropTypes.bool
      })
    })).isRequired
  }

  static defaultProps = {
    children: []
  }

  constructor(props, context) {
    super(props, context)
    this.setPathsToMatch(props)
    this.state = this.matchLocation(props.location)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.children !== this.props.children) {
      this.setPathsToMatch(newProps)
    }
    if (newProps.location.key !== this.props.location.key) {
      this.setLocation(newProps)
    }
  }

  setPathsToMatch({ children }) {
    this.locationMatchers = children.map(({ _props: { path, exact } }) =>
      makeLocationMatcher(path, exact)
    )
  }

  matchLocation(location) {
    const { match, matchIndex } =
      this.locationMatchers.find((matcher, matchIndex) => {
        const match = matcher(location)
        return match ? { match, matchIndex } : null
      }) || {}
    return { match, matchIndex }
  }

  setLocation({ location }) {
    this.setState(() => this.matchLocation(location))
  }

  render({ children, location, history }, { match, matchIndex }) {
    if (!match) return null
    const { component: Component } = children[matchIndex]
    if (!Component) return null
    return <Component match={match} location={location} history={history} />
  }
}

export default withRouter(Switch)
