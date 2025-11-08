export interface GameData {
	flags: string[];
	startTime: number;
	endTime: number;
	nmbrOfGuesses: number;
	nmbrOfSeconds: number;
	playerName: string;
	reset(): void;
	startTimeInMilliseconds(): void;
	endTimeInMilliseconds(): void;
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
