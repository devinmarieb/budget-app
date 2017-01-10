import React from 'react';
import moment from 'moment';
import Expense from './Expense';

const getCurrentExpenses = (dailyExpensesList, handleDelete) => {
  const currentArray = dailyExpensesList.filter(data => moment(data.date).isSame(moment(), 'day'));
  return currentArray.map(data =>
    <Expense key={data.key} handleDelete={ handleDelete } data={data} />);
};

const DailyExpenses = ({ dailyExpensesList, handleDelete }) => {
  return (
    <ul className='daily-expenses-list'>
      { getCurrentExpenses(dailyExpensesList, handleDelete) }
    </ul>
  );
};


export default DailyExpenses;
