import { h, Component } from 'ink'
import PropTypes from 'prop-types'
import makeSubscriber from 'ink-broadcast/dist/subscriber'

const Subscriber = makeSubscriber('router')

const withRouter = WrappedComponent => (props) => (
  <Subscriber>
    {(state = {}) => <WrappedComponent {...props} {...state} />}
  </Subscriber>
)

export default withRouter
