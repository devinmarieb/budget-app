import React from 'react';
import moment from 'moment'

const MonthlyExpenses = ({ monthlyExpensesList }) => {
  return (
    <section className='monthly-expenses-list'>
      <ul>
        { getCurrentExpenses(monthlyExpensesList) }
      </ul>
    </section>
  )
}

const getCurrentExpenses = (monthlyExpensesList) => {
  let currentArray = monthlyExpensesList.filter(data => moment(data.date).isSame(moment(), 'month'));

  return currentArray.map(data => <li className='monthly-expenses-list-item' key={data.key}> {data.category}: ${data.cost} </li>)
}

export default MonthlyExpenses
