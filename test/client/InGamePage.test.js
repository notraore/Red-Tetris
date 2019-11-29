import React from 'react'
import {App} from '../../src/client/src/App'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import InGame from '../../src/client/src/containers/Game/InGamePage.js';
import { initialBoardState, initialTetriState } from '../../src/client/src/components/initialState.js'
import FinishPage from '../../src/client/src/containers/Game/FinishPage'

import {styles} from '../../src/client/src/components/Popup.js'


import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'


Enzyme.configure({ adapter: new Adapter()})

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

const props = {
  room: null,
  nbPlayer: null,
  room: "room1",
  player: "Josie",
  playerId: "v34h9492wvkbh3wg3q",
  board: initialBoardState(),
  pieces: ['J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J'],
  curTetri: initialTetriState(0, ['J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J']),
  tetri: [
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
  ],
  playTab: [
    {
      id: "98723g29387y",
      username: "Philippe",
      shadow: initialBoardState(),
      playing: true,
    },
    {
      id: "h3n982y3r9",
      username: "Jason",
      shadow:   [
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0]
      ],
      playing: false
    },
        {
      id: "h3n982y3r9",
      username: "Jason",
      shadow:   [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0]
      ],
      playing: true
    }
  ]
}

describe('Click : <InGameComponent />', () => {
//   const setChatInput = (val) => {
//     chatInput = val;
//   }
//   let chatInput = "";
//   setChatInput("jaimeLePain");
//   const chat = (input) => {
//     return input;
//   }
  it('Click Simulation works ?', () => {
//     let setChatInput = jest.fn();
    // const wrapper = shallow(<InGame gameState={{...props, isHost: true}} classes={stylesTmp} />);
  });
});