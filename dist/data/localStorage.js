import { highScoreMockup } from './index.js';
import { sortingHighScore } from '../utils/index.js';
export const updateLocalStorage = (newGamePlayer) => {
    const highScoreData = JSON.parse(localStorage.getItem('highScore') || JSON.stringify(highScoreMockup));
    highScoreData.push(newGamePlayer);
    sortingHighScore(highScoreData);
    const topFive = highScoreData.slice(0, 5);
    localStorage.setItem('highScore', JSON.stringify(topFive));
    return topFive;
};
