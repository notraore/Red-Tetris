import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import renderer from 'react-test-renderer';

import { styles } from '../../src/client/src/components/OnlineListPopup.js';
import { Title } from '../../src/client/src/components/Title.js';

describe("Title Snapshot test", () => {
	const styleTmp = styles();
	test("Title render match the shot", () => {
		const blockCmp = renderer.create(<Title classes={ styleTmp }/>).toJSON();
		expect(blockCmp).toMatchSnapshot();
	})
})