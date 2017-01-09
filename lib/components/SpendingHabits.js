import React, { Component } from 'react';
import Input from './Input';

export default class SpendingHabits extends Component {
  render() {
    return(
      <aside className='date-picker'>
      <Input type='date' />
      </aside>
    )
  }
}
