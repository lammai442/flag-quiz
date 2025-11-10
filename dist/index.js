import { shuffleArray } from './utils/index.js';
import { getHighScore, oGameData } from './data/index.js';
const highScore = getHighScore();
const highScoreListRef = document.querySelector('#highScoreList');
highScore.forEach((score) => {
    const listItemElement = document.createElement('li');
    listItemElement.innerText = `Player: ${score.playerName} with ${score.wrongGuesses} errors and ${score.helpNmbr} helps`;
    highScoreListRef.appendChild(listItemElement);
});
// Referenser som behövs i koden
const playBtnRef = document.querySelector('#formPlayBtn');
const gamefieldRef = document.querySelector('#gamefield');
const welcomeSectionRef = document.querySelector('#welcomeBox');
const flagRef = document.querySelector('#flagSrc');
const answerInputRef = document.querySelector('#answerInput');
const answerBtnRef = document.querySelector('#answerBtn');
const errorNmbrRef = document.querySelector('#errorNmbr');
const answerFormRef = document.querySelector('#answerForm');
const helpBtnRef = document.querySelector('#helpBtn');
const helpTextRef = document.querySelector('#helpText');
// När användaren trycker på playBtn
playBtnRef.addEventListener('click', (e) => {
    e.preventDefault();
    initGame();
});
// Initiering av spelet
const initGame = async () => {
    welcomeSectionRef.classList.add('d-none');
    gamefieldRef.classList.toggle('d-none');
    const playerInputRef = document.querySelector('#playerInput');
    oGameData.playerName = playerInputRef.value;
    await generateGameCountries();
    showQuestion(oGameData.gameCountries);
};
answerFormRef.addEventListener('submit', (e) => {
    e.preventDefault();
    checkAnswer();
});
const checkAnswer = () => {
    const errorMsgRef = document.querySelector('#errorMsg');
    console.log(oGameData);
    // Vid rätt svar
    if (answerInputRef.value.toLowerCase() ===
        oGameData.gameCountries[0].name.common.toLowerCase()) {
        errorMsgRef.classList.add('d-none');
        oGameData.gameCountries.shift();
        answerInputRef.value = '';
        oGameData.helpNmbr = 1;
        helpTextRef.textContent = 'Help?';
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
    gamefieldRef.classList.toggle('d-none');
    const endgameWrongGuessesRef = document.querySelector('#endgameWrongGuesses');
    const endgameTotalHelpRef = document.querySelector('#endgameTotalHelp');
    const endgameSectionRef = document.querySelector('.endgame');
    const playAgainBtnRef = document.querySelector('#playAgainBtn');
    endgameSectionRef.classList.toggle('d-none');
    endgameWrongGuessesRef.innerHTML = `${oGameData.wrongGuesses}`;
    endgameTotalHelpRef.textContent = `${oGameData.totalHelp}`;
    playAgainBtnRef.addEventListener('click', () => {
        oGameData.reset();
        endgameSectionRef.classList.toggle('d-none');
        initGame();
    });
};
