import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { createMemoryHistory } from 'history'
const defaultValue = {
  location: null,
  history: null
}
export const RouteContext = React.createContext(defaultValue)

export default class Router extends Component {
  static propTypes = {
    initialEntries: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          pathname: PropTypes.string.isRequired,
          search: PropTypes.string,
          hash: PropTypes.string,
          state: PropTypes.any,
          key: PropTypes.string
        })
      ])
    ),
    initialIndex: PropTypes.number,
    keyLength: PropTypes.number,
    getUserConfirmation: PropTypes.func,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    initialEntries: ['/'],
    initialIndex: 0,
    keyLength: 6,
    getUserConfirmation: null
  }

  constructor(props, context) {
    super(props, context)
    this.history = createMemoryHistory({
      initialEntries: props.initialEntries,
      initialIndex: props.initialIndex,
      keyLength: props.keyLength,
      getUserConfirmation: props.getUserConfirmation
    })
    this.state = { location: this.history.location }
  }

  componentDidMount() {
    if (!this.historyUnlisten) {
      this.historyUnlisten = this.history.listen(this.handleHistoryAction)
    }
  }

  componentWillUnmount() {
    if (this.historyUnlisten) {
      this.historyUnlisten()
    }
  }

  handleHistoryAction = location => this.setState({ location })

  compareStates = (prev, next) => prev.location.key === next.location.key

  render() {
    const location = this.state.location
    const broadcastValue = { location, history: this.history }
    return (
      <RouteContext.Provider value={broadcastValue} compareValues={this.compareStates}>
        {this.props.children}
      </RouteContext.Provider>
    )
  }
}
