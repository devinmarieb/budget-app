import React, { Component } from 'react';
import moment from 'moment';
import Button from './Button'

export default class MonthTitle extends Component {
  render() {
    return (
      <aside className='month-name-section'>
        <h3 className={this.props.className}>{ this.props.dateTitle }</h3>
      </aside>
    )
  }
}
