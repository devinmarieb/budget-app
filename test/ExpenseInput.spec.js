import React from 'react'
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import sinon from 'sinon'

import ExpenseInput from '../lib/components/ExpenseInput'
import Input from '../lib/components/Input'
import Button from '../lib/components/Button'

import locus from 'locus'


describe('<ExpenseInput />', () => {

  it('renders as a <section>', () => {
    const wrapper = shallow(<ExpenseInput />)
    assert.equal(wrapper.type(), 'section');
  });

  it('renders two <Input /> components', () => {
    const wrapper = shallow(<ExpenseInput />)
    expect(wrapper.find(Input)).to.have.length(2);
  });

  it('renders one <Button /> components', () => {
    const wrapper = shallow(<ExpenseInput />)
    expect(wrapper.find(Button)).to.have.length(1);
  });

  it.skip('should update state on change', () => {
    const wrapper = mount(<ExpenseInput />)
    const inputField = wrapper.find('.expense-input-category')

     eval(locus);
    inputField.simulate('change', inputField.node.value = 'blah')
    expect(wrapper.state().draftText).to.equal('blah')
  });

});
