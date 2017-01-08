import React from 'react'
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import sinon from 'sinon'

import Input from '../lib/components/Input'

import locus from 'locus'


describe('<Input />', () => {

  it('renders as a <input>', () => {
    const wrapper = shallow(<Input />)
    assert.equal(wrapper.type(), 'input');
  });

  it('should call handle on change', () => {
    const onInputChange = sinon.spy()
    const wrapper = mount(<Input handle={ onInputChange } />)
    expect(onInputChange.calledOnce).to.equal(false)
    wrapper.find('input').simulate('change')
    expect(onInputChange.calledOnce).to.equal(true)
  })

  it('should have passed in prop for type', () => {
    const wrapper = shallow(<Input type='text' />)
    expect(wrapper.props().type).to.equal('text');

  })

  it('should have passed in prop for placeholder', () => {
    const wrapper = shallow(<Input placeholder='type stuff here' />)
    expect(wrapper.props().placeholder).to.equal('type stuff here');

  })




});
