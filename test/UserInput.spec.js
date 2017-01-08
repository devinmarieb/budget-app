import React from 'react'
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import sinon from 'sinon'

import UserInput from '../lib/components/UserInput'
import Input from '../lib/components/Input'
import Button from '../lib/components/Button'

import locus from 'locus'


describe('<UserInput />', () => {

  it('renders as a <section>', () => {
    const wrapper = shallow(<UserInput />)
    assert.equal(wrapper.type(), 'section');
  });

  it('renders one <Input /> component', () => {
    const wrapper = shallow(<UserInput />)
    expect(wrapper.find(Input)).to.have.length(1);
  });

  it('renders one <Button /> components', () => {
    const wrapper = shallow(<UserInput />)
    expect(wrapper.find(Button)).to.have.length(1);
  });

  it('should update state on change', () => {
    const wrapper = mount(<UserInput />)
    const inputField = wrapper.find('input')
    inputField.simulate('change', inputField.node.value = 'blah')
    expect(wrapper.state().draft).to.equal('blah')
  });

});
