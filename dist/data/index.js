export const updateLocalStorage = (newGamePlayer) => {
    const fromLocalStorage = JSON.parse(localStorage.getItem('highScore') || '[]');
    fromLocalStorage.push(newGamePlayer);
    sortingHighScore(fromLocalStorage);
    localStorage.setItem('highScore', JSON.stringify(fromLocalStorage));
    return fromLocalStorage;
};
export const getHighScore = () => {
    const highScoreData = JSON.parse(localStorage.getItem('highScore') || '[]');
    return highScoreData;
};
export const oGameData = {
    nmbrOfCountries: 1,
    gameCountries: [],
    playerName: '',
    wrongGuesses: 0,
    helpNmbr: 1,
    totalHelp: 0,
    reset() {
        this.gameCountries = [];
        this.playerName = '';
        this.wrongGuesses = 0;
        this.helpNmbr = 1;
        this.totalHelp = 0;
    },
};
/* ===== AI-HJÄLP ===== */
// Fått hjälp med att sortera så att den kontrollerar errorNmbr först och därefter helpNmbr
const sortingHighScore = (highScore) => {
    highScore.sort((a, b) => {
        // Sortera först på errorNmbr (färre fel först)
        if (a.wrongGuesses !== b.wrongGuesses) {
            return a.wrongGuesses - b.wrongGuesses;
        }
        // Om lika många fel, sortera på helpNmbr (färre hjälp först)
        return a.helpNmbr - b.helpNmbr;
    });
};
