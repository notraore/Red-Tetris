import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import renderer from 'react-test-renderer';

import { SoloComponent } from '../../src/client/src/components/MenuSubSection.js'
import { JoinComponent } from '../../src/client/src/components/MenuSubSection.js'
import { CreateComponent } from '../../src/client/src/components/MenuSubSection.js'
import { SettingsComponent } from '../../src/client/src/components/MenuSubSection.js'
import { styles } from '../../src/client/src/components/Popup.js'


describe("MenuSubSection SnapShot test",() => {
	test("SoloComponent Match SnapShot selected != 1", () => {
		const blockCmp = renderer.create(< SoloComponent selected={0} classes={styles} />).toJSON();
		expect(blockCmp).toMatchSnapshot();
	});
	test("SoloComponent Match SnapShot selected == 1", () => {
		const blockCmp = renderer.create(< SoloComponent selected={1} classes={styles} />).toJSON();
		expect(blockCmp).toMatchSnapshot();
	});
	test("CreateComponent Match SnapShot != 1", ()=> {
		const blockCmp = renderer.create(< CreateComponent roomName={'Nobila'} selected={0} classes={styles}/>).toJSON();
		expect(blockCmp).toMatchSnapshot();
	});
	test("CreateComponent Match SnapShot == 3", ()=> {
		const blockCmp = renderer.create(< CreateComponent roomName={'Nobila'} selected={3}classes={styles}/>).toJSON();
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
		const blockCmp = renderer.create(< JoinComponent roomName={'Nobila'} selected={0} classes={styles}/>).toJSON();	
		expect(blockCmp).toMatchSnapshot();
	});
	test("Join Match SnapShot == 2", () => {
		const blockCmp = renderer.create(< JoinComponent roomName={'Nobila'} selected={2} classes={styles}/>).toJSON();	
		expect(blockCmp).toMatchSnapshot();
	});
});

