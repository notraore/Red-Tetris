import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import renderer from 'react-test-renderer';

import { styles } from '../OnlineListPopup.js';
import { Title } from '../Title.js';

describe("Title Snapshot test", () => {
	const styleTmp = styles();
	test("Title render match the shot", () => {
		const blockCmp = renderer.create(<Title classes={ styleTmp }/>).toJSON();
		expect(blockCmp).toMatchSnapshot();
	})
})