import React, { Component } from 'react';
import moment from 'moment';
import Button from './Button'

export default class MonthTitle extends Component {
  constructor() {
    super();
    this.state = {
      month: moment().format('dddd MMMM DDD')
    }
  }

  render() {
    return (
      <aside className='month-name-section'>
        <h3 className='display-month'> { this.state.month } </h3>
      </aside>
    )
  }
}
