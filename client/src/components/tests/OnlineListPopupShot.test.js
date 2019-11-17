import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import renderer from 'react-test-renderer';

import { Popup } from '../OnlineListPopup.js';
import { styles } from '../OnlineListPopup.js';

describe("OnlineListPopup Snapshot test", () => {
	const stylesTmp = styles();
	test("Popup render match the shot", () => {
		const blockCmp = renderer.create(< Popup classes={stylesTmp} />).toJSON();
		expect(blockCmp).toMatchSnapshot();
	})
})