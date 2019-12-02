import React from 'react';
import { shallow } from 'enzyme';

import { checkPlayerInputs } from '../../../src/client/src/containers/Game/playerInputs.js';
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

	const moveTetri1 = (tetri) => {
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
		rot: 9,
		// form: tab[name].position[0].form,
		// color: tab[name].color,
	}
	return (tmp);
}

describe("PlayerImput test" ,() => {
	test("Test works ?", () => {
		const event = {
			keyCode: 39
		};
		const data = ['J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J'];
		const tab = ['J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J'];

		const refInterval = {
			current: 0
		};
		const fakeInput = jest.fn();
		checkPlayerInputs(canFit, board, null, refInterval, tab, moveTetri, fakeInput, event);
		expect(fakeInput).toBeCalledTimes(0);

		const event1 = {
			keyCode: 40
		};
		const fakeInput1 = jest.fn();
		checkPlayerInputs(canFit, board, null, refInterval, tab, moveTetri, fakeInput1, event1);
		expect(fakeInput1).toBeCalledTimes(1);

		const event2 = {
			keyCode: 37
		};
		const fakeInput2 = jest.fn();
		checkPlayerInputs(canFit, board, null, refInterval, tab, moveTetri1, fakeInput2, event2);
		expect(fakeInput2).toBeCalledTimes(0);

		const event3 = {
			keyCode: 32
		};
		const fakeInput3 = jest.fn();
		checkPlayerInputs(canFit, board, fakeInput3, refInterval, tab, moveTetri, fakeInput3, event3);
		expect(fakeInput3).toBeCalledTimes(2);

		const event4 = {
			keyCode: 38
		};
		const fakeInput4 = jest.fn();
		checkPlayerInputs(canFit, board, fakeInput4, refInterval, tab, moveTetri1, fakeInput4, event4);
		expect(fakeInput4).toBeCalledTimes(0);
	})
})