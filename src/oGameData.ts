import { GameData } from './interfaces/index';

export const oGameData: GameData = {
	flags: [],
	startTime: 0,
	endTime: 0,
	nmbrOfGuesses: 0,
	nmbrOfSeconds: 0,
	playerName: '',
	init() {
		this.flags = [];
		this.startTime = 0;
		this.endTime = 0;
		this.nmbrOfGuesses = 0;
		this.nmbrOfSeconds = 0;
		this.playerName = '';
	},
};
