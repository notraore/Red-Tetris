import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { colorArray } from './Menu-styles.js';
import { styles } from './Menu-styles.js';

describe("Menu Color array test", () => {
	test("Testing color array", () => {
		expect(colorArray[0]).to.equal('rgb(235, 40, 26)');
		expect(colorArray[1]).to.equal('rgb(235, 120, 26)');
		expect(colorArray[2]).to.equal('rgb(235, 221, 26)');
		expect(colorArray[3]).to.equal('rgb(117, 235, 26)');
		expect(colorArray[4]).to.equal('rgb(26, 218, 235)');
		expect(colorArray[5]).to.equal('rgb(26, 68, 235)');
		expect(colorArray[6]).to.equal('rgb(134, 26, 235)');
		expect(colorArray[7]).to.equal('rgb(235, 26, 183)');
	});
	test("testing menu style", () => {
		expect(styles.container.backgroundColor).to.equal("rgb(33, 35, 46)");
		expect(styles.container.display).to.equal("flex");
		expect(styles.container.flexDirection).to.equal('column');
		expect(styles.container.alignItems).to.equal('center');
		expect(styles.container.fontSize).to.equal('calc(10px + 2vmin)');
		expect(styles.container.color).to.equal('white');
		expect(styles.container.animation).to.equal('gradientBackground 20s infinite');
		expect(styles.container.backgroundSize).to.equal('100% 100%');
		expect(styles.container.overflow).to.equal('hidden');
		expect(styles.container.height).to.equal('100%');

		expect(styles.listUsernameLabel.fontFamily).to.equal('Orbitron, sans-serif');
      	expect(styles.listUsernameLabel.padding).to.equal('15px 0px');

      	expect(styles.chatLabel.color).to.equal('grey');
      	expect(styles.chatLabel.marginBottom).to.equal('10px');
      	expect(styles.chatLabel.textAlign).to.equal('left');
      	expect(styles.chatLabel.fontSize).to.equal('18px');

      	expect(styles.input.height).to.equal('45px');
		expect(styles.input.width).to.equal('250px');
		expect(styles.input.fontSize).to.equal('28px');
		expect(styles.input.textAlign).to.equal('center');
		expect(styles.input.backgroundColor).to.equal('rgb(47, 49, 64)');
		expect(styles.input.border).to.equal('3px solid rgb(71, 72, 99)');
		expect(styles.input.color).to.equal('white');
		expect(styles.input.fontFamily).to.equal('Orbitron, sans-serif');

		expect(styles.userOnlineLabel.marginBottom).to.equal('10px');
		expect(styles.userOnlineLabel.fontFamily).to.equal('Orbitron, sans-serif');
		expect(styles.userOnlineLabel.fontSize).to.equal('20px');
		expect(styles.userOnlineLabel.cursor).to.equal('pointer');
		expect(styles.userOnlineLabel.fontWeight).to.equal('bold');

		expect(styles.changeUsernameContainer.marginTop).to.equal('30px');
		expect(styles.changeUsernameContainer.height).to.equal('100px');
		expect(styles.changeUsernameContainer.padding).to.equal('10px');
		expect(styles.changeUsernameContainer.cursor).to.equal('pointer');

		expect(styles.startButton.width).to.equal('200px');
		expect(styles.startButton.height).to.equal('100px');
		expect(styles.startButton.backgroundColor).to.equal('red');
		expect(styles.startButton.fontFamily).to.equal('Orbitron, sans-serif');
		expect(styles.startButton.color).to.equal('white');
		expect(styles.startButton.cursor).to.equal('pointer');
		expect(styles.startButton.border).to.equal('10px solid rgb(47, 49, 64)');
		expect(styles.startButton.fontWeight).to.equal('bold');
		expect(styles.startButton.animation).to.equal('rainbow 10s infinite ease-out');
		expect(styles.startButton.marginBottom).to.equal('10px');

		expect(styles.returnMenuButton.height).to.equal('30px');
		expect(styles.returnMenuButton.cursor).to.equal('pointer');
		expect(styles.returnMenuButton.backgroundColor).to.equal('rgb(48, 49, 60)');

		expect(styles.centerSubContainer.display).to.equal('flex');
		expect(styles.centerSubContainer.flexDirection).to.equal('column');
		expect(styles.centerSubContainer.alignItems).to.equal('center');

		expect(styles.optionsContainer.display).to.equal('flex');
		expect(styles.optionsContainer.width).to.equal('600px');

		expect(styles.option.padding).to.equal('10px 0px');
		expect(styles.option.cursor).to.equal('pointer');
		expect(styles.option.border).to.equal('10px solid rgb(47, 49, 64)');
		expect(styles.option.background).to.be.oneOf(colorArray);

		expect(styles.optionLabel.color).to.equal('white');
		expect(styles.optionLabel.fontSize).to.equal('27px');
		expect(styles.optionLabel.fontWeight).to.equal('bold');
		expect(styles.optionLabel.cursor).to.equal('pointer');
		expect(styles.optionLabel.backgroundColor).to.equal('transparent !important');

		expect(styles.redLabel.cursor).to.equal('default');
		expect(styles.redLabel.textTransform).to.equal('uppercase');
		expect(styles.redLabel.fontSize).to.equal('45px');
		expect(styles.redLabel.WebkitTextFillColor).to.equal('transparent');
		expect(styles.redLabel.background).to.equal(`-webkit-linear-gradient(#eee, red)`);
		expect(styles.redLabel.WebkitBackgroundClip).to.equal('text');

		expect(styles.tetrisLabel.textTransform).to.equal('uppercase');
		expect(styles.tetrisLabel.cursor).to.equal('default');
		expect(styles.tetrisLabel.paddingLeft).to.equal('5px');
		expect(styles.tetrisLabel.fontSize).to.equal('80px');
		expect(styles.tetrisLabel.WebkitTextFillColor).to.equal('transparent');
		expect(styles.tetrisLabel.background).to.equal(`-webkit-linear-gradient(#eee, grey)`);
		expect(styles.tetrisLabel.WebkitBackgroundClip).to.equal('text');
		expect(styles.tetrisLabel.textShadow).to.equal('0 0 5px #FFFFFF');
		expect(styles.tetrisLabel.animation).to.equal('animate 3s infinite');
		expect(styles.tetrisLabel.fontWeight).to.equal('bold');

		expect(styles.selectedContainer.position).to.equal('relative');
		expect(styles.selectedContainer.animation).to.equal('selectOption 1s ease');

		expect(styles.chosen.width).to.equal('100%');
		expect(styles.chosen.height).to.equal('300px');
		expect(styles.chosen.border).to.equal('10px solid rgb(47, 49, 64)');
		expect(styles.chosen.backgroundColor).to.equal('rgb(30, 32, 43)');
		expect(styles.chosen.position).to.equal('relative');
		expect(styles.chosen.animation).to.equal('secondMenu 0.5s ease');
	});
});