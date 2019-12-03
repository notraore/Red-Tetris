import React from 'react';
import { leaveRoom } from '../../../src/client/src/sockets/emits.js'
import { joinRoom } from '../../../src/client/src/sockets/emits.js'
import { createRoom } from '../../../src/client/src/sockets/emits.js'
import { roomExist } from '../../../src/client/src/sockets/emits.js'
import { changeUsername } from '../../../src/client/src/sockets/emits.js'
import { sendMessage } from '../../../src/client/src/sockets/emits.js'

import SocketMock from 'socket.io-mock';
import { expect } from 'chai';

jest.setTimeout(30000);

describe('Fast and isolated socket tests', function(){
    it('Sockets should be able to talk to each other without a server', function(done) {
        let socket = new SocketMock();

		socket.on("leaveRoom room", leaveRoom());
		socket.on("join room", joinRoom("Nobila"));
		socket.on("create room", createRoom("Nobila"));
		socket.on("room exist", roomExist("Nobila"));
		socket.on("send username", changeUsername("Nobila"));
		socket.on("send message", sendMessage("Nobila", 'Je vais te faire la peau'));
		done();
    });
});