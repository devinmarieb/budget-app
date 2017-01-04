import React from 'react';

export default class Input extends React.Component {
  render() {
    const { title, handle } = this.props;
    return(
      <button onClick={ ()=> handle() }> { title } </button>
    )
  }
}
