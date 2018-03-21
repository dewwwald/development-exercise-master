import React, { Component } from 'react';

/**
 * @class Applies styles to div and pass the props
 */
export class PassProps extends Component {
  render() {
    const passProps = Object.assign({}, this.props, { style: undefined });
    const childrenWithProps = React.Children.map(this.props.children, child => {
      if (child && typeof child.type === 'function') {
        return React.cloneElement(child, {
          ...passProps,
          ...child.props
        });
      } else if (child) {
        return React.cloneElement(child, child.props);
      }
    });

    return (<div style={{ ...(this.props.style || {}) }}>
      {childrenWithProps}
    </div>);
  }
}
