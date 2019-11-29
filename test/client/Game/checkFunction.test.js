import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { removeLine } from '../../../src/client/src/containers/Game/checkFunctions.js'
import { checkLine } from '../../../src/client/src/containers/Game/checkFunctions.js'
import { reset } from '../../../src/client/src/containers/Game/checkFunctions.js'

describe("CheckFunctions test", () =>{
	test("is true", () =>{
		expect(0).to.equal(0);
	})
})