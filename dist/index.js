// import { shuffleArray } from './utils/index.js';
import { updateLocalStorage } from './data/localStorage.js';
import { oGameData } from './data/index.js';
import { generateGameCountries } from './services/index.js';
// Referenser som behövs i koden
const welcomeFormRef = document.querySelector('#welcomeForm');
const gamefieldRef = document.querySelector('#gamefield');
const welcomeSectionRef = document.querySelector('#welcomeBox');
const answerFormRef = document.querySelector('#answerForm');
const helpBtnRef = document.querySelector('#helpBtn');
const helpTextRef = document.querySelector('#helpText');
// När spelaren trycker på playBtn
welcomeFormRef.addEventListener('submit', (e) => {
    e.preventDefault();
    initGame();
});
// Initiering av spelet
const initGame = async () => {
    welcomeSectionRef.classList.add('d-none');
    gamefieldRef.classList.remove('d-none');
    const gameFieldPlayerRef = document.querySelector('#gameFieldPlayer');
    const playerInputRef = document.querySelector('#playerInput');
    oGameData.playerName = playerInputRef.value;
    gameFieldPlayerRef.innerHTML = `Player: ${oGameData.playerName}`;
    await generateGameCountries();
    showQuestion(oGameData.gameCountries);
};
// Lyssnare när spelaren skickar in svaret
answerFormRef.addEventListener('submit', (e) => {
    e.preventDefault();
    checkAnswer();
});
const checkAnswer = () => {
    const errorMsgRef = document.querySelector('#errorMsg');
    const answerInputRef = document.querySelector('#answerInput');
    // Vid rätt svar
    if (answerInputRef.value.toLowerCase() ===
        oGameData.gameCountries[0].name.common.toLowerCase()) {
        errorMsgRef.classList.add('d-none');
        oGameData.gameCountries.shift();
        answerInputRef.value = '';
        oGameData.helpNmbr = 1;
        helpTextRef.textContent = 'Help?';
        oGameData.questionNmbr++;
        if (oGameData.gameCountries.length === 0) {
            endGame();
        }
        else {
            showQuestion(oGameData.gameCountries);
        }
    }
    else {
        errorMsgRef.classList.remove('d-none');
        oGameData.wrongGuesses += 1;
    }
};
// När spelaren väljer att trycka på helpBtn
helpBtnRef.addEventListener('click', () => {
    giveHelp();
});
const giveHelp = () => {
    const countryName = oGameData.gameCountries[0].name.common;
    helpTextRef.innerHTML = `It starts with : ${countryName.slice(0, oGameData.helpNmbr)}`;
    if (oGameData.helpNmbr < countryName.length) {
        oGameData.totalHelp += 1;
        oGameData.helpNmbr += 1;
    }
};
const showQuestion = (gameCountries) => {
    const questionNmbrRef = document.querySelector('#questionNmbr');
    const flagRef = document.querySelector('#flagSrc');
    flagRef.src = gameCountries[0].flags.png;
    questionNmbrRef.textContent = `${oGameData.questionNmbr}`;
};
const endGame = () => {
    const endgameWrongGuessesRef = document.querySelector('#endgameWrongGuesses');
    const endgameTotalHelpRef = document.querySelector('#endgameTotalHelp');
    const endgameSectionRef = document.querySelector('.endgame');
    const playAgainBtnRef = document.querySelector('#playAgainBtn');
    const endgameTitleRef = document.querySelector('#endgameTitle');
    gamefieldRef.classList.add('d-none');
    endgameSectionRef.classList.remove('d-none');
    endgameTitleRef.textContent = `Congratulations ${oGameData.playerName}!`;
    endgameWrongGuessesRef.innerHTML = `${oGameData.wrongGuesses}`;
    endgameTotalHelpRef.textContent = `${oGameData.totalHelp}`;
    const NewGamePlayer = {
        playerName: oGameData.playerName,
        wrongGuesses: oGameData.wrongGuesses,
        totalHelp: oGameData.totalHelp,
        playerId: oGameData.playerId,
    };
    const highScore = updateLocalStorage(NewGamePlayer);
    setupHighScore(highScore);
    playAgainBtnRef.addEventListener('click', () => {
        oGameData.reset();
        endgameSectionRef.classList.add('d-none');
        welcomeSectionRef.classList.remove('d-none');
        const highScoreListRef = document.querySelector('#highScoreList');
        highScoreListRef.innerHTML = '';
    });
};
const setupHighScore = (highScore) => {
    const highScoreListRef = document.querySelector('#highScoreList');
    const endgameSubtitleRef = document.querySelector('#endgameSubtitle');
    // Kontroll om nuvarande spelare är med i highscore
    const isActivePlayerInTop5 = highScore.some((score) => score.playerId === oGameData.playerId);
    if (isActivePlayerInTop5) {
        endgameSubtitleRef.innerHTML = 'Good job, you made it to top 5!';
    }
    else {
        endgameSubtitleRef.innerHTML =
            'Not top 5 this time but you get it next time!';
    }
    highScore.forEach((score) => {
        const listItemElement = document.createElement('li');
        listItemElement.innerHTML = `Player: <strong>${score.playerName}</strong> with <strong>${score.wrongGuesses}</strong> wrong guesses and <strong>${score.totalHelp}</strong> helps`;
        // Om spelaren aktiv är med i highscore ska den färgläggas
        if (score.playerId === oGameData.playerId) {
            listItemElement.classList.add('active-player');
        }
        highScoreListRef.appendChild(listItemElement);
    });
};
