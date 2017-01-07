import React, { Component } from 'react'
import moment from 'moment';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import MoneyQuotes, { randomQuote, Quote } from './MoneyQuotes';
import UserInput from './UserInput';
// import CustomBudget from './CustomBudget';
import Monthly from './moment';



export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      draft: '',
      monthlyIncome: '',
      monthlyExpenses: '',
      balanceAfterBills: '',
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));

    reference.on('value', (snapshot) => {
      this.setState({ monthlyIncome: snapshot.child(this.state.user.uid).val().monthlyIncome})
      this.setState({ balanceAfterBills: snapshot.child(this.state.user.uid).val().balanceAfterBills})

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

  updateExpenses(value) {
    let userRef = reference.child(this.state.user.uid);
    userRef.update({
      balanceAfterBills: value,
    });

    this.setState({monthlyExpenses: value, balanceAfterBills: this.state.monthlyIncome - value})

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
        <UserInput placeholder='monthly expenses' buttonText='Submit' className='monthly-expenses' handleChange={(value) => {this.updateExpenses(value)}}/>
        <section className='goal-section'>
          <h1 className='monthly-income'> This is how much you make a month { this.state.monthlyIncome } </h1>
          <h1 className='balance-after-bills'> This is your left over money after bills are paid { this.state.balanceAfterBills } </h1>
        </section>
        <section>
          <Monthly cost={this.state.cost} />
        </section>
      </div>
    )
  }
}
