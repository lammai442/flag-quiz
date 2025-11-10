import type { NewGamePlayer } from '../interfaces/index';

export const updateLocalStorage = (
	newGamePlayer: NewGamePlayer
): NewGamePlayer[] => {
	const fromLocalStorage: NewGamePlayer[] = JSON.parse(
		localStorage.getItem('highScore') || '[]'
	);

	compareHighScore(fromLocalStorage, newGamePlayer);

	localStorage.setItem('highScore', JSON.stringify(fromLocalStorage));

	return fromLocalStorage;
};

export const getHighScore = (): NewGamePlayer[] => {
	const highScoreData: NewGamePlayer[] = JSON.parse(
		localStorage.getItem('highScore') || '[]'
	);
	return highScoreData;
};

const compareHighScore = (
	highScore: NewGamePlayer[],
	newGamePlayer: NewGamePlayer
) => {
	highScore.push(newGamePlayer);

	if (highScore.length > 1) {
		highScore.sort((a, b) => a.errorNmbr - b.errorNmbr);
	}
};
