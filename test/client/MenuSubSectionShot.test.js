import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import renderer from 'react-test-renderer';

import { SoloComponent } from '../../src/client/src/components/MenuSubSection.js'
import { JoinComponent } from '../../src/client/src/components/MenuSubSection.js'
import { CreateComponent } from '../../src/client/src/components/MenuSubSection.js'
import { SettingsComponent } from '../../src/client/src/components/MenuSubSection.js'
import { styles } from '../../src/client/src/components/Popup.js'

import Adapter from 'enzyme-adapter-react-16'
import { configure as configureEnzyme } from 'enzyme'

configureEnzyme({ adapter: new Adapter() })

const classes = styles();

describe("MenuSubSection SnapShot test",() => {
	test("SoloComponent Match SnapShot selected != 1", () => {
		const blockCmp = renderer.create(< SoloComponent selected={0} classes={classes} />).toJSON();
		expect(blockCmp).toMatchSnapshot();
	});
	test("SoloComponent Match SnapShot selected == 1", () => {
		const blockCmp = renderer.create(< SoloComponent selected={1} classes={classes} />).toJSON();
		expect(blockCmp).toMatchSnapshot();
	});
	test("CreateComponent Match SnapShot != 1", ()=> {
		const blockCmp = renderer.create(< CreateComponent roomName={'Nobila'} selected={0} classes={classes}/>).toJSON();
		expect(blockCmp).toMatchSnapshot();
	});
	test("CreateComponent Match SnapShot == 3", ()=> {
		const blockCmp = renderer.create(< CreateComponent roomName={'Nobila'} selected={3} classes={classes}/>).toJSON();
		expect(blockCmp).toMatchSnapshot();
	});
	test("SettingsComponent Match SnapShot != 4", () => {
		const blockCmp = renderer.create(< SettingsComponent selected={0}/>).toJSON();
		expect(blockCmp).toMatchSnapshot();
	});
	test("SettingsComponent Match SnapShot == 4", () => {
		const blockCmp = renderer.create(< SettingsComponent selelected={4}/>).toJSON();
		expect(blockCmp).toMatchSnapshot();
	});
	test("Join Match SnapShot =! 2", () => {
		const blockCmp = renderer.create(< JoinComponent roomName={'Nobila'} selected={0} classes={classes}/>).toJSON();	
		expect(blockCmp).toMatchSnapshot();
	});
	test("Join Match SnapShot == 2", () => {
		const blockCmp = renderer.create(< JoinComponent roomName={'Nobila'} selected={2} classes={classes}/>).toJSON();	
		expect(blockCmp).toMatchSnapshot();
	});
});

describe('Click : <JoinComponent />', () => {
	it('Click Simulation works ?', () => {
		const event = {
			target: { value: "NobilaRoom" }
  		};
		let handleChange = jest.fn();
		let redirect = jest.fn(null);
		const wrapper = shallow(<JoinComponent roomName={"Nobila"} redirect={redirect} handleChange={ handleChange } selected={ 1 } classes={ classes }  />);
		wrapper.find('input').simulate('change', event);
		expect(handleChange).toBeCalledTimes(0);

		wrapper.find('input').simulate('keydown', {keyCode: 13});

		wrapper.find('div').simulate('click');
		expect(redirect).toBeCalledTimes(1);
	});
});

describe('Click : <CreateComponent />', () => {
	it('Click Simulation works ?', () => {
		const event = {
			target: { value: "NobilaRoom" }
		};
		const eventBis = {
		target: { value: "NobilaRoom" }
		};
		let handleChange = jest.fn();
		let alert = jest.fn();
		let redirect = jest.fn(null);
		const wrapper = shallow(<CreateComponent roomName={"Nobila"} redirect={redirect} handleChange={ handleChange } selected={ 1 } classes={ classes } alert={alert} />);
		wrapper.find('input').simulate('change', event);
		expect(handleChange).toBeCalledTimes(0);

		wrapper.find('input').simulate('keydown', {keyCode: 13});

		wrapper.find('div').simulate('click');
		expect(redirect).toBeCalledWith("NobilaRoom");
	});
});

describe('Click : <SoloComponent />', () => {
	const pieces = ['J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J'];
	it('Click Simulation works ?', () => {
		const event = {
			type: 'START_GAME',
			nbPlayer: 1,
			pieces: pieces
  		};
		let dispatch = jest.fn();
		const wrapper = shallow(<SoloComponent roomName={"Nobila"} onClick={ dispatch } pieces={ pieces } selected={ 1 } classes={ classes } />);

		wrapper.find('div').simulate('click');
		expect(dispatch).toBeCalledTimes(0);
	});
});

// it('should call onChange prop', () => {
//   const onSearchMock = jest.fn();
//   const component = enzyme.shallow(<InputBox onSearch={onSearchMock} />);
//   component.find('input').simulate('change', event);
//   expect(onSearchMock).toBeCalledWith('the-value');
// });


