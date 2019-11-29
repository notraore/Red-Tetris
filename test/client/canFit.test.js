import React from 'react';
import { shallow } from 'enzyme';
import { expect  } from 'chai'

import { canFit } from '../../src/client/src/components/canFit.js'
import { initialTetriState } from '../../src/client/src/components/initialState.js';
import { initialBoardState } from '../../src/client/src/components/initialState.js';

describe('canFit Function', () => {
	const data = [];
	const tetri = initialTetriState(0, data);
	const testTab = initialBoardState();
	test("canFitReturn False", () => {
	const resTrue = canFit(testTab, tetri);
	expect(resTrue).to.equal(true);
	tetri.x = -999;
	const resFalse = canFit(testTab, tetri);
	expect(resFalse).to.equal(false);
	});
});
