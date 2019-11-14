import React from 'react';
import { shallow } from 'enzyme';
import { Block } from './Block.js'
import { colorTab } from './Block.js'
import { blockStyle } from './Block.js'
import renderer from 'react-test-renderer';
import { shadowBlockStyle } from './Block.js'

describe('Block Component', () => {
	test("Snapshot : Block Component matches", () => {
		const blockCmp = renderer.create(< Block />).toJSON();
		expect(blockCmp).toMatchSnapshot();
	});
});
