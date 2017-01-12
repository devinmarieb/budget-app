import React, { Component } from 'react';

export default class Input extends Component {
  render() {
    const { type, placeholder, value, updateState, handleKeyPress, label } = this.props;
    return (
      <input type={ type }
             placeholder={ placeholder }
             value={ value }
             onKeyPress={ handleKeyPress }
             onChange={ updateState }
             aria-label={ label } />
    );
  }
}
