export const updateLocalStorage = (newGamePlayer) => {
    const fromLocalStorage = JSON.parse(localStorage.getItem('highScore') || '[]');
    compareHighScore(fromLocalStorage, newGamePlayer);
    localStorage.setItem('highScore', JSON.stringify(fromLocalStorage));
    return fromLocalStorage;
};
export const getHighScore = () => {
    const highScoreData = JSON.parse(localStorage.getItem('highScore') || '[]');
    return highScoreData;
};
const compareHighScore = (highScore, newGamePlayer) => {
    highScore.push(newGamePlayer);
    if (highScore.length > 1) {
        highScore.sort((a, b) => a.errorNmbr - b.errorNmbr);
    }
};
