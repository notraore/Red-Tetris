import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import renderer from 'react-test-renderer';

import { Popup } from '../../src/client/src/components/OnlineListPopup.js';
import { styles } from '../../src/client/src/components/OnlineListPopup.js';
import Adapter from 'enzyme-adapter-react-16'
import { configure as configureEnzyme } from 'enzyme'

configureEnzyme({ adapter: new Adapter() })

const stylesTmp = styles();
const usertmp = {
	username: "NobilaTest",
	id: "v34h9492wvkbh3wg3q"
};

describe("OnlineListPopup Snapshot test", () => {
	test("Popup render match the shot", () => {
		const blockCmp = renderer.create(< Popup classes={stylesTmp} />).toJSON();
		const blockCmpb = renderer.create(< Popup classes={stylesTmp} users={usertmp} />).toJSON();
		expect(blockCmp).toMatchSnapshot();
		expect(blockCmpb).toMatchSnapshot();
	})
})

describe('Click : <Popup />', () => {
	it('Click Simulation works ?', () => {
		let close = jest.fn(null);
		const wrapper = shallow(<Popup playerId={"username"} classes={ stylesTmp } users={ usertmp } close={ close } />);
		wrapper.find('button').simulate('click');
		expect(close).toBeCalledTimes(1);
	});
});
