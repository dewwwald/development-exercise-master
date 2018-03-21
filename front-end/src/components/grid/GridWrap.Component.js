import React, { Component } from 'react';

export class Grid extends Component {
  render() {
    const { children } = this.props;
    const childWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, { ...this.props });
    });
    return (<div className={`g
      ${this.props.align ? ' g--' + this.props.align : ''}
      ${this.props.reverse ? ' g--rev' : ''}
    `}>
      {childWithProps}
    </div>);
  }
}
