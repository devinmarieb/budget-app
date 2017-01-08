import React, { Component } from 'react'

export default class Input extends Component {
  render() {
    const { text, handleClick, className } = this.props;

    return(
      <button className={className} onClick={ handleClick }> { text } </button>
    )
  }
}
