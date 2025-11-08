export interface GameData {
	gameCountries: Country[];
	startTime: number;
	endTime: number;
	nmbrOfGuesses: number;
	nmbrOfSeconds: number;
	playerName: string;
	errorNmbr: number;
	nmbrOfCountries: number;
	rightAnswers: number;
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
