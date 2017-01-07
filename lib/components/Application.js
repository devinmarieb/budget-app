import React, { Component } from 'react'
import moment from 'moment';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import MoneyQuotes, { randomQuote, Quote } from './MoneyQuotes';
// import Month from './Month';
import Input from './Input';
import Button from './Button';
import UserInput from './UserInput';
// import CustomBudget from './CustomBudget';
import Monthly from './moment';



export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      draft: '',
      balanceAfterBills: '',
      monthlyIncome: '',

    }
  }

  componentDidMount() {
    reference.on('value', (snapshot) => {
      const recurringBills = snapshot.val() || {};
      // this.setState({
      //   activeUsers: map(budget, (val, key) => extend(val.user, { key })),
      // });
  });
  firebase.auth().onAuthStateChanged(user => this.setState({ user }));
}

  addTrip() {
    const { user, monthlyIncome, recurringBills } = this.state;
    reference.push({
      user: pick(user, 'displayName', 'email', 'uid', 'photoURL'),
      content: recurringBills,

      createdAt: Date.now()
    });
    this.setState({ balanceAfterBills:'$'+ (draft - recurringBills), monthlyIncome: '$ '+ draft })
  }

  updateIncome(value){
    this.setState({monthlyIncome: value})
    // console.log(this.state.monthlyIncome);
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
        <section className='goal-section'>
          <h1 className='monthly-income'> { this.state.monthlyIncome } </h1>
          <h1 className='balance-after-bills'> { this.state.balanceAfterBills } </h1>
        </section>
        <section>
          <Monthly cost={this.state.cost} />
        </section>
      </div>
    )
  }
}
