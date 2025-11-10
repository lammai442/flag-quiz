import { shuffleArray } from './utils/index.js';
import { getHighScore } from './data/index.js';
const oGameData = {
    gameCountries: [],
    playerName: '',
    errorNmbr: 0,
    nmbrOfCountries: 5,
    helpNmbr: 1,
    reset() {
        this.playerName = '';
        this.errorNmbr = 0;
        this.gameCountries = [];
    },
};
const highScore = getHighScore();
const newGamePlayer = {
    playerName: 'Olle',
    errorNmbr: 1,
};
const highScoreListRef = document.querySelector('#highScoreList');
highScore.forEach((score) => {
    const listItemElement = document.createElement('li');
    listItemElement.innerText = `Player: ${score.playerName} with ${score.errorNmbr} errors.`;
    highScoreListRef.appendChild(listItemElement);
});
// Referenser som behövs i koden
const playBtnRef = document.querySelector('.welcome__play-btn');
const gamefieldRef = document.querySelector('#gamefield');
const welcomeSectionRef = document.querySelector('#welcomeBox');
const flagRef = document.querySelector('#flagSrc');
const answerInputRef = document.querySelector('#answerInput');
const answerBtnRef = document.querySelector('#answerBtn');
const errorNmbrRef = document.querySelector('#errorNmbr');
const answerFormRef = document.querySelector('#answerForm');
const helpBtnRef = document.querySelector('#helpBtn');
const helpTextRef = document.querySelector('#helpText');
// När använder trycker på playBtn
playBtnRef.addEventListener('click', () => {
    initGame();
});
// Initiering av spelet
const initGame = async () => {
    welcomeSectionRef.classList.add('d-none');
    gamefieldRef.classList.toggle('d-none');
    errorNmbrRef.innerHTML = `${oGameData.errorNmbr}`;
    const countryList = await fetchCountries();
    generateGameCountries(countryList);
    showQuestion(oGameData.gameCountries);
    helpBtnRef.addEventListener('click', () => {
        helpTextRef.innerHTML = `It starts with : ${oGameData.gameCountries[0].name.common.slice(0, oGameData.helpNmbr)}`;
        oGameData.helpNmbr += 1;
    });
    answerFormRef.addEventListener('submit', (e) => {
        e.preventDefault();
        // Vid rätt svar
        if (answerInputRef.value.toLowerCase() ===
            oGameData.gameCountries[0].name.common.toLowerCase()) {
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
            oGameData.errorNmbr += 1;
            errorNmbrRef.innerHTML = `${oGameData.errorNmbr}`;
        }
    });
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
const generateGameCountries = (countryList) => {
    const shuffledData = shuffleArray(countryList);
    oGameData.gameCountries = shuffledData.slice(0, oGameData.nmbrOfCountries);
};
const endGame = () => {
    gamefieldRef.classList.toggle('d-none');
    const endgameErrorNmbrRef = document.querySelector('#endgameErrorNmbr');
    const endgameSectionRef = document.querySelector('.endgame');
    const playAgainBtnRef = document.querySelector('#playAgainBtn');
    endgameSectionRef.classList.toggle('d-none');
    endgameErrorNmbrRef.innerHTML = `${oGameData.errorNmbr}`;
    playAgainBtnRef.addEventListener('click', () => {
        oGameData.reset();
        endgameSectionRef.classList.toggle('d-none');
        initGame();
    });
};
