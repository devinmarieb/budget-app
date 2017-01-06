import React, { Component } from 'react'
import moment from 'moment';
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import MoneyQuotes, { randomQuote, Quote } from './MoneyQuotes';
// import Month from './Month';
import Input from './Input';
import Button from './Button';
import Monthly from './moment';


export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      budget: [],
      vacationLocation: '',
      vacationCost: '',
      goalVacation: null,
      goalCost: null,
      startingDollars: 0,
      cost: 0,
    }
  }

  componentDidMount() {
    reference.on('value', (snapshot) => {
      const vacationCost = snapshot.val() || {};
      // this.setState({
      //   activeUsers: map(budget, (val, key) => extend(val.user, { key })),
      // });
  });
  firebase.auth().onAuthStateChanged(user => this.setState({ user }));
}

  addTrip() {
    const { user, vacationLocation, vacationCost } = this.state;
    reference.push({
      user: pick(user, 'displayName', 'email', 'uid', 'photoURL'),
      content: vacationCost,
      createdAt: Date.now()
    });
    this.setState({ goalVacation: vacationLocation, goalCost: '$ '+ vacationCost +'.00' })
  }

  location(value) {
    this.setState({ vacationLocation: value })
  }

  cost(value) {
    this.setState({ vacationCost: parseInt(value) })
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
        <section className='input-section'>
          <Input title='dream vacation location' type='string' handle={ this.location.bind(this) } value={ this.state.vacationLocation } />
          <Input title='trip cost' type='number' handle={ this.cost.bind(this) } value={ this.state.vacationCost } />
          <Button title='Enter' handle={ this.addTrip.bind(this) } />
        </section>
        <section className='goal-section'>
          <h1 className='goal-vacation'> { this.state.goalVacation } </h1>
          <h1 className='goal-cost'> { this.state.goalCost } </h1>
          <h1 className='starting-dollars'> increase your savings $ { this.state.startingDollars }.00 </h1>
        </section>
        <section>
          <Monthly cost={this.state.cost} />
        </section>
      </div>
    )
  }
}
