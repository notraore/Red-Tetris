import React from 'react'
import {App} from '../../src/client/src/App'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import tab from '../../src/client/src/components/pieces.1.json'
import Game from '../../src/client/src/containers/Game/Game'
import InGame from '../../src/client/src/containers/Game/InGamePage'
import FinishPage from '../../src/client/src/containers/Game/FinishPage'
import { initialBoardState, initialTetriState } from '../../src/client/src/components/initialState'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

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
      shadow: 	[
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
      shadow: 	[
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

describe('App', () => {
  test('App snapshot renders', () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})

describe('Game', () => {
  test('Game snapshot renders', () => {
    const component = renderer.create(<Game gameState={props}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})

describe('InGame component SOLO', () => {
  test('ingame snapshot renders', () => {
    const component = renderer.create(<InGame
      board={props.board}
      curTetri={props.curTetri}
      tetri={props.tetri}
      gameState={props}
      solo
    />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})

describe('InGame component MULTI', () => {
  const comp = <InGame
    board={props.board}
    curTetri={props.curTetri}
    tetri={props.tetri}
    gameState={{...props, isHost: true}}
    score={1234}
    rows={4}
    level={1}
    nextTetri={tab["I"]}
    chatInput={"Coucou ça va?"}
  />
  test('ingame multi snapshot renders', () => {
    const wrapper = shallow(comp)
    // wrapper.instance().chat("coucou")
    const component = renderer.create(comp)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Finish component', () => {
  test('finish game snapshot renders', () => {
    const component = renderer.create(<FinishPage
      gameState={props}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})