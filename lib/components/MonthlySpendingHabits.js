import React, { Component } from 'react';
import moment from 'moment';
import Input from './Input';

export default class MonthlySpendingHabits extends Component {

  constructor() {
    super();
    this.state = {
      date: '',
    }
  }

  updateDate(e) {
    this.setState({ date: e.target.value })
  }

   getCurrentExpenses(monthlyExpensesList) {
    let currentArray = monthlyExpensesList.filter(data => moment(data.date).isSame(moment(this.state.date), 'month'));
    return currentArray.map(data => <li className='list-items' key={data.key}> {data.category}:<span className='monthly-costs'> ${data.cost} </span> </li>)
  }

  render() {
    return(
      <aside className='date-picker'>
        <p>See monthly spending habits</p>
        <Input type='date' value={ this.state.date } updateState={ e => this.updateDate(e) } />
        <ul className='past-daily-expenses-list'>
          { this.getCurrentExpenses(this.props.monthlyExpensesList) }
        </ul>
      </aside>
    )
  }
}

//converter for date to milliseconds to test if date input works
// http://www.epochconverter.com
