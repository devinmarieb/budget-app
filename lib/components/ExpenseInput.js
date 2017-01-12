import React, { Component } from 'react';
import Input from './Input';
import Button from './Button';

export default class ExpenseInput extends Component {
  constructor() {
    super();
    this.state = {
      draftText: '',
      draftCost: '',
    };
  }

  updateCategoryState(e) {
    this.setState({ draftText: e.target.value });
  }

  updateCostState(e) {
    this.setState({ draftCost: e.target.value });
  }

  handleSubmit() {
    const { draftText, draftCost } = this.state;
    const { timeFrame } = this.props;
    this.props.handleChange(draftText, draftCost, timeFrame);
    this.setState({ draftText: '', draftCost: '' });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && this.state.draftText !== '' && this.state.draftCost !== '') {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  render() {
    const { category, categoryCost, buttonText } = this.props;
    const { draftText, draftCost } = this.state;
    return (
      <section className='input-section'>
        <Input className='expense-input-category'
               value={ draftText }
               placeholder={ category } type='text'
               updateState={ e => this.updateCategoryState(e) }
               handleKeyPress= { e => this.handleKeyPress(e) }
               label='category input'/>
        <Input className= 'expense-input-cost'
               value={ draftCost }
               placeholder={ categoryCost }
               type='number'
               updateState={ e => this.updateCostState(e) }
               handleKeyPress= { e => this.handleKeyPress(e) }
               label='expense cost'/>
        <Button className='btn'
                text={ buttonText }
                disabled={ this.state.draftText === '' || this.state.draftCost === '' }
                handleClick={this.handleSubmit.bind(this)} />
      </section>
    );
  }
}
