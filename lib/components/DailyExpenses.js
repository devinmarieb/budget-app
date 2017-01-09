import React from 'react';
import moment from 'moment'

const DailyExpenses = ({ dailyExpensesList }) => {
  return (
    <ul className='daily-expenses-list'>
      { getCurrentExpenses(dailyExpensesList) }
    </ul>
  )
}

const getCurrentExpenses = (dailyExpensesList) => {
  let currentArray = dailyExpensesList.filter(data => moment(data.date).isSame(moment(), 'day'));

  return currentArray.map(data => <li className='list-items' key={data.key}> {data.category}:<span className='daily-costs'> ${data.cost} </span>{ moment(data.date).format('LT')} </li>)

}

export default DailyExpenses;
