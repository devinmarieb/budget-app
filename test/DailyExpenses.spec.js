import React from 'react'
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import sinon from 'sinon'
import { stubDailyExpensesList } from './helpers/stubData'

import DailyExpenses from '../lib/components/DailyExpenses'

import locus from 'locus'

describe('<DailyExpenses />', () => {

  it('renders as a <ul>', () => {
    const wrapper = shallow(<DailyExpenses dailyExpensesList={stubDailyExpensesList}/>)
    assert.equal(wrapper.type(), 'ul');
  });

  it('renders expenses from dailyExpensesList', () => {
    const wrapper = shallow(<DailyExpenses dailyExpensesList={stubDailyExpensesList}/>);
    const list = wrapper.find('.list-items');
    expect(list).to.have.length(3);
  });


});
