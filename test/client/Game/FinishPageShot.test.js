import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import renderer from 'react-test-renderer';

import { FinishComponent } from '.../../../src/client/src/containers/Game/FinishPage.js';
import { styles } from '../../../src/client/src/components/Popup.js';

describe("FinishPage Snapshot test", () => {
	const stylesTmp = styles();
	const gameState = {
	room: null,
	nbPlayer: null,
	player: "NobilaTest",
	playerId: "v34h9492wvkbh3wg3q",
	isInGame: true,
	gameStarted: true,
	isHost: true,
	playTab: [],
	shadows: null,
	onlineUsers: "Josie",
	endOfGame: true,
	winScore: null,
	playing: true,
	pieces: ["T", "Z", "I", "L"]
};

	test("FinishComponent render match the shot", () => {

		const blockCmp = renderer.create(< FinishComponent chatInput={"Nobila"} rows={0} winHeight={160} level={0} gameState = {gameState} classes={stylesTmp} solo={true} />).toJSON();
		expect(blockCmp).toMatchSnapshot();
		gameState.playTab = [{
		winScore : [{
			id: "v34h9492wvkbh3wg3q"
		}],
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
		}]
		// gameState.winScore = [{
		// 	id: "v34h9492wvkbhe3wg3q"
		// }];
		const blockCmpb = renderer.create(< FinishComponent score ={999} rows={5} level={2} chatInput={""} gameState={gameState} classes={stylesTmp} />).toJSON();
		expect(blockCmpb).toMatchSnapshot();
		gameState.winScore = [{
			id: "v34h9492wvkbh3wg3q",
			winner: "Nobila"
		}];
		gameState.endOfGame = true;
		gameState.isHost = true;
		const blockCmpc = renderer.create(< FinishComponent gameState={gameState} classes={stylesTmp} />).toJSON();
		expect(blockCmpc).toMatchSnapshot();
	})
})