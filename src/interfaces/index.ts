export interface GameData {
	flags: string[];
	startTime: number;
	endTime: number;
	nmbrOfGuesses: number;
	nmbrOfSeconds: number;
	playerName: string;
	reset(): void;
}
