import React from 'react';

export default class Input extends React.Component {
  render() {
    const { title, handle, time } = this.props;
    return(
      <button onClick={ ()=> handle() }> { title } </button>
    )
  }
}
