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
  gameStarted: true,
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

// Multi(classes, gameState, dispatch, notify, solo });
describe('Click : <Multi />', () => {
	it('Click Simulation works ?', () => {
		// const event = {
		// 	type: 'START_GAME',
		// 	nbPlayer: 1,
		// 	pieces: pieces
		// };
		let dispatch = jest.fn();
		let notify = jest.fn();
		const wrapper = shallow(<Multi classes={ classes } notify={notify} gameState={ gameState } dispatch={ dispatch } solo={ true } />);
		expect(dispatch).toBeCalledTimes(0);
		expect(notify).toBeCalledTimes(0);
	});
});
