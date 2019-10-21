 import React, { useState, useEffect } from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

/*
**Components
*/
// import App from './App.js'

/*
**Functions
*/

/*
**Variables
*/

/* Block.js */
import { colorTab } from './components/block.js'
// import {blockSize} from './components/block.js'
// import {shadowBlockSize} from './components/block.js'

/* canFit.js */
// import {canFit} from './components/canFit.js'

/*
**'/reducers.js
*/
import { initialBoardState } from './components/initialState.js'
import { initialState } from './reducers/reducer.js'
import { initialRoomState } from './reducers/roomReducer.js'
import { initialUserState } from './reducers/userReducer.js'

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
	// test("Is block size 40 ?", () => {
	// 	expect(blockSize).to.equal(40);
	// })
	// 	test("Is shadow block size is 10 ?", () => {
	// 	expect(shadowBlockSize).to.equal(10);
	// })
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
	describe("Reducers", () => {
		test('All \'initialState\' attibutes setted to null/false/empty ?', () => {
			expect(initialState.room).to.be.equal(null);
			expect(initialState.nbPlayer).to.be.equal(null);
			expect(initialState.player).to.be.equal(null);
			expect(initialState.playerId).to.be.equal(null);
			expect(initialState.isInGame).to.be.equal(false);
			expect(initialState.gameStarted).to.be.equal(false);
			expect(initialState.isWaiting).to.be.equal(false);
			expect(initialState.isHost).to.be.equal(false);
			expect(initialState.playTab).empty;
			expect(initialState.shadows).to.be.equal(null);
		})
		test("All 'initialRoomState' attibutes setted to null/false/empty ?", () => {
			expect(initialRoomState.name).to.be.equal(null);
			expect(initialRoomState.players).to.be.equal(null);
			expect(initialRoomState.hoster).to.be.equal(null);
			expect(initialRoomState.full).to.be.equal(false);
		})
			test("All 'initialUserState' attibutes setted to null/false/empty ?", () => {
			expect(initialUserState.username).to.be.equal("");
			expect(initialUserState.id).to.be.equal(null);
			expect(initialUserState.playing).to.be.equal(false);
		})

	})
});

// describe('Test for components',() => {
// 	test('App running without crashing', () => {
// 		const wrapper = shallow(<App />)
// 		wrapper.render();
// 	})
