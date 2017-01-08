import React from 'react'
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import sinon from 'sinon'
import { stubMonthlyExpensesList } from './helpers/stubData'

import MonthlyExpenses from '../lib/components/MonthlyExpenses'

import locus from 'locus'

describe('<MonthlyExpenses />', () => {

  it('renders as a <section>', () => {
    const wrapper = shallow(<MonthlyExpenses monthlyExpensesList={stubMonthlyExpensesList}/>)
    assert.equal(wrapper.type(), 'section');
  });

  it('renders expenses from dailyExpensesList list', () => {
    const wrapper = shallow(<MonthlyExpenses monthlyExpensesList={stubMonthlyExpensesList}/>);
    const list = wrapper.find('.monthly-expenses-list-item');
    expect(list).to.have.length(3);
  });


});
