import React from 'react';
import { shallow } from 'enzyme';
import { canFit } from './canFit.js'
import renderer from 'react-test-renderer';

describe('canFit component', () => {
	test("Snapshot : canFit Component matches", () => {
		const canFitCmp = renderer.create(< canFit />).toJSON();
		expect(canFitCmp).toMatchSnapshot();
	});
})