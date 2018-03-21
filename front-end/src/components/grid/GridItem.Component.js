import React, { Component } from 'react';

export class GridItem extends Component {
  render() {
    const { children } = this.props;
    const childWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, { ...this.props });
    });

    const { className } = this.props;

    return (<div className={`g__i ${className}`}>
      {childWithProps}
    </div>);
  }
}
