import React from 'react';

import SocketMock from 'socket.io-mock';
import { expect } from 'chai';

import {sendInfo} from '../../src/server/utils.js'

describe("utils.js test", () => {
	test("sendInfo Test", () => {
        let socket = new SocketMock();
        const title = "Joker";
        const description = "Le film d'un clown malade.";
		sendInfo(socket, title, description);
	})
})