import React, { Component } from 'react'
import moment from 'moment';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import MoneyQuotes, { randomQuote, Quote } from './MoneyQuotes';
import UserInput from './UserInput';
import MonthTitle from './MonthTitle';
import ExpenseInput from './ExpenseInput';
import MonthlyExpenses from './MonthlyExpenses';
import DailyExpenses from './DailyExpenses';


export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      draft: '',
      monthlyIncome: 0,
      monthlyExpenses: [],
      dailyExpenses: [],
      balanceAfterBills: 0,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));

    reference.on('value', (snapshot) => {
      let storedMonthlyIncome = snapshot.child(this.state.user.uid).val().monthlyIncome;
      let storedBalanceAfterBills = snapshot.child(this.state.user.uid).val().balanceAfterBills;
      let storedDailyExpenses = snapshot.child(this.state.user.uid).val().dailyExpenses;
      let storedMonthlyExpenses = snapshot.child(this.state.user.uid).val().monthlyExpenses;

      if (storedMonthlyIncome) {
        this.setState({ monthlyIncome: storedMonthlyIncome })
      }

      if (storedBalanceAfterBills) {
        this.setState({ balanceAfterBills: storedBalanceAfterBills })
      }

      if (storedDailyExpenses) {
        this.setState({ dailyExpenses: map(storedDailyExpenses, (val, key) => extend(val, { key } ))});
      }

      if (storedMonthlyExpenses) {
        this.setState({ monthlyExpenses: map(storedMonthlyExpenses, (val, key) => extend(val, { key } ))});
      }
    });
  }

  updateIncome(value) {
    let { user, monthlyIncome, balanceAfterBills } = this.state;
    let userRef = reference.child(user.uid);

    userRef.update({
      monthlyIncome: monthlyIncome + parseInt(value),
      balanceAfterBills: balanceAfterBills + parseInt(value)
    });
  }

  updateExpenses(draftText, draftCost, timeFrame) {
    let balance;
    let { balanceAfterBills, monthlyIncome } = this.state;
    let userRef = reference.child(this.state.user.uid);
    let expensesRef = userRef.child(timeFrame + 'Expenses');

    if(balanceAfterBills === 0) {
       balance = monthlyIncome - draftCost
    } else {
      balance = balanceAfterBills - draftCost
    }

    userRef.update({
      balanceAfterBills: balance
    });

    expensesRef.push({
      category: draftText,
      cost: draftCost,
      date: Date.now()
    })
    this.setState({balanceAfterBills: balance})
  }

  render() {
    const { user, monthlyIncome, monthlyExpenses, balanceAfterBills, dailyExpenses } = this.state;
    return (
      <div>

        <section className="user-login">
          {user
            ?
              <p>
                <span className='quote'> { this.props.quote } </span>
                <span className='hello-user'> Hello { user.displayName } </span>
                <img src={user.photoURL} className='user-image'/>
              </p>
            :
             <button onClick={ () => signIn()}> Budget Away </button>
          }
        </section>

        <UserInput placeholder='add monthly income'
                   buttonText='Submit'
                   className='monthly-income'
                   handleChange={(value) => {this.updateIncome(value)}}/>

        <ExpenseInput category='category'
                      categoryCost='cost'
                      buttonText='Submit'
                      timeFrame='monthly'
                      className='monthly-expenses'
                      handleChange={(draftText, draftCost, timeFrame) => {this.updateExpenses(draftText, draftCost, timeFrame)}}/>

        <section className='goal-section'>
          <h1 className='monthly-income'> monthly income: ${ monthlyIncome } </h1>
          <MonthlyExpenses monthlyExpensesList={ monthlyExpenses } />
          <h1 className='balance-after-bills'> expendable income: ${ balanceAfterBills } </h1>
        </section>

        <section className='goal-section'>
          <MonthTitle />
          <ExpenseInput category='category'
                        categoryCost='cost'
                        buttonText='Submit'
                        timeFrame='daily'
                        className='daily-expenses'
                        handleChange={(draftText, draftCost, timeFrame) => {this.updateExpenses(draftText, draftCost, timeFrame)}}/>
          <DailyExpenses dailyExpensesList={ dailyExpenses } />
        </section>

      </div>
    )
  }
}
