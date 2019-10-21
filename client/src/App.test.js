import React from 'react';
import { shallow } from 'enzyme'
import { expect } from 'chai'

/*
**Components
*/

/*
**Functions
*/

/*
**Variables
*/

/* Block.js */
import { colorTab } from './components/block.js'
import {blockSize} from './components/block.js'
import {shadowBlockSize} from './components/block.js'

/* canFit.js */
// import {canFit} from './components/canFit.js'

/* initialState.js */
import { initialBoardState } from './components/initialState.js'



describe('Game propriety', () => {
	test("Color tab contains colors", () => {
		expect(colorTab).includes('red');
		expect(colorTab).includes('yellow');
		expect(colorTab).includes('blue');
		expect(colorTab).includes('purple');
		expect(colorTab).includes('salmon');
		expect(colorTab).includes('cyan');
		expect(colorTab).includes('green');
	})
	test("Is block size 40 ?", () => {
		expect(blockSize).to.equal(40);
	})
		test("Is shadow block size is 10 ?", () => {
		expect(shadowBlockSize).to.equal(10);
	})
})

describe('Functions', () => {
	test('Func : "Equal()" to 10', () => {
		expect(10).to.be.equal(10)
	})
	test("Func: \"initialBoardState()\" is NOT returning null or undefined", () => {
		const testTab = initialBoardState();
		expect(testTab).to.not.equal(null);
	})
	test("Grid Widgth is 10 and Height is 20 ? ", () => {
		const testTab = initialBoardState();
		for (let i = 0; i < testTab.tab.length; i++)
		{
			expect(testTab.tab[i].length).to.equal(10);
		}
		expect(testTab.tab.length).to.equal(20);
	})
});
