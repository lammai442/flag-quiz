export interface GameData {
	gameCountries: Country[];
	playerName: string;
	errorNmbr: number;
	nmbrOfCountries: number;
	helpNmbr: number;
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
	errorNmbr: number;
}
