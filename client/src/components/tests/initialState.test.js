import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { initialBoardState } from '../initialState.js'
import { initialTetriState } from '../initialState.js'

describe("initialState test", () => {
	test("Grid Widgth is 10 and Height is 20 ? ", () => {
		const testTab = initialBoardState();
		for (let i = 0; i < testTab[i].length; i++)
		{
			expect(testTab[i].length).to.equal(10);
		}
		expect(testTab.length).to.equal(20);
	});
	test("Tetris is well inittiated ?", () => {
		const data = [];
		const tetri = initialTetriState(0, data);
		expect(tetri).to.not.equal(null);
		expect(tetri.maxWidth).to.not.equal(null);
		expect(tetri.maxHeight).to.not.equal(null);
		expect(tetri.h).to.not.equal(null);
		expect(tetri.type).to.not.equal(null);
		expect(tetri.name).to.not.equal(null);
		expect(tetri.width).to.not.equal(null);
		expect(tetri.x).to.equal(3);
		expect(tetri.y).to.equal(0);
		expect(tetri.leftSpace).to.not.equal(null);
		expect(tetri.rightSpace).to.not.equal(null);
		expect(tetri.downSpace).to.not.equal(null);
		expect(tetri.rot).to.equal(0);
		expect(tetri.form).to.not.equal(null);
		expect(tetri.color).to.equal("yellow");
	});
});
