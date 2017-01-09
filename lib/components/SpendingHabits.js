import React, { Component } from 'react';
import moment from 'moment';
import Input from './Input';

export default class SpendingHabits extends Component {

  constructor() {
    super();
    this.state = {
      date: '',
    }
  }

  updateDate(value) {
    this.setState({ date: value })
  }

   getCurrentExpenses(dailyExpensesList) {
    let currentArray = dailyExpensesList.filter(data => moment(data.date).isSame(moment(this.state.date), 'day'));
    return currentArray.map(data => <li className='list-items' key={data.key}> {data.category}:<span className='daily-costs'> ${data.cost} </span>{ moment(data.date).format('LT')} </li>)
  }


  render() {
    return(
      <aside className='date-picker'>
        <p>Pick a date to see spending habits</p>
        <Input type='date' value={ this.state.date } handle={ this.updateDate.bind(this)} />
        <ul className='past-daily-expenses-list'>
          { this.getCurrentExpenses(this.props.dailyExpensesList) }
        </ul>
      </aside>
    )
  }
}
