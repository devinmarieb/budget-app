import React from 'react';
import moment from 'moment';
import Month from './Month';
import Button from './Button'

export default class Monthly extends React.Component {
  constructor() {
    super();
    this.state = {
      month: moment().format('dddd MMMM DDD')
    }
  }

  render() {
    let cost = this.props.cost
    return(
      <aside className='month-name-section'>
        <h3 className='display-month'> { this.state.month } </h3>
      </aside>
    )
  }
}
