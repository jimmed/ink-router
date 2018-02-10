import { h, Component } from 'ink'
import PropTypes from 'prop-types'
import { Subscriber } from '../ink-broadcast'

const withRouter = WrappedComponent => ({
  channel = 'router',
  ...restProps
}) => (
  <Subscriber channel={channel}>
    {(state = {}) => <WrappedComponent {...state} {...restProps} />}
  </Subscriber>
)

export default withRouter
