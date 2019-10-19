import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withRouter from './withRouter'
import { makeLocationMatcher } from './utils'

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

  constructor(props) {
    super(props)
    this.setPathToMatch(this.props)
    this.state = {
      match: this.matchLocation(this.props.location)
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
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

  render() {
    let { location, history, component: Component } = this.props;
    let { match } = this.state;
    return (
      match && <Component match={match} location={location} history={history} />
    )
  }
}

export default withRouter(Route)
