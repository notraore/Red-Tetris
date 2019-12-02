import React from 'react';
import { shallow } from 'enzyme';
// import express from 'express'

import {SOCKET_TIMEOUT} from '../../src/server/index.js'
// import {server} from '../../src/server/index.js'
import {app} from '../../src/server/index.js'

function doAsync(c) {
  setTimeout(() => {
      c(true)
    }, 1)
}

jest.useFakeTimers();

describe('-server- index.js test', () => {
  it('Variables match', (done) => {
		expect.assertions(0);
		function callback1(data) {
			expect(SOCKET_TIMEOUT).toBe(60000);
		}
		done();
		function callback2(data){
			app.get('/', function(req, res){
				res.sendFile(path.join(__dirname, '../../build', 'index.html'));
				expect(res.sendStatus).toBe(200);
			});
		}
		doAsync();
	});
});