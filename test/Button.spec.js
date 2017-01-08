import React from 'react'
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import sinon from 'sinon'

import Button from '../lib/components/Button'
import locus from 'locus'

describe('<Button />', () => {

  it('renders as a <button>', () => {
    const wrapper = shallow(<Button />)
    assert.equal(wrapper.type(), 'button');
  });

  it('should call handleClick on onClick', () => {
    const handleClick = sinon.spy()
    const wrapper = mount(<Button className='user-input-button' handleClick={ handleClick } />)
    // console.log(wrapper.debug());
    expect(handleClick.calledOnce).to.equal(false)
    wrapper.find('.user-input-button').simulate('click')
    expect(handleClick.calledOnce).to.equal(true)
  })

  it('should have passed in prop for text', () => {
    const wrapper = mount(<Button text='Submit' />)
    expect(wrapper.props().text).to.equal('Submit');
  })

  it('should have passed in prop for className', () => {
    const wrapper = mount(<Button className='btn' />)
    expect(wrapper.props().className).to.equal('btn');
  })





});
