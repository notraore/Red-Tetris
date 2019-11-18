import React from 'react';
import { shallow } from 'enzyme';
import { expect  } from 'chai'

import { initialState } from './reducer.js';
import { gameReducer } from './reducer.js';

const action = {
	room: "E2R5",
	nbPlayer: 3,
	player: "NOBILA",
	playerId: "w4343gB$45htEBEe",
	isInGame: true,
	gameStarted: false,
	isWaiting: true,
	isHost: false,
	playTab: [],
	shadows: 2,
	onlineUsers: 3,
	endOfGame: false,
	winScore: 6000,
	playing: false,
	pieces: "T",
	type: "GET_USER_INFOS"
}

const testTab = {
	room: null,
	nbPlayer: null,
	player: null,
	playerId: null,
	isInGame: false,
	gameStarted: false,
	isWaiting: false,
	isHost: false,
	playTab: [],
	shadows: null,
	onlineUsers: null,
	endOfGame: false,
	winScore: null,
	playing: false,
	pieces: null
}

describe('gameReducer Function', () => {
	test("gameReducer return new filled state", () => {
		const userInfo = gameReducer(testTab, action);
		expect(userInfo.player).to.equal("NOBILA");
		expect(userInfo.playerId).to.equal("w4343gB$45htEBEe");
		expect(userInfo.isInGame).to.equal(true);
		expect(userInfo.onlineUsers).to.equal(3);
	});
});