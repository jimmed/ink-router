import { h, Component } from 'ink'
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

  render({
    args,
    options,
    initialEntries,
    initialIndex = initialEntries.length,
    ...restProps
  }) {
    const initialPath = argsToPath(argParser(args, options))
    return (
      <Router
        initialEntries={[...initialEntries, initialPath]}
        initialIndex={initialIndex}
        {...restProps}
      />
    )
  }
}

const argsToPath = ({ _: path, ...params }) => {
  const basePath = `/${path.join('/')}`
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return `${basePath}${queryString ? `?${queryString}` : ''}`
}

export default CommandLineRouter
