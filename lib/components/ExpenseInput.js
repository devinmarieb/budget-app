import React from 'react';
import Input from './Input';
import Button from './Button';

export default class ExpenseInput extends React.Component {
  constructor() {
    super();
    this.state = {
      draftText: '',
      draftCost: '',
    }
  }

  updateCategory(value) {
    this.setState({ draftText: value })
  }

  updateCost(value) {
    this.setState({ draftCost: value })
  }

  handleSubmit() {
    this.props.handleChange(this.state.draftText, this.state.draftCost, this.props.timeFrame)
    this.setState({ draftText: '', draftCost: ''})
  }

render(){
  return(
    <section className='input-section'>
      <Input placeholder={this.props.category} type='text' handle={ this.updateCategory.bind(this) } value={ this.state.draftText } />
      <Input placeholder={this.props.categoryCost} type='number' handle={ this.updateCost.bind(this) } value={ this.state.draftCost } />
      <Button text={this.props.buttonText} handleClick={this.handleSubmit.bind(this)}  />
    </section>
    )
  }
}
