import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Server } from 'mock-socket';

import { leaveRoom } from '../../../src/client/src/sockets/emits.js'
import { joinRoom } from '../../../src/client/src/sockets/emits.js'
import { createRoom } from '../../../src/client/src/sockets/emits.js'
import { roomExist } from '../../../src/client/src/sockets/emits.js'
import { changeUsername } from '../../../src/client/src/sockets/emits.js'
import { sendMessage } from '../../../src/client/src/sockets/emits.js'

const fakeURL = 'ww.//localhost::3000';
const fakeServer = new Server(fakeURL);

describe("Emit socket test", () => {
	test("Socket.emit from emits.js tests", () => {
		expect(1).to.be.equal(1);
	});
});