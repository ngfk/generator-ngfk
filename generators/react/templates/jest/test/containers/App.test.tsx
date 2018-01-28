import { shallow } from 'enzyme';
import * as React from 'react';

import { App } from '../../src/containers/App';

describe('App', () => {
    it('render correctly', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toMatchSnapshot();
    });
});
