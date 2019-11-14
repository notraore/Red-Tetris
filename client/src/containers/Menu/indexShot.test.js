import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import renderer from 'react-test-renderer';

import { Menu } from './index.js'
import { GameStyle } from '../../styles/Game-style.js'

describe("index.js SnapShot test",() => {
	test("Menu component Match SnapShot", () => {
		// const blockCmp = renderer.create(< Menu props={GameStyle}/>).toJSON();	
		// expect(blockCmp).toMatchSnapshot();
	});
});
