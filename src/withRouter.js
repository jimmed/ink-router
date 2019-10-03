import React from 'react'
import PropTypes from 'prop-types'
import { RouteContext } from './router'

const withRouter = WrappedComponent => (props) => (
  <RouteContext.Consumer>
    {(state = {}) => <WrappedComponent {...props} {...state} />}
  </RouteContext.Consumer>
)

export default withRouter
