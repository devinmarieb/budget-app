import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import moment from 'moment';

import MonthTitle from '../lib/components/MonthTitle'

describe('<MonthTitle />', () => {
  it('renders as a <aside>', () => {
    const wrapper = shallow(<MonthTitle />)
    assert.equal(wrapper.type(), 'aside');
  });

  it('displays current day of month', () => {
    let testDate = moment().format('dddd MMMM DDD')
    const wrapper = render(<MonthTitle />)
    let month = wrapper.find('.display-month')

    expect(wrapper.text()).to.equal(testDate);
  });



});
