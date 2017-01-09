import React, { Component } from 'react';

export default class Input extends Component {
  render() {
    const { type, placeholder, value, handle } = this.props;
    return(
      <input type={ type }
             placeholder={ placeholder }
             value={ value }
             onChange={ (e)=> handle(e.target.value) } />
    )
  }
}
