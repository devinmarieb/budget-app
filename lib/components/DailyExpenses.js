import React from 'react';
import moment from 'moment'

const DailyExpenses = ({ dailyExpensesList }) => {
  return (
    <section className='daily-expenses-list'>
      <ul>
        { getCurrentExpenses(dailyExpensesList) }
      </ul>
    </section>
  )
}

const getCurrentExpenses = (dailyExpensesList) => {
  let currentArray = dailyExpensesList.filter(data => moment(data.date).isSame(moment(), 'day'));

  return currentArray.map(data => <li key={data.key}> {data.category}: ${data.cost} { moment(data.date).format('LT')} </li>)
}

export default DailyExpenses;
