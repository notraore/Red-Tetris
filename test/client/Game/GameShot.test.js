import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import renderer from 'react-test-renderer';
// import Adapter from 'enzyme-adapter-react-16'
// import { configure as configureEnzyme } from 'enzyme'

import { Game } from '../../../src/client/src/containers/Game/Game.js'
import { styles } from '../../../src/client/src/components/Popup.js';
// 
// configureEnzyme({ adapter: new Adapter() })

const gameState = {
	room: "null",
	nbPlayer: 5,
	player: "NobilaTest",
	playerId: "v34h9492wvkbh3wg3q",
	isInGame: true,
	gameStarted: true,
	isHost: true,
	playTab: [{
		playing : true,
		win : true,
		x : 222,
		shadow: [
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
		]
		}],
	shadows: [{id: "3fubi2n34v389un"}],
	onlineUsers: "Josie",
	endOfGame: true,
	winScore: [{id: "3fubi2n34v389un"}],
	playing: true,
	pieces: ["T", "Z", "I", "L"]
};

describe("Game components test", () => {
	test("Game render match SnapShot", () => {
		const GameCmp = renderer.create(< Game classes={styles} gameState={gameState} solo={false} />).toJSON();
		expect(GameCmp).toMatchSnapshot();
		const GameCmpA = renderer.create(< Game classes={styles} gameState={gameState} solo={true} />).toJSON();
		expect(GameCmpA).toMatchSnapshot();
	});
});
