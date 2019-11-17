import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { colorTab } from '../Block.js'
import { blockStyle } from '../Block.js'
import { shadowBlockStyle } from '../Block.js'
import { Block } from '../Block.js'

describe('Game propriety 100%', () => {
	test("Color tab contains colors", () => {
		expect(colorTab).includes('red');
		expect(colorTab).includes('yellow');
		expect(colorTab).includes('blue');
		expect(colorTab).includes('purple');
		expect(colorTab).includes('salmon');
		expect(colorTab).includes('cyan');
		expect(colorTab).includes('green');
		expect(colorTab).includes('#ffe5f6');
	})
	test("BlockStyle Pink backGround and border", () => {
		expect(blockStyle.backgroundColor).to.equal('pink');
		expect(blockStyle.border).to.equal('0.5px solid #3331');
		expect(shadowBlockStyle.backgroundColor).to.equal('pink');
	});
})