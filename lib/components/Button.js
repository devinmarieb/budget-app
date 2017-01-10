import React, { Component } from 'react'

export default class Input extends Component {
  render() {
    const { text, handleClick, className, disabled } = this.props;

    return (
      <button className={className}
              onClick={ handleClick }
              disabled={ disabled }> { text } </button>
    );
  }
}
