import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import renderer from 'react-test-renderer';

import { styles } from '../../components/OnlineListPopup.js';
import { Multi } from './index.js';
import { GameStyle } from '../../styles/Game-style.js';

describe("index.js SnapShot test",() => {
	const styleTmp = styles();
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
	test("Menu component Match SnapShot", () => {
		const blockCmp = renderer.create(<Multi classes={ GameStyle } gameState={ gameState } popupInfo={ styles }/>).toJSON();
		expect(blockCmp).toMatchSnapshot();
	});
});
