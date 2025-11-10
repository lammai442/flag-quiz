import type { NewGamePlayer } from '../interfaces/index';

export const updateLocalStorage = (
	newGamePlayer: NewGamePlayer
): NewGamePlayer[] => {
	const fromLocalStorage: NewGamePlayer[] = JSON.parse(
		localStorage.getItem('highScore') || '[]'
	);

	fromLocalStorage.push(newGamePlayer);

	sortingHighScore(fromLocalStorage);

	localStorage.setItem('highScore', JSON.stringify(fromLocalStorage));

	return fromLocalStorage;
};

export const getHighScore = (): NewGamePlayer[] => {
	const highScoreData: NewGamePlayer[] = JSON.parse(
		localStorage.getItem('highScore') || '[]'
	);
	return highScoreData;
};

/* ===== AI-HJÄLP ===== */
// Fått hjälp med att sortera så att den kontrollerar errorNmbr först och därefter helpNmbr
const sortingHighScore = (highScore: NewGamePlayer[]) => {
	highScore.sort((a, b) => {
		// Sortera först på errorNmbr (färre fel först)
		if (a.errorNmbr !== b.errorNmbr) {
			return a.errorNmbr - b.errorNmbr;
		}
		// Om lika många fel, sortera på helpNmbr (färre hjälp först)
		return a.helpNmbr - b.helpNmbr;
	});
};
