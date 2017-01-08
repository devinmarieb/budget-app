import React from 'react';
import moment from 'moment'

const MonthlyExpenses = ({ monthlyExpensesList }) => {
  return (
    <section className='monthly-expenses-list'>
      <ul className='list-items'>
        { getCurrentExpenses(monthlyExpensesList) }
      </ul>
    </section>
  )
}

const getCurrentExpenses = (monthlyExpensesList) => {
  let currentArray = monthlyExpensesList.filter(data => moment(data.date).isSame(moment(), 'month'));

  return currentArray.map(data => <li className='list-items' key={data.key}> {data.category}: <span className='monthly-costs'>${data.cost}</span> </li>)
}

export default MonthlyExpenses
