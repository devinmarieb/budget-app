import React from 'react';
import moment from 'moment';
import Button from './Button'





export default class Month extends React.Component {

  monthDays (year, month) {
    let displayMonth = [];
    const days = ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat']
    var date = new Date(year, month-1, 1)
    while(date.getMonth() === month-1) {
      displayMonth.push(date.getDate() +' ' + days[date.getDay()] + ':')
      date.setDate(date.getDate()+1)
    }
    return displayMonth
  }

  render() {
    let month = moment().format('M');
    let year = moment().format('YYYY');

    return(
      <section>
        <ul>
          <li> { this.monthDays(year, month)[0] } </li>
        </ul>
      </section>
    )
  }

}
