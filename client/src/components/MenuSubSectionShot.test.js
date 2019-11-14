import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import renderer from 'react-test-renderer';

import { SoloComponent } from './MenuSubSection.js'
import { JoinComponent } from './MenuSubSection.js'
import { CreateComponent } from './MenuSubSection.js'
import { SettingsComponent } from './MenuSubSection.js'
import { GameStyle } from '../styles/Game-style.js'


describe("MenuSubSection SnapShot test",() => {
	test("SoloComponent Match SnapShot", () => {
		const blockCmp = renderer.create(< SoloComponent classes={GameStyle} />).toJSON();	
		expect(blockCmp).toMatchSnapshot();
	});
	test("Join Match SnapShot", () => {
		const blockCmp = renderer.create(< JoinComponent classes={GameStyle}/>).toJSON();	
		expect(blockCmp).toMatchSnapshot();
	});
	test("CreateComponent Match SnapShot", ()=> {
		const blockCmp = renderer.create(< CreateComponent classes={GameStyle}/>).toJSON();	
		expect(blockCmp).toMatchSnapshot();
	});
	test("SettingsComponent Match SnapShot", () => {
		const blockCmp = renderer.create(< SettingsComponent/>).toJSON();
		expect(blockCmp).toMatchSnapshot();
	});
});
