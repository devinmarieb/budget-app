import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';
import MoneyQuotes, { randomQuote } from './MoneyQuotes';

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  loginDisplay() {
    reference.push({
      user: pick(user, 'displayName', 'email', 'uid', 'photoURL'),
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="user-login">
        { this.loginDisplay.bind(this) }
        {user ? <p> <span className='quote'>{randomQuote()}</span> <span className='hello-user'> Hello { user.displayName } <img src={user.photoURL} className='user-image'/> </span> </p>
          : <button onClick={ () => signIn()}> Budget Away </button> }
      </div>
    )
  }
}
