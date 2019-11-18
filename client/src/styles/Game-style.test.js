import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { GameStyle } from './Game-style.js';


describe('Game style is well initialized', () => {
	test("GameStyle Object test", () => {
		const infoTmp = GameStyle();
		expect(infoTmp.gameInfo.margin).to.equal("10px 0px");
		expect(infoTmp.gameInfo.alignItem).to.equal("center");
		expect(infoTmp.gameInfo.fontSize).to.equal("20px");
		expect(infoTmp.gameInfo.color).to.equal("pink");
		expect(infoTmp.gameInfo.border).to.equal("2px solid pink");
		expect(infoTmp.gameInfo.borderRadius).to.equal("10px");
		expect(infoTmp.gameInfo.padding).to.equal("5px 0px");
		expect(infoTmp.gameInfo.width).to.equal("80%");

		expect(infoTmp.finishGameTitle.fontSize).to.equal("30px");
		expect(infoTmp.finishGameTitle.color).to.equal("white");
		expect(infoTmp.finishGameTitle.fontWeight).to.equal("bold");
		expect(infoTmp.finishGameTitle.padding).to.equal("5px 0px");
		expect(infoTmp.finishGameTitle.fontFamily).to.equal("Orbitron, sans-serif");

		expect(infoTmp.finishGameInfo.fontSize).to.equal('20px');
		expect(infoTmp.finishGameInfo.color).to.equal('white');
		expect(infoTmp.finishGameInfo.padding).to.equal("5px 0px");
		expect(infoTmp.finishGameInfo.fontFamily).to.equal("Orbitron, sans-serif");

		expect(infoTmp.gameOverContainer.minHeight).to.equal("600px");
		expect(infoTmp.gameOverContainer.padding).to.equal("20px 0px");
		expect(infoTmp.gameOverContainer.width).to.equal("650px");
		expect(infoTmp.gameOverContainer.borderRadius).to.equal("10px");
		expect(infoTmp.gameOverContainer.backgroundColor).to.equal("pink");

		expect(infoTmp.restartLabel.fontSize).to.equal("50px");
		expect(infoTmp.restartLabel.fontWeight).to.equal("bold");
		expect(infoTmp.restartLabel.color).to.equal("white");
		expect(infoTmp.restartLabel.padding).to.equal("10px");
		expect(infoTmp.restartLabel.cursor).to.equal("pointer");

		expect(infoTmp.input.height).to.equal("45px");
		expect(infoTmp.input.width).to.equal("250px");
		expect(infoTmp.input.fontSize).to.equal("28px");
		expect(infoTmp.input.textAlign).to.equal("center");
		expect(infoTmp.input.backgroundColor).to.equal("rgb(47, 49, 64)");
		expect(infoTmp.input.border).to.equal("3px solid rgb(71, 72, 99)");
		expect(infoTmp.input.color).to.equal("white");
		expect(infoTmp.input.fontFamily).to.equal('Orbitron, sans-serif');

		expect(infoTmp.blockStyle.cursor).to.equal("pointer");



	});
});

//     blockStyle: {
//         backgroundColor: 'pink',
//         width: `${blockSize}px`,
//         height: `${blockSize}px`,
//         border: '1px solid pink'
//     },
//     button: {
//         width: '100%',
//         fontSize: '20px',
//         color: 'white',
//         backgroundColor: 'pink',
//         border: '2px solid pink',
//         borderRadius: '10px',
//         padding: '10px 0px',
//         cursor: 'pointer',
//         margin: 5,
//         marginLeft: 0,
//         '&:hover': {
//             backgroundColor: 'inherit',
//             color: 'pink'
//         }
//     }
// })