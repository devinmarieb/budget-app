import React from 'react';
import moment from 'moment'

const DailyExpenses = ({ dailyExpensesList }) => {
  return (
    <section className='daily-expenses-list'>
      <ul>
        {
          dailyExpensesList.map(data => <li key={data.key}> {data.category}: ${data.cost} { moment().format('LT')} </li>)
        }
      </ul>
    </section>
  )
}


export default DailyExpenses;
