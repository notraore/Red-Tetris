import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { initialTetriState } from './initialState.js'

describe("initialState SnapShotTest", () => {
	test("Component Match initialTetrisState Snapshot", () => {
		const blockCmp = renderer.create(< initialTetriState />).toJSON();	
		expect(blockCmp).toMatchSnapshot();
	})
});
