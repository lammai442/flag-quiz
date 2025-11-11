import { sortingHighScore } from '../utils/index.js';
const highScoreMockup = [
    {
        playerName: 'Kalle',
        wrongGuesses: 2,
        totalHelp: 4,
    },
    {
        playerName: 'Jenny',
        wrongGuesses: 0,
        totalHelp: 2,
    },
    {
        playerName: 'Viktor',
        wrongGuesses: 4,
        totalHelp: 10,
    },
    {
        playerName: 'Lam',
        wrongGuesses: 0,
        totalHelp: 1,
    },
    {
        playerName: 'Lena',
        wrongGuesses: 2,
        totalHelp: 8,
    },
];
export const updateLocalStorage = (newGamePlayer) => {
    const highScoreData = JSON.parse(localStorage.getItem('highScore') || JSON.stringify(highScoreMockup));
    highScoreData.push(newGamePlayer);
    sortingHighScore(highScoreData);
    const topFive = highScoreData.slice(0, 5);
    localStorage.setItem('highScore', JSON.stringify(topFive));
    return topFive;
};
export const oGameData = {
    nmbrOfCountries: 10,
    questionNmbr: 1,
    gameCountries: [],
    playerName: '',
    wrongGuesses: 0,
    helpNmbr: 1,
    totalHelp: 0,
    reset() {
        this.gameCountries = [];
        this.questionNmbr = 1;
        this.playerName = '';
        this.wrongGuesses = 0;
        this.helpNmbr = 1;
        this.totalHelp = 0;
    },
};
