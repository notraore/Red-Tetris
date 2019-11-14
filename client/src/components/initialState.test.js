import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { initialBoardState } from './initialState.js'

describe("initialState test", () => {
	test("Grid Widgth is 10 and Height is 20 ? ", () => {
		const testTab = initialBoardState();
		for (let i = 0; i < testTab[i].length; i++)
		{
			expect(testTab[i].length).to.equal(10);
		}
		expect(testTab.length).to.equal(20);
	});
});
