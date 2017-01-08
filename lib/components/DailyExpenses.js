import React from 'react';
import moment from 'moment'

const DailyExpenses = ({ monthlyExpensesList }) => {

  return (
    <section className='monthly-expenses-list'>
      <ul>
        {
          monthlyExpensesList.map(data => <li key={data.key}> {data.category}: {data.cost} </li>)
        }
      </ul>
    </section>
  )

}

// { moment(data.date).format('dddd MMMM D')}


export default MonthlyExpenses;
