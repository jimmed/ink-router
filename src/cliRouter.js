import React, { Component } from 'react'
import PropTypes from 'prop-types'
import argParser from 'yargs-parser'
import Router from './router'

class CommandLineRouter extends Component {
  static propTypes = {
    args: PropTypes.arrayOf(PropTypes.string),
    options: PropTypes.object,
    initialEntries: PropTypes.arrayOf(PropTypes.string),
    initialIndex: PropTypes.number
  }

  static defaultProps = {
    args: process.argv.slice(2),
    initialEntries: []
  }

  render() {
    let {
      args,
      options,
      initialEntries,
      initialIndex = initialEntries.length,
      ...restProps
    } = this.props
    const initialLocation = argsToLocation(argParser(args, options))
    return (
      <Router
        initialEntries={[...initialEntries, initialLocation]}
        initialIndex={initialIndex}
        {...restProps}
      />
    )
  }
}

const argsToLocation = ({ _: basePath, ...params }) => {
  const pathname = `/${basePath.join('/')}`
  return { pathname, state: params }
}

export default CommandLineRouter
