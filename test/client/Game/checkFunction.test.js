import React from 'react';
import { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16'
import { configure as configureEnzyme } from 'enzyme'

configureEnzyme({ adapter: new Adapter() })

import { removeLine } from '../../../src/client/src/containers/Game/checkFunctions.js'
import { checkLine } from '../../../src/client/src/containers/Game/checkFunctions.js'
import { reset } from '../../../src/client/src/containers/Game/checkFunctions.js'
import { gameLoop } from '../../../src/client/src/containers/Game/checkFunctions.js'
import { initialBoardState, initialTetriState } from '../../../src/client/src/components/initialState.js'
import { canFit } from '../../../src/client/src/components/canFit.js'

const board = [
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1]
	];

const moveTetri = (tetri) => {
	const tmp = {
		// maxWidth: tab[name].position[0].maxWidth,
		// maxHeight: tab[name].position[0].maxHeight,
		// h: tab[name].position[0].height,
		// type: tab[name].type,
		// name: name,
		// width: tab[name].position[0].width,
		x: 3,
		y: 0,
		// leftSpace: tab[name].position[0].leftSpace,
		// rightSpace: tab[name].position[0].rightSpace,
		// downSpace: tab[name].position[0].downSpace,
		rot: 0,
		// form: tab[name].position[0].form,
		// color: tab[name].color,
	}
	return (tmp);
}

describe("CheckFunctions test", () =>{
	test("is true", () =>{
		const num = [19];
		const fake = jest.fn();
		const nouveau = removeLine(num, fake, board);
		expect(fake).toBeCalledTimes(1);

		const fakeLine = jest.fn();
		checkLine(board, fakeLine, 9, fakeLine, fakeLine);
		expect(fakeLine).toBeCalledTimes(3);

		const data = ['J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J'];
		const tab = ['J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J'];
		const refInterval = {
			current: 0
		};

		const fakeLoop = jest.fn();
		gameLoop(fakeLoop, canFit, fakeLoop, true, 
		fakeLoop, initialBoardState, initialTetriState, fakeLoop,
		fakeLoop, fakeLoop, board, refInterval, 7, data, tab, fakeLoop);
		expect(fakeLine).toBeCalledTimes(3);

		const fakeReset = jest.fn();
		reset(fakeReset, fakeReset, fakeReset, fakeReset,
		fakeReset, fakeReset, fakeReset, data, tab,
		fakeReset, fakeReset);
		expect(fakeLine).toBeCalledTimes(3);

		const tmpData = [];
		const fakeReset1 = jest.fn();
		reset(fakeReset1, fakeReset1, fakeReset1, fakeReset1,
		fakeReset1, fakeReset1, fakeReset1, tmpData, tab,
		fakeReset1, fakeReset1);
		expect(fakeLine).toBeCalledTimes(3);
	})
})