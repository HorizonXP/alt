/**
 * IsomorphicRenderer(alt: AltInstance, App: ReactElement): mixed
 *
 * > The glue that it takes to render a react element isomorphically
 *
 * ** This util depends on iso and react **
 *
 * Usage:
 *
 * ```js
 * var IsomorphicRenderer = require('alt/utils/IsomorphicRenderer');
 * var React = require('react');
 * var Alt = require('alt');
 * var alt = new Alt();
 *
 * var App = React.createClass({
 *   render() {
 *     return (
 *       <div>Hello World</div>
 *     );
 *   }
 * });
 *
 * module.exports = IsomorphicRenderer(alt, App);
 * ```
 */

import Iso from 'iso'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

export default function IsomorphicRenderer(alt, App) {
  /*eslint-disable */
  if (typeof window === 'undefined') {
    /*eslint-enable */
    return () => {
      const app = ReactDOMServer.renderToString(React.createElement(App))
      const markup = Iso.render(app, alt.takeSnapshot())
      alt.flush()
      return markup
    }
  }

  Iso.bootstrap((state, _, node) => {
    const app = React.createElement(App)
    alt.bootstrap(state)
    ReactDOM.render(app, node)
  })
}
