import React, { Component } from 'react'
import moment from 'moment'
import Input from './Input'
import Expense from './Expense'

export default class SpendingHabits extends Component {

  constructor() {
    super();
    this.state = {
      date: '',
    }
  }

  updateDate(e) {
    this.setState({ date: e.target.value })
  }

   getCurrentExpenses(dailyExpensesList, handleDelete) {
    let currentArray = dailyExpensesList.filter(data => moment(data.date).isSame(moment(this.state.date), 'day'));
    return currentArray.map(data => <Expense key={data.key} handleDelete={ this.props.handleDelete } data={data} />)
  }

  render() {
    return(
      <aside className='date-picker'>
        <p>Pick a date to see spending habits</p>
        <Input type='date' value={ this.state.date } updateState={ e => this.updateDate(e) } />
        <ul className='past-daily-expenses-list'>
          { this.getCurrentExpenses(this.props.dailyExpensesList, this.props.handleDelete) }
        </ul>
      </aside>
    )
  }
}

//converter for date to milliseconds to test if date input works
// http://www.epochconverter.com
