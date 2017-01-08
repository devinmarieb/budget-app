import React from 'react';
import moment from 'moment'

const MonthlyExpenses = ({ monthlyExpensesList }) => {
  return (
    <section className='monthly-expenses-list'>
      <ul>
        {
          monthlyExpensesList.map(data => <li key={data.key}> {data.category}: ${data.cost} </li>)
        }
      </ul>
    </section>
  )
}


export default MonthlyExpenses;
