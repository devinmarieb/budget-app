import React from 'react'
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import sinon from 'sinon'
import { stubDailyExpensesList } from './helpers/stubData'

import DailyExpenses from '../lib/components/DailyExpenses'

import locus from 'locus'

describe('<DailyExpenses />', () => {

  it('renders as a <section>', () => {
    const wrapper = shallow(<DailyExpenses dailyExpensesList={stubDailyExpensesList}/>)
    assert.equal(wrapper.type(), 'section');
  });

  it('renders expenses from dailyExpensesList list', () => {
    const wrapper = shallow(<DailyExpenses dailyExpensesList={stubDailyExpensesList}/>);
    const list = wrapper.find('.daily-expenses-list-item');
    expect(list).to.have.length(3);
  });


});
