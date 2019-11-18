import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import renderer from 'react-test-renderer';

import { GameStyle } from './styles/Game-style.js';
import { styles } from './components/OnlineListPopup.js';
import { App } from './App.js';

const gameState = {
	room: null,
	nbPlayer: null,
	player: "NobilaTest",
	playerId: "v34h9492wvkbh3wg3q",
	isInGame: true,
	gameStarted: false,
	isHost: true,
	playTab: [],
	shadows: null,
	onlineUsers: "Josie",
	endOfGame: false,
	winScore: null,
	playing: false,
	pieces: null
};

describe('App Snapshot test', () => {
		test("App component Match SnapShot", () => {
		const blockCmp = renderer.create(< App gameState={ gameState } popupInfo={ styles }/>).toJSON();
		expect(blockCmp).toMatchSnapshot();
	});
});