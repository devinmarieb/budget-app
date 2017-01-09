import React, { Component } from 'react';
import Input from './Input';
import Button from './Button';

export default class UserInput extends Component {
  constructor() {
    super();
    this.state = {
      draft: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateState(e) {
    this.setState({ draft: e.target.value })
  }

  handleSubmit() {
    this.props.handleChange(this.state.draft)
    this.setState({ draft: ''})
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSubmit();
    }
  }



render() {
  let { placeholder, buttonText } = this.props;
  return(
    <section className='input-section'>
      <Input className='user-input-field'
             type='number'
             value={ this.state.draft }
             placeholder={ placeholder }
             updateState={ e => this.updateState(e) }
             handleKeyPress={ e => this.handleKeyPress(e) } />
      <Button className='user-input-button'
              text={ buttonText }
              disabled={ this.state.draft === '' }
              handleClick={ this.handleSubmit.bind(this) }  />
    </section>
    )
  }
}
