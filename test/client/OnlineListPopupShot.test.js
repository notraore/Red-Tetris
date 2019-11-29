import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import renderer from 'react-test-renderer';

import { Popup } from '../../src/client/src/components/OnlineListPopup.js';
import { styles } from '../../src/client/src/components/OnlineListPopup.js';

describe("OnlineListPopup Snapshot test", () => {
	const stylesTmp = styles();
	const usertmp = {
		username: "'NobilaTest'",
		id: "v34h9492wvkbh3wg3q"
	};
	test("Popup render match the shot", () => {
		const blockCmp = renderer.create(< Popup classes={stylesTmp} />).toJSON();
		const blockCmpb = renderer.create(< Popup classes={stylesTmp} users={usertmp} />).toJSON();
		expect(blockCmp).toMatchSnapshot();
		expect(blockCmpb).toMatchSnapshot();
	})
})