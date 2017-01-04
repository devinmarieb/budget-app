import React from 'react';

export default class Input extends React.Component {
  render() {
    const { type, title, value, handle } = this.props;
    return(
      <input type={ type } placeholder={ title } value={ value } onChange={ (e)=> handle(e.target.value) } />
    )
  }
}
