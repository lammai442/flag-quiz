export interface GameData {
	gameCountries: Country[];
	questionNmbr: number;
	playerName: string;
	wrongGuesses: number;
	nmbrOfCountries: number;
	helpNmbr: number;
	totalHelp: number;
	playerId: string;
	reset(): void;
}

export interface Country {
	flags: {
		alt: string;
		png: string;
	};
	name: {
		common: string;
	};
}

export interface NewGamePlayer {
	playerName: string;
	wrongGuesses: number;
	totalHelp: number;
	playerId: string;
}
