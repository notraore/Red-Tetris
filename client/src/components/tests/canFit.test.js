import React from 'react';
import { shallow } from 'enzyme';
import { expect  } from 'chai'

import { canFit } from '../canFit.js'
import { initialTetriState } from '../initialState.js';
import { initialBoardState } from '../initialState.js';

describe('canFit Function', () => {
	const data = [];
	const tetri = initialTetriState(0, data);
	const testTab = initialBoardState();
	test("canFitReturn False", () => {
	const resTrue = canFit(testTab, tetri);
	expect(resTrue).to.equal(true);
	//Try undefined;
	});
});
