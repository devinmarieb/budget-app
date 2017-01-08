import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';

import MonthlyExpenses from '../lib/components/MonthlyExpenses'
import Application from '../lib/components/Application'
import Button from '../lib/components/Button'
import DailyExpenses from '../lib/components/DailyExpenses'
import Input from '../lib/components/Input'
import MoneyQuotes from '../lib/components/MoneyQuotes'
import ExpenseInput from '../lib/components/ExpenseInput'
import MonthTitle from '../lib/components/MonthTitle'
import UserInput from '../lib/components/UserInput'

describe('<Application />', () => {

  it('renders as a <div>', () => {
    const wrapper = shallow(<Application />)
    assert.equal(wrapper.type(), 'div');
  });

  it('should render one <UserInput /> component', () => {
    const wrapper = shallow(<Application />)
    expect(wrapper.find(UserInput)).to.have.length(1);
  });

  it('should render two <ExpenseInput /> components', () => {
    const wrapper = shallow(<Application />);
    expect(wrapper.find(ExpenseInput)).to.have.length(2);
  });

  it('should render one <DailyExpenses /> component', () => {
    const wrapper = shallow(<Application />);
    expect(wrapper.find(DailyExpenses)).to.have.length(1);
  });

  it('should render one <MonthlyExpenses /> component', () => {
    const wrapper = mount(<Application />);
    expect(wrapper.find(MonthlyExpenses)).to.have.length(1);
  });







});
