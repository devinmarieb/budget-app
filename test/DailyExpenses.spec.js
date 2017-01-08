import React from 'react'
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import sinon from 'sinon'
import { mockDailyExpensesList } from './helpers/mockData'

import DailyExpenses from '../lib/components/DailyExpenses'
// import Input from '../lib/components/Input'
// import Button from '../lib/components/Button'

import locus from 'locus'


describe('<DailyExpenses />', () => {

  it.skip('renders as a <ul>', () => {
    const wrapper = shallow(<DailyExpenses dailyExpensesList={mockDailyExpensesList}/>)
    console.log(wrapper).debug();
    assert.equal(wrapper.type(), 'ul');
  });




});
