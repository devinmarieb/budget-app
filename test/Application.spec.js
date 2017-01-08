import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert } from 'chai';

import Application from '../lib/components/Application'
import Button from '../lib/components/Button'
import DailyExpenses from '../lib/components/DailyExpenses'
import Input from '../lib/components/Input'
import MoneyQuotes from '../lib/components/MoneyQuotes'
import MonthyExpenses from '../lib/components/MonthyExpenses'
import MonthTitle from '../lib/components/MonthTitle'
import UserInput from '../lib/components/UserInput'

import Application from '../lib/components/Application';

describe('Application', () => {

  it('renders as a <div>', () => {
    const wrapper = shallow(<Application />)
    assert.equal(wrapper.type(), 'div');
  });

});
