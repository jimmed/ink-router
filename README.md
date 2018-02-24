# ink-router

An implementation of [react-router][react-router] for [ink][ink].

# Installation

Using [yarn][yarn]:

```
$ yarn add ink-router
```

# Usage

As much as possible, this project aims to match the behaviour of [react-router][react-router].

It exposes the following components (and higher-order component):

```js
import {
  Router,
  CommandLineRouter,
  Route,
  Switch,
  withRouter
} from 'ink-router'
```

## `<Router />`

Wraps your command-line application with a router context:

```js
import { h, render } from 'ink'
import { Router } from 'ink-router'

render(
  <Router>
    <App />
  </Router>
)
```

Accepts the following props:

| Prop                  | Description                                                                                                                                          | Default    |
|:----------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------|:-----------|
| `initialEntries`      | An array of URLs to populate the router history with                                                                                                 | `['/']`    |
| `initialIndex`        | The initial index in `initialEntries` at which navigation should begin                                                                               | `0`        |
| `keyLength`           | The length of `key` to generate to uniquely identify each route                                                                                      | `6`        |
| `children`            | A single child element to render                                                                                                                     | _required_ |
| `getUserConfirmation` | A function to use to confirm navigation.<br /><br />**NOTE:** There is no `<Prompt />` component yet, and as such no need for `getUserConfirmation`. | _none_     |

## `<CommandLineRouter />`

Provides an instance of Router, with its initial route set based on the arguments
passed to the current process. In other words, it translates command-line arguments
to a path that your application can use for routing, and other decisions.

Command-line arguments are parsed using [yargs-parser][yargs-parser].

It accepts the same props as `Router`, with the following changes:

| Prop             | Description                                                           | Default                 |
|:-----------------|:----------------------------------------------------------------------|:------------------------|
| `args`           | An array of arguments to parse and use as the initial route           | `process.argv.slice(2)` |
| `options`        | An optional object of options to pass to [yargs-parser][yargs-parser] | _none_                  |
| `initialEntries` | An array of history entries to prepend to the initially derived route | `[]`                    |
| `initialIndex`   | As per `Router`                                                       | `initialEntries.length` |

## `<Route />`

Just like in react-router, this allows you to control the rendering of a component,
based on whether the specified path matches the current router location.

```js
import { h, render } from 'ink'
import { Router } from 'ink-router'
import { HomeView, SettingsView } from './views'

render(
  <Router>
    <div>
      <Route exact path="/" component={HomeView} />
      <Route path="/settings" component={SettingsView} />
    </div>
  </Router>
)
```

Accepts the following props:

| Prop        | Description                                                                                      | Default    |
|:------------|:-------------------------------------------------------------------------------------------------|:-----------|
| `path`      | The path on which to match. Supports named parameters, as per [`path-to-regexp`][path-to-regexp] | `'/'`      |
| `exact`     | If `true`, the component will only render if the path matches exactly.                           | `false`    |
| `component` | The component to render if the path matches                                                      | _required_ |

**NOTE:** While react-router's `Route` component accepts 3 different ways to
render an element, ink-router only supports one: the `component` prop.

The rendered component will be passed the following properties:

```js
// Assuming the following route matched
<Route path="/settings/:settingsView" component={SettingsView} />

// SettingsView will receive these props
{
  match: {
    path: '/settings/accounts', // The exact path matched
    params: {
      settingsView: 'accounts'
    }
  },
  location: { ... }, // An object containing the current location from history
  history: { ... }, // The history object from the router
}
```

## `<Switch />`

When given a set of `<Route />` as children, this component will only render
the first that matches the current location.

```js
import { h, render } from 'ink'
import { CommandLineRouter, Switch, Route } from 'ink-router'
import { HomeView, SettingsView } from './views'

render(
  <CommandLineRouter>
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Route path="/settings" component={SettingsView} />
    </Switch>
  </CommandLineRouter>
)
```

### Providing a fallback route

In the above example, when the user supplies arguments of `not a route` to the command, the default
fallback message is shown, providing information about the route supplied.

[![Demo of Switch component](https://asciinema.org/a/i9FLuYX6aD9RGc8cdZ9N2MXYL.png)](https://asciinema.org/a/i9FLuYX6aD9RGc8cdZ9N2MXYL)

You can override this message by providing a catch-all route as the last child
of your `<Switch />`:

```js
import { h, render } from 'ink'
import { CommandLineRouter, Switch, Route } from 'ink-router'
import { HomeView, SettingsView, NotFoundView } from './views'

render(
  <CommandLineRouter>
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Route path="/settings" component={SettingsView} />
      <Route path="/" component={NotFoundView} />
    </Switch>
  </CommandLineRouter>
)
```

Alternatively, you can pass the component to render as the `notFound` prop of your
`<Switch />`, although support for this may be removed in future:

```js
import { h, render } from 'ink'
import { CommandLineRouter, Switch, Route } from 'ink-router'
import { HomeView, SettingsView, NotFoundView } from './views'

render(
  <CommandLineRouter>
    <Switch notFound={NotFoundView}>
      <Route exact path="/" component={HomeView} />
      <Route path="/settings" component={SettingsView} />
    </Switch>
  </CommandLineRouter>
)
```

## `withRouter(WrappedComponent)`

A higher-order component that empowers a child component with router powers.

Here's an example of a component that redirects after a few seconds:

```js
import { h, Component, Text } from 'ink'
import { withRouter } from 'ink-router'
import PropTypes from 'prop-types'

class RedirectAfterTime extends Component {
  static propTypes = {
    delay: PropTypes.number
    to: PropTypes.string.isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func
    })
  }
  static defaultProps = {
    delay: 3000
  }
  componentDidMount() {
    this.timeout = setTimeout(this.redirect, this.props.delay)
  }
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }
  redirect = () => {
    this.props.history.replace(this.props.to)
  }
  render() {
    return <Text italic>Redirecting shortly...</Text>
  }
}

export default withRouter(RedirectAfterTime)
```

[react-router]: https://github.com/ReactTraining/react-router
[ink]: https://github.com/vadimdemedes/ink
[yarn]: https://yarnpkg.com
[path-to-regexp]: https://github.com/pillarjs/path-to-regexp
[yargs-parser]: https://github.com/yargs/yargs-parser
