import React from 'react';
import moment from 'moment';
import Expense from './Expense';

const DailyExpenses = ({ dailyExpensesList, handleDelete }) => {
  return (
    <ul className='daily-expenses-list'>
      { getCurrentExpenses(dailyExpensesList, handleDelete) }
    </ul>
  )
}

const getCurrentExpenses = (dailyExpensesList, handleDelete) => {
  let currentArray = dailyExpensesList.filter(data => moment(data.date).isSame(moment(), 'day'));
  return currentArray.map(data => <Expense key={data.key} handleDelete={ handleDelete } data={data} />)
}

export default DailyExpenses;
