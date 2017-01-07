import React from 'react';

export default class Input extends React.Component {
  render() {
    const { text, handleClick } = this.props;

    return(
      <button onClick={ handleClick }> { text } </button>
    )
  }
}
