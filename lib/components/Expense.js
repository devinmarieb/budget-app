import React from 'react'
import Button from './Button'

export default class Expense extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <li className='list-items'>
        <Button
          className='btn-delete'
          text=''
          handleClick={ e => this.props.handleDelete(e, this.props.data.key, this.props.data.cost) }
        />
          {this.props.data.category}: <span className='monthly-costs'>
                                        ${this.props.data.cost}
                                      </span>
      </li>

    );
  }
}

// { moment(data.date).format('LT')}
