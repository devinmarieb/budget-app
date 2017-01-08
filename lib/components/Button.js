import React, { Component } from 'react'

export default class Input extends Component {
  render() {
    const { text, handleClick } = this.props;

    return(
      <button onClick={ handleClick }> { text } </button>
    )
  }
}
