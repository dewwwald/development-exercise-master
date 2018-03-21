import React, { Component } from 'react';

export class NavigationSideBarState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false
    };
  }

  toggleMenu() {
    this.setState((prevState, props) => ({
      toggled: !prevState.toggled
    }));
  }

  render() {
    const { children } = this.props;
    const childrenWithProps = React.Children
      .map(children, child => {
        if (typeof child.type === 'function') {
          return React.cloneElement(child, {
            ...this.props,
            ...this.state,
            ...child.props,
            toggleMenu: this.toggleMenu.bind(this)
          });
        }
        return React.cloneElement(child);
      });

    return (childrenWithProps);
  }
}
