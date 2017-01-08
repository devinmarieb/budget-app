import React, { Component } from 'react';
import Input from './Input';
import Button from './Button';

export default class UserInput extends Component {
  constructor() {
    super();
    this.state = {
      draft: '',
    }
  }

  updateValue(value) {
    this.setState({ draft: value })
  }

  handleSubmit(value) {
    this.props.handleChange(this.state.draft)
    this.setState({ draft: ''})
  }

render() {
  let { placeholder, buttonText } = this.props;
  return(
    <section className='input-section'>
      <Input className='user-input-field' placeholder={ placeholder } type='number' handle={ this.updateValue.bind(this) } value={ this.state.draft } />
      <Button className='user-input-button' text={ buttonText } handleClick={this.handleSubmit.bind(this)}  />
    </section>
    )
  }
}
