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
                <span className='hello-user'> { user.displayName }, <span className='good-decisions'> today is your chance to make good financial decisions</span> </span>
                <img src={user.photoURL} className='user-image'/>
                <span className='quote'> { this.props.quote } </span>
              </p>
            :
             <button onClick={ () => signIn()}> Budget Away </button>
          }
        </section>

        <MonthTitle className='month-name' dateTitle={moment().format('MMMM')}/>
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

        <section className='monthly-section'>
          <h1 className='monthly-income'> monthly income: <span className='income-money'>${ monthlyIncome } </span></h1>
          <h1 className='balance-after-bills'> expendable income:<span className='spending-money'> ${ balanceAfterBills }</span> </h1>
          <MonthlyExpenses monthlyExpensesList={ monthlyExpenses } />
        </section>

        <section className='daily-section'>
          <MonthTitle className='day-name' dateTitle={moment().format('dddd Do')}/>
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
