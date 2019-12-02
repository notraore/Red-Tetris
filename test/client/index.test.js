import { getRoomName, getUser } from '../../src/client/utils.js'
import Index from '../../src/client/index.js';

test('get room name from hash', () => {
    expect(getRoomName('#room[username]')).toBe('room')
    expect(getRoomName('#')).toBe(undefined)
});

test('get user name from hash', () => {
    expect(getUser('#room[username]')).toBe('username')
});


it('renders without crashing', () => {
  expect(
    JSON.stringify(
      Object.assign({}, Index, { _reactInternalInstance: 'censored' }),
    ),
  ).toMatchSnapshot();
});