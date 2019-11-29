import React from 'react';
import { shallow } from 'enzyme';
import { Block } from '../../src/client/src/components/Block.js'
import { colorTab } from '../../src/client/src/components/Block.js'
import { blockStyle } from '../../src/client/src/components/Block.js'
import renderer from 'react-test-renderer';
import { shadowBlockStyle } from '../../src/client/src/components/Block.js'

describe('Block Component', () => {
	test("Snapshot : Block Component matches", () => {
		const blockCmpa = renderer.create(< Block transparent={false} shadow={false}/>).toJSON();
		const blockCmpb = renderer.create(< Block transparent={false} shadow={true}/>).toJSON();
		const blockCmpc = renderer.create(< Block transparent={true} shadow={true}/>).toJSON();
		const blockCmpd = renderer.create(< Block empty={true} transparent={true} shadow={true}/>).toJSON();
		const blockCmpe = renderer.create(< Block empty={true} transparent={true} shadow={true}/>).toJSON();
		const blockCmpf = renderer.create(< Block empty={true} transparent={false} shadow={false}/>).toJSON();
		const blockCmpg = renderer.create(< Block empty={false} transparent={true} shadow={true}/>).toJSON();
		const blockCmph = renderer.create(< Block empty={true} transparent={false} shadow={true}/>).toJSON();
		const blockCmpi = renderer.create(< Block empty={true} transparent={true} shadow={false}/>).toJSON();
		const blockCmpj = renderer.create(< Block empty={false} transparent={false} shadow={true}/>).toJSON();
		expect(blockCmpa).toMatchSnapshot();
		expect(blockCmpb).toMatchSnapshot();
		expect(blockCmpc).toMatchSnapshot();
		expect(blockCmpd).toMatchSnapshot();
		expect(blockCmpe).toMatchSnapshot();
		expect(blockCmpf).toMatchSnapshot();
		expect(blockCmpg).toMatchSnapshot();
		expect(blockCmph).toMatchSnapshot();
		expect(blockCmpi).toMatchSnapshot();
		expect(blockCmpj).toMatchSnapshot();
	});
});
