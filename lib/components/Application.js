import React, { Component } from 'react';
import moment from 'moment';
import firebase, { reference, logIn, logOut } from '../firebase';
import { pick, map, extend } from 'lodash';
import MoneyQuotes, { randomQuote, Quote } from './MoneyQuotes';
import UserInput from './UserInput';
import DateTitle from './DateTitle';
import ExpenseInput from './ExpenseInput';
import MonthlyExpenses from './MonthlyExpenses';
import DailyExpenses from './DailyExpenses';
import DailySpendingHabits from './DailySpendingHabits';
import MonthlySpendingHabits from './MonthlySpendingHabits';
import Button from './Button';


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
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));

    reference.on('value', (snapshot) => {
      const storedMonthlyIncome = snapshot.child(this.state.user.uid).val().monthlyIncome;
      const storedBalanceAfterBills = snapshot.child(this.state.user.uid).val().balanceAfterBills;
      const storedDailyExpenses = snapshot.child(this.state.user.uid).val().dailyExpenses;
      const storedMonthlyExpenses = snapshot.child(this.state.user.uid).val().monthlyExpenses;

      if (storedMonthlyIncome) {
        this.setState({ monthlyIncome: storedMonthlyIncome });
      }

      if (storedBalanceAfterBills) {
        this.setState({ balanceAfterBills: storedBalanceAfterBills });
      }

      this.setState({ dailyExpenses: map(storedDailyExpenses, (val, key) =>
        extend(val, { key })) });
      this.setState({ monthlyExpenses: map(storedMonthlyExpenses, (val, key) =>
        extend(val, { key })) });
    });
  }

  clearMonthlyMoney() {
    const { user } = this.state;
    const userRef = reference.child(user.uid);
    this.setState({ monthlyIncome: 0, balanceAfterBills: 0 });
    userRef.update({
      monthlyIncome: 0,
      balanceAfterBills: 0,
    });
  }

  updateIncome(value) {
    const { user, monthlyIncome, balanceAfterBills } = this.state;
    const userRef = reference.child(user.uid);

    userRef.update({
      monthlyIncome: monthlyIncome + parseInt(value, 10),
      balanceAfterBills: balanceAfterBills + parseInt(value, 10),
    });
  }

  updateExpenses(draftText, draftCost, timeFrame) {
    let balance;
    const { balanceAfterBills, monthlyIncome } = this.state;
    const userRef = reference.child(this.state.user.uid);
    const expensesRef = userRef.child(`${timeFrame}Expenses`);

    if (balanceAfterBills === 0) {
      balance = monthlyIncome - draftCost;
    } else {
      balance = balanceAfterBills - draftCost;
    }

    userRef.update({
      balanceAfterBills: balance,
    });

    expensesRef.push({
      category: draftText,
      cost: draftCost,
      date: Date.now(),
    });
    this.setState({ balanceAfterBills: balance });
  }

  handleDelete(e, key, cost) {
    const userRef = reference.child(this.state.user.uid);
    const dailyExpensesRef = userRef.child('dailyExpenses');
    const monthlyExpensesRef = userRef.child('monthlyExpenses');
    dailyExpensesRef.child(key).remove();
    monthlyExpensesRef.child(key).remove();

    let balance = this.state.balanceAfterBills;
    balance += parseInt(cost, 10);
    userRef.update({
      balanceAfterBills: balance,
    });
  }

  render() {
    const { user, monthlyIncome, monthlyExpenses, balanceAfterBills, dailyExpenses } = this.state;
    return (
      <div>

        <section className="user-login">
          {user
            ?
              <section>
                <span className='hello-user'> { user.displayName }, <span className='good-decisions'> today is your chance to make good financial decisions</span> </span>
                <aside className='auth'>
                  <img src={user.photoURL} className='user-image'/>
                  <button className='btn btn-log-out' onClick={ () => logOut()}> Log Out </button>
                </aside>
                <span className='quote'> { this.props.quote } </span>

              </section>
            :
             <section className='header'>
               <h1 className='title'> SimpleBudget </h1>
               <button className='btn btn-log-in' onClick={ () => logIn()}> Log In </button>
             </section>
          }
        </section>

        { user &&
          <section>
            <aside className='monthly-section'>
              <h1 className='monthly-income'> monthly income: <span className='income-money'>${ monthlyIncome } </span></h1>
              <h1 className='balance-after-bills'> expendable income:<span className='spending-money'> ${ balanceAfterBills }</span> </h1>
              <Button className='btn new-month'
                      text='New Month'
                      handleClick={ this.clearMonthlyMoney.bind(this) } />
            </aside>
            <section className='left-side'>

            <DateTitle className='month-name'
                       content={moment().format('MMMM')}/>
            <UserInput placeholder='add monthly income'
                       buttonText='Submit'
                       className='monthly-income'
                       handleChange={(value) => { this.updateIncome(value); }}/>

            <ExpenseInput category='monthly category'
                          categoryCost='cost'
                          buttonText='Submit'
                          timeFrame='monthly'
                          className='monthly-expenses'
                          handleChange={(draftText, draftCost, timeFrame) => {
                            this.updateExpenses(draftText, draftCost, timeFrame);
                          }}/>

            <MonthlyExpenses handleDelete={ this.handleDelete.bind(this) }
                             monthlyExpensesList={ monthlyExpenses } />
            <MonthlySpendingHabits monthlyExpensesList={ monthlyExpenses } />
          </section>
          <section className='right-side'>
            <aside className='daily-section'>
              <DateTitle className='day-name'
                         content={moment().format('dddd Do')}/>
              <ExpenseInput category='daily category'
                            categoryCost='cost'
                            buttonText='Submit'
                            timeFrame='daily'
                            className='daily-expenses'
                            handleChange={(draftText, draftCost, timeFrame) => {
                              this.updateExpenses(draftText, draftCost, timeFrame);
                            }}/>
              <DailyExpenses handleDelete={ this.handleDelete.bind(this) }
                             dailyExpensesList={ dailyExpenses } />
              <DailySpendingHabits handleDelete={ this.handleDelete.bind(this) }
                                   dailyExpensesList={ dailyExpenses } />
            </aside>
          </section>
        </section>

      }

      </div>
    );
  }
}
