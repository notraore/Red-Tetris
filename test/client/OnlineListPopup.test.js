import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { styles } from '../../src/client/src/components/OnlineListPopup.js';

describe("OnlineListPopup test" ,() => {
	const stylesTmp = styles();
	test("Style back is returning the right back ?", () => {
		expect(stylesTmp.back.backgroundColor).to.be.equal("rgba(33,35,46,0.8)");
	});
	test("Style container is returning the right container ?", () => {

		expect(stylesTmp.container.width).to.equal("300px");
		expect(stylesTmp.container.minHeight).to.equal("200px");
		expect(stylesTmp.container.borderRadius).to.equal("20px");
		expect(stylesTmp.container.boxShadow).to.equal("4px 2px 19px 10px rgba(112,106,112,0.29)");
		expect(stylesTmp.container.backgroundColor).to.equal("rgba(33,35,46,1)");
	});
	test("Style title is returning the right title ?", () => {
		expect(stylesTmp.title.fontSize).to.equal("30px");
		expect(stylesTmp.title.color).to.equal("white");
		expect(stylesTmp.title.padding).to.equal(5);
	});
	test("Style description is returning the right description ?", () => {
		expect(stylesTmp.description.fontSize).to.equal("18px");
		expect(stylesTmp.description.color).to.equal("white");
		expect(stylesTmp.description.padding).to.equal(5);
	});
	test("Style button is returning the right button ?", () => {
		expect(stylesTmp.button.cursor).to.equal("pointer");
		expect(stylesTmp.button.width).to.equal("150px");
		expect(stylesTmp.button.height).to.equal("30px");
		expect(stylesTmp.button.borderRadius).to.equal("5px");
		expect(stylesTmp.button.backgroundColor).to.equal("rgba(43,45,56,1)");
		expect(stylesTmp.button.color).to.equal("white");
		expect(stylesTmp.button.marginTop).to.equal(10);
	});
});