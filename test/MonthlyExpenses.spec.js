import React from 'react'
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import sinon from 'sinon'
import { stubMonthlyExpensesList } from './helpers/stubData'

import MonthlyExpenses from '../lib/components/MonthlyExpenses'

import locus from 'locus'

describe('<MonthlyExpenses />', () => {

  it('renders as a <ul>', () => {
    const wrapper = shallow(<MonthlyExpenses monthlyExpensesList={stubMonthlyExpensesList}/>)
    assert.equal(wrapper.type(), 'ul');
  });

  it('renders expenses from dailyExpensesList list', () => {
    const wrapper = shallow(<MonthlyExpenses monthlyExpensesList={stubMonthlyExpensesList}/>);
    const list = wrapper.find('.list-items');
    expect(list).to.have.length(3);
  });


});
