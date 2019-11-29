import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import renderer from 'react-test-renderer';

import { Popup } from "../../src/client/src/components/Popup.js";
import { styles } from '../../src/client/src/components/Popup.js'


describe("Popup Component test", () => {
	const infor = [{
	title: "Nobila est present",
	description: "Une partie de tetris tres classique"
	}];
	test("Popup component match Snapshot", () => {
		const blockCmp = renderer.create(< Popup classes={styles} infos={infor} />).toJSON();	
		expect(blockCmp).toMatchSnapshot();
	})
})