import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import renderer from 'react-test-renderer';

import { OptionComponent } from '../Option.js';
import { styles } from '../OnlineListPopup.js';

describe("Option Snapshot test", () => {
	const styleTmp = styles();
	test("OptionComponent render match the shot", () => {
		const blockCmp = renderer.create(<OptionComponent classes={ styleTmp }/>).toJSON();
		expect(blockCmp).toMatchSnapshot();
	})
})