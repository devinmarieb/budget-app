import React from 'react';
import Input from './Input';
import Button from './Button';

export default class UserInput extends React.Component {
  constructor() {
    super();
    this.state = {
      draft: '',
    }
  }

  updateValue(value) {
    this.setState({ draft: value })
  }

  handleSubmit(value){
    this.props.handleChange(this.state.draft)
    this.setState({ draft: ''})
  }

render(){
  return(
    <section className='input-section'>
      <Input placeholder={this.props.placeholder} type='number' handle={ this.updateValue.bind(this) } value={ this.state.draft } />
      <Button text={this.props.buttonText} handleClick={this.handleSubmit.bind(this)}  />
    </section>
    )
  }
}
