import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import moment from 'moment';

import DateTitle from '../lib/components/DateTitle'

describe('<DateTitle />', () => {
  it('renders as a <aside>', () => {
    const wrapper = shallow(<DateTitle />)
    assert.equal(wrapper.type(), 'aside');
  });

  it('renders date as passed in by "content" prop', () => {
    let testDate = moment().format('dddd MMMM DDD')
    const wrapper = render(<DateTitle className='date' content={testDate}/>)
    let month = wrapper.find('.lol')

    expect(wrapper.text()).to.equal(testDate);
  });

  it('should have passed in prop for content', () => {
    const wrapper = render(<DateTitle content='stuff' />)
    let date = wrapper.find('h3');
    expect(date.text()).to.equal('stuff');
  })

});
