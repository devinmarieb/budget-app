import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import MoneyQuotes, { randomQuote } from './MoneyQuotes';
import Input from './Input';
import Button from './Button';


export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      activeUsers: [],
      budget: [],
      vacationLocation: '',
      vacationCost: '',
    }
  }

  componentDidMount() {
    reference.on('value', (snapshot) => {
      const budget = snapshot.val() || {};
      this.setState({
        activeUsers: map(budget, (val, key) => extend(val.user, { key })),
      });
  });
  firebase.auth().onAuthStateChanged(user => this.setState({ user }));
}

  // addTrip() {
  //   const user = this.state;
  //   reference.push({
  //     user: pick(user, 'displayName', 'email', 'uid', 'photoURL'),
  //     content: this.state.vacationLocation
  //   });
  // }

  location(value) {
    this.setState({ vacationLocation: value })
  }

  cost(value) {
    this.setState({ vacationCost: parseInt(value) })
  }

  addTrip(){
    console.log('hi')
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <section className="user-login">
          {user
            ?
              <p>
                <span className='quote'> { randomQuote() } </span>
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
      </div>
    )
  }
}
