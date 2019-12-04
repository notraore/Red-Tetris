import React from 'react';
import { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16'
import { configure as configureEnzyme } from 'enzyme'

configureEnzyme({ adapter: new Adapter() })

import { Multi } from '../../../src/client/src/containers/Multi/index.js'
import { styles } from '../../../src/client/src/components/Popup.js'

const classes = styles();

const gameState = {
  room: null,
  nbPlayer: null,
  player: "NobilaTest",
  playerId: "v34h9492wvkbh3wg3q",
  isInGame: true,
  gameStarted: false,
  isHost: true,
  playTab: [{
		user: [{id: "erhuf3498vcn34"},
		{id: "erhuf34fegerag98vcn34"}]
  }],
  shadows: null,
  onlineUsers: "Josie",
  endOfGame: true,
  winScore: null,
  playing: true,
  pieces: ["T", "Z", "I", "L"]
};

const gameState2 = {
  room: null,
  nbPlayer: null,
  player: "NobilaTest",
  playerId: "v34h9492wvkbh3wg3q",
  isInGame: true,
  gameStarted: false,
  isHost: true,
  playTab: [{
		user: [{id: "erhuf3498vcn34", gameHost: true }]
  }],
  shadows: null,
  onlineUsers: "Josie",
  endOfGame: true,
  winScore: null,
  playing: true,
  pieces: ["T", "Z", "I", "L"]
};

const prone = [{user: [{id: "erhuf3498vcn34", gameHost: true}, {id: "e43ug934hvu934g", gameHost: false}, {id: "4j3ivn34g", gameHost: false}]}];

describe('Click : <Multi />', () => {
	it('Click Simulation works ?', () => {
		let dispatch = jest.fn();
		let notify = jest.fn();
		const wrapper = shallow(<Multi classes={ classes } notify={notify} gameState={ gameState } solo={ false } />);
		expect(dispatch).toBeCalledTimes(0);
		expect(notify).toBeCalledTimes(0);

		let dispatch2 = jest.fn();
		let notify2 = jest.fn();
		const wrapper2 = shallow(<Multi curUser={ prone } classes={ classes } dispatch={ dispatch2 } notify={notify2} gameState={ gameState2 } solo={ true } />);
		expect(dispatch2).toBeCalledTimes(0);
		expect(notify2).toBeCalledTimes(0);
	});
});