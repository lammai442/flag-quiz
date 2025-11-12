import type { NewGamePlayer, GameData } from '../interfaces/index';
import { generatPlayerId } from '../utils/index.js';

export const highScoreMockup: NewGamePlayer[] = [
	{
		playerId: 'p12345',
		playerName: 'Kalle',
		wrongGuesses: 2,
		totalHelp: 4,
	},
	{
		playerId: 'p21464',
		playerName: 'Viktor',
		wrongGuesses: 4,
		totalHelp: 10,
	},
	{
		playerId: 'p54613',
		playerName: 'Lam',
		wrongGuesses: 0,
		totalHelp: 1,
	},
];

export const oGameData: GameData = {
	nmbrOfCountries: 10,
	gameCountries: [],
	questionNmbr: 1,
	playerName: '',
	wrongGuesses: 0,
	helpNmbr: 1,
	totalHelp: 0,
	playerId: generatPlayerId(),
	reset() {
		this.gameCountries = [];
		this.questionNmbr = 1;
		this.playerName = '';
		this.wrongGuesses = 0;
		this.helpNmbr = 1;
		this.totalHelp = 0;
		this.playerId = generatPlayerId();
	},
};
