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

  render({ location, history, component: Component }, { match }) {
    return (
      match && <Component match={match} location={location} history={history} />
    )
  }
}

export default withRouter(Route)
