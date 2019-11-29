import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import {Popup} from '../../src/client/src/components/Popup.js'
import {styles} from '../../src/client/src/components/Popup.js'

import Adapter from 'enzyme-adapter-react-16'
import { configure as configureEnzyme } from 'enzyme'

configureEnzyme({ adapter: new Adapter() })

const classes = styles();

const infor = [{
	title: "Nobila est present",
	description: "Une partie de tetris tres classique"
}];

describe('<Popup />', () => {
	it('renders three is called components', () => {
		let closePopup = jest.fn();
		const wrapper = shallow(<Popup closePopup={closePopup} classes={ classes } infos={ infor }/>);
		wrapper.find('button').simulate('click');
		expect(closePopup).toBeCalledTimes(1);
	});
});