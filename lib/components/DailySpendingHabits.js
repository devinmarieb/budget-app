import React, { Component } from 'react';
import moment from 'moment';
import Input from './Input';

export default class DailySpendingHabits extends Component {

  constructor() {
    super();
    this.state = {
      date: '',
    }
  }

  updateDate(e) {
    this.setState({ date: e.target.value })
  }

   getCurrentExpenses(dailyExpensesList) {
    let currentArray = dailyExpensesList.filter(data => moment(data.date).isSame(moment(this.state.date), 'day'));
    return currentArray.map(data => <li className='list-items'
                                        key={data.key}> {data.category}:<span
                                        className='daily-costs'> ${data.cost} </span>{ moment(data.date).format('LT')} </li>)
  }

  render() {
    return(
      <aside className='date-picker'>
        <p>See daily spending habits</p>
        <Input type='date' value={ this.state.date } updateState={ e => this.updateDate(e) } />
        <ul className='past-daily-expenses-list'>
          { this.getCurrentExpenses(this.props.dailyExpensesList) }
        </ul>
      </aside>
    )
  }
}

//converter for date to milliseconds to test if date input works
// http://www.epochconverter.com