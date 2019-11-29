import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16'
import { configure as configureEnzyme } from 'enzyme'

configureEnzyme({ adapter: new Adapter() })

import { OptionComponent } from '../../src/client/src/components/Option.js';
import { styles } from '../../src/client/src/components/OnlineListPopup.js';

const styleTmp = styles();

describe("Option Snapshot test", () => {
	test("OptionComponent render match the shot", () => {
		const blockCmp = renderer.create(<OptionComponent classes={ styleTmp } isSelected={true}/>).toJSON();
		expect(blockCmp).toMatchSnapshot();
	})
})

describe('Click : <OptionComponent />', () => {
	it('renders three is called components', () => {
		let select = jest.fn();
		let shuffle = jest.fn();
		const wrapper = shallow(<OptionComponent shuffle={shuffle} select={ select } selected={0} classes={ styleTmp }/>);
		wrapper.find('div').simulate('click');
		expect(select).toBeCalledTimes(1);
		wrapper.find('div').simulate('mouseEnter');
		expect(shuffle).toBeCalledTimes(1);
		
	});
});