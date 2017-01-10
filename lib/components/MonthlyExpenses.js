import React from 'react'
import moment from 'moment'
import Expense from './Expense'

const MonthlyExpenses = ({ monthlyExpensesList, handleDelete }) => {
  return (
    <ul className='monthly-expenses-list'>
      { getCurrentExpenses(monthlyExpensesList, handleDelete) }
    </ul>
  )
}

const getCurrentExpenses = (monthlyExpensesList, handleDelete) => {
  let currentArray = monthlyExpensesList.filter(data => moment(data.date).isSame(moment(), 'month'));
  return currentArray.map(data => <Expense key={data.key} handleDelete={ handleDelete } data={data} />)
}

export default MonthlyExpenses
