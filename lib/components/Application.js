import React, { Component } from 'react'
import moment from 'moment';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import MoneyQuotes, { randomQuote, Quote } from './MoneyQuotes';
import UserInput from './UserInput';
import Moment from './moment';
import ExpenseInput from './ExpenseInput';
import MonthlyExpenses from './MonthlyExpenses';


export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      draft: '',
      monthlyIncome: null,
      monthlyExpenses: [],
      balanceAfterBills: null,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));

    reference.on('value', (snapshot) => {
      let storedMonthlyIncome = snapshot.child(this.state.user.uid).val().monthlyIncome;
      let storedBalanceAfterBills = snapshot.child(this.state.user.uid).val().balanceAfterBills;
      let storedMonthlyExpenses = snapshot.child(this.state.user.uid).val().expenses;


      if (storedMonthlyIncome) {
        this.setState({ monthlyIncome: storedMonthlyIncome })
      }

      if (storedBalanceAfterBills) {
        this.setState({ balanceAfterBills: storedBalanceAfterBills })
      }

      if (storedMonthlyExpenses) {
        this.setState({ monthlyExpenses: map(storedMonthlyExpenses, (val, key) => extend(val, { key } ))});
      }


    });
  }

  updateBalance() {
    const { user, monthlyIncome, recurringBills, monthlyExpenses } = this.state;
    userRef.push({
      user: pick(user, 'displayName', 'email', 'uid', 'photoURL'),
      content: recurringBills,
      createdAt: Date.now()
    });
  }

  updateIncome(value) {
    let userRef = reference.child(this.state.user.uid);

    userRef.update({
      monthlyIncome: value,
    });

    this.setState({monthlyIncome: value})
  }

  updateExpenses(draftText, draftCost) {
    let balance;
    let userRef = reference.child(this.state.user.uid);

    if(this.state.balanceAfterBills === null) {
       balance = this.state.monthlyIncome - draftCost
       userRef.update({
         balanceAfterBills: balance
       });
    } else {
      balance = this.state.balanceAfterBills - draftCost
      userRef.update({
        balanceAfterBills: balance
      });

     let expensesRef = userRef.child('expenses');
     expensesRef.push({ category: draftText,  cost: draftCost, date: Date.now() })

    //  this.setState({monthlyExpenses: })

    }




    this.setState({balanceAfterBills: balance})
  }

  render() {
    const { user } = this.state;
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
        <UserInput placeholder='monthly income' buttonText='Submit' className='monthly-income' handleChange={(value) => {this.updateIncome(value)}}/>
        <ExpenseInput category='category' categoryCost='cost' buttonText='Submit' className='monthly-expenses' handleChange={(draftText, draftCost) => {this.updateExpenses(draftText, draftCost)}}/>
        <section className='goal-section'>
          <h1 className='monthly-income'> monthly income: { this.state.monthlyIncome } </h1>
          <MonthlyExpenses monthlyExpensesList={this.state.monthlyExpenses} />
          <h1 className='balance-after-bills'> expendable income: { this.state.balanceAfterBills } </h1>
        </section>
        <section>
          <Moment />
          <p> coffee: $10.00 </p>
          <p> red bull: $5.00 </p>
          <p> breakfast sandwich: $7.00 </p>
        </section>
      </div>
    )
  }
}
