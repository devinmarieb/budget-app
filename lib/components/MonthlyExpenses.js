 import React from 'react'
import moment from 'moment'
import Expense from './Expense'

 const getCurrentExpenses = (monthlyExpensesList, handleDelete) => {
   const currentArray = monthlyExpensesList.filter(data => moment(data.date).isSame(moment(), 'month'));
   return currentArray.map(data =>
    <Expense key={data.key} handleDelete={ handleDelete } data={data} />);
 };

 const MonthlyExpenses = ({ monthlyExpensesList, handleDelete }) => {
   return (
    <ul className='monthly-expenses-list'>
      { getCurrentExpenses(monthlyExpensesList, handleDelete) }
    </ul>
   );
 };


 export default MonthlyExpenses;
