import { h, Component } from 'ink'
import PropTypes from 'prop-types'
import createHistory from 'history/createMemoryHistory'
import { Broadcast } from 'ink-broadcast'

export default class Router extends Component {
  static propTypes = {
    initialEntries: PropTypes.arrayOf(PropTypes.string.isRequired),
    initialIndex: PropTypes.number,
    keyLength: PropTypes.number,
    getUserConfirmation: PropTypes.func,
    children: PropTypes.node.isRequired,
    channel: PropTypes.string
  }

  static defaultProps = {
    initialEntries: ['/'],
    initialIndex: 0,
    keyLength: 6,
    getUserConfirmation: null,
    channel: 'router'
  }

  constructor(props, context) {
    super(props, context)
    this.history = createHistory({
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

  handleHistoryAction = (location) => this.setState({ location })

  compareStates = (prev, next) => prev.location.key === next.location.key

  render({ channel, children }, { location }) {
    const broadcastValue = { location, history: this.history }
    return (
      <Broadcast
        channel={channel}
        value={broadcastValue}
        compareValues={this.compareStates}
      >
        {children}
      </Broadcast>
    )
  }
}
