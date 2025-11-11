import { shuffleArray } from './utils/index.js';
import { updateLocalStorage, oGameData } from './data/index.js';
// Referenser som behövs i koden
const welcomeFormRef = document.querySelector('#welcomeForm');
const gamefieldRef = document.querySelector('#gamefield');
const welcomeSectionRef = document.querySelector('#welcomeBox');
const flagRef = document.querySelector('#flagSrc');
const answerInputRef = document.querySelector('#answerInput');
const answerFormRef = document.querySelector('#answerForm');
const helpBtnRef = document.querySelector('#helpBtn');
const helpTextRef = document.querySelector('#helpText');
const questionNmbrRef = document.querySelector('#questionNmbr');
// När spelaren trycker på playBtn
welcomeFormRef.addEventListener('submit', (e) => {
    e.preventDefault();
    initGame();
});
// Initiering av spelet
const initGame = async () => {
    welcomeSectionRef.classList.add('d-none');
    gamefieldRef.classList.remove('d-none');
    const playerInputRef = document.querySelector('#playerInput');
    oGameData.playerName = playerInputRef.value;
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
    flagRef.src = gameCountries[0].flags.png;
    questionNmbrRef.textContent = `${oGameData.questionNmbr}`;
};
const fetchCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/region/europe');
        if (!response.ok) {
            throw new Error('Failed to fetch countries');
        }
        const data = (await response.json());
        return data;
    }
    catch (error) {
        console.log(error);
        return [];
    }
};
const generateGameCountries = async () => {
    const countryList = await fetchCountries();
    const shuffledData = shuffleArray(countryList);
    oGameData.gameCountries = shuffledData.slice(0, oGameData.nmbrOfCountries);
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
    highScore.forEach((score) => {
        const listItemElement = document.createElement('li');
        listItemElement.innerHTML = `Player: <strong>${score.playerName}</strong> with <strong>${score.wrongGuesses}</strong> wrong guesses and <strong>${score.totalHelp}</strong> helps`;
        highScoreListRef.appendChild(listItemElement);
    });
};
