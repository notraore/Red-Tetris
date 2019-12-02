import React from 'react'
import {App} from '../../src/client/src/App'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import {styles} from '../../src/client/src/components/Popup.js'

import InGame from '../../src/client/src/containers/Game/InGamePage.js';
import { initialBoardState, initialTetriState } from '../../src/client/src/components/initialState.js'
import tab from '../../src/client/src/components/pieces.1.json'

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
  const setChatInput = (val) => {
    chatInput = val;
  }
  let chatInput = "";
  setChatInput("jaimeLePain");
  const chat = (input) => {
    return input;
  }
  it('Click Simulation works ?', () => {
    let setChatInput = jest.fn();
    const event = {
      target: { value: "NobilaRoom" }
    };
    const wrapper = shallow(<InGame board={props.board} curTetri={props.curTetri} tetri={props.tetri} gameState={{...props, isHost: true}}
    score={1234}
    solo={true}
    rows={4}
    level={1}
    nextTetri={tab["I"]}
    chatInput={"Coucou ça va?"}
    setChatInput={setChatInput}
    chat={chat} />);
    
    // let theKey = wrapper.find('input').simulate('keydown', {keyCode: 13});
    // wrapper.find('input[id="chatInput"]').simulate('keydown', event);

    // wrapper.find('div').simulate('change', event);
    // expect(setChatInput).toBeCalledWith("NobilaRoom");
  });
});