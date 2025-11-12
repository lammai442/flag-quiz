export const shuffleArray = (array) => {
    const arr = [...array]; // kopiera så vi inte ändrar originalet
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // slumpa index 0 → i
        [arr[i], arr[j]] = [arr[j], arr[i]]; // byt plats
    }
    return arr;
};
/* ===== AI-HJÄLP ===== */
// Fått hjälp med att sortera så att den kontrollerar errorNmbr först och därefter totalHelp
export const sortingHighScore = (highScore) => {
    highScore.sort((a, b) => {
        // Sortera först på errorNmbr (färre fel först)
        if (a.wrongGuesses !== b.wrongGuesses) {
            return a.wrongGuesses - b.wrongGuesses;
        }
        // Om lika många fel, sortera på totalHelp (färre hjälp först)
        return a.totalHelp - b.totalHelp;
    });
};
export const generatPlayerId = () => {
    let playerId = 'p';
    for (let i = 0; i < 5; i++) {
        const randomNmbr = Math.floor(Math.random() * 10 + 1);
        playerId += randomNmbr;
    }
    return playerId;
};
