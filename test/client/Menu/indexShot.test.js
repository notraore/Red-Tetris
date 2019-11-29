import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import renderer from 'react-test-renderer';

import { Menu } from '.../../../src/client/src/containers/Menu/index.js';
import { styles } from '../../../src/client/src/styles/Menu-styles.js';

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
	onlineUsers: ["Josie", "Fanffan"],
	endOfGame: true,
	winScore: [{id: "3fubi2n34v389un"}],
	playing: true,
	pieces: ["T", "Z", "I", "L"]
};

const classes = styles;

const infor = [{
	title: "Nobila est present",
	description: "Une partie de tetris tres classique"
}];

describe("Menu Snapshot test", () => {
	test("Menu render match the shot", () => {
		const blockCmp = renderer.create(< Menu onlineList={true} selected={2} popupInfo={infor} gameState = { gameState } classes={styles}/>).toJSON();
		expect(blockCmp).toMatchSnapshot();
	});
});