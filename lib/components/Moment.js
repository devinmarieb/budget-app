import React from 'react';
import moment from 'moment';
import Month from './Month';
import Button from './Button'

export default class Monthly extends React.Component {
  constructor() {
    super();
    this.state = {
      month: moment().format('MMMM')
    }
  }

  render() {
    let cost = this.props.cost
    return(
      <section>
      <aside className='month-name-section'>
        <Button className='previous-month' title='<' />
        <h3 className='display-month'> { this.state.month } </h3>
        <Button className='next-month' title='>' />
      </aside>
    <aside>
      <p> Daily Costs </p>
      <Month  cost={ cost }/>
    </aside>
    </section>
    )
  }
}
