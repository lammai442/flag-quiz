import type { GameData, Country, NewGamePlayer } from './interfaces/index';
import { shuffleArray } from './utils/index.js';
import { updateLocalStorage, getHighScore, oGameData } from './data/index.js';

const highScore: NewGamePlayer[] = getHighScore();

const highScoreListRef = document.querySelector(
	'#highScoreList'
) as HTMLUListElement;

highScore.forEach((score) => {
	const listItemElement = document.createElement('li') as HTMLLIElement;
	listItemElement.innerText = `Player: ${score.playerName} with ${score.wrongGuesses} errors and ${score.helpNmbr} helps`;
	highScoreListRef.appendChild(listItemElement);
});

// Referenser som behövs i koden
const playBtnRef = document.querySelector('#formPlayBtn') as HTMLButtonElement;
const gamefieldRef = document.querySelector('#gamefield') as HTMLElement;
const welcomeSectionRef = document.querySelector('#welcomeBox') as HTMLElement;
const flagRef = document.querySelector('#flagSrc') as HTMLImageElement;
const answerInputRef = document.querySelector(
	'#answerInput'
) as HTMLInputElement;
const answerBtnRef = document.querySelector('#answerBtn') as HTMLButtonElement;
const errorNmbrRef = document.querySelector('#errorNmbr') as HTMLSpanElement;
const answerFormRef = document.querySelector('#answerForm') as HTMLFormElement;
const helpBtnRef = document.querySelector('#helpBtn') as HTMLButtonElement;
const helpTextRef = document.querySelector('#helpText') as HTMLSpanElement;

// När användaren trycker på playBtn
playBtnRef.addEventListener('click', (e: MouseEvent) => {
	e.preventDefault();
	initGame();
});

// Initiering av spelet
const initGame = async (): Promise<void> => {
	welcomeSectionRef.classList.add('d-none');
	gamefieldRef.classList.toggle('d-none');

	const playerInputRef = document.querySelector(
		'#playerInput'
	) as HTMLInputElement;

	oGameData.playerName = playerInputRef.value;

	await generateGameCountries();

	showQuestion(oGameData.gameCountries);
};

answerFormRef.addEventListener('submit', (e) => {
	e.preventDefault();
	checkAnswer();
});

const checkAnswer = (): void => {
	const errorMsgRef = document.querySelector('#errorMsg') as HTMLSpanElement;
	console.log(oGameData);

	// Vid rätt svar
	if (
		answerInputRef.value.toLowerCase() ===
		oGameData.gameCountries[0].name.common.toLowerCase()
	) {
		errorMsgRef.classList.add('d-none');
		oGameData.gameCountries.shift();
		answerInputRef.value = '';
		oGameData.helpNmbr = 1;
		helpTextRef.textContent = 'Help?';

		if (oGameData.gameCountries.length === 0) {
			endGame();
		} else {
			showQuestion(oGameData.gameCountries);
		}
	} else {
		errorMsgRef.classList.remove('d-none');
		oGameData.wrongGuesses += 1;
	}
};

helpBtnRef.addEventListener('click', () => {
	giveHelp();
});

const giveHelp = (): void => {
	const countryName: string = oGameData.gameCountries[0].name.common;

	helpTextRef.innerHTML = `It starts with : ${countryName.slice(
		0,
		oGameData.helpNmbr
	)}`;
	if (oGameData.helpNmbr < countryName.length) {
		oGameData.totalHelp += 1;
		oGameData.helpNmbr += 1;
	}
};

const showQuestion = (gameCountries: Country[]) => {
	flagRef.src = gameCountries[0].flags.png;
};

const fetchCountries = async (): Promise<Country[]> => {
	try {
		const response: Response = await fetch(
			'https://restcountries.com/v3.1/region/europe'
		);
		if (!response.ok) {
			throw new Error('Failed to fetch countries');
		}
		const data = (await response.json()) as Country[];

		return data;
	} catch (error) {
		console.log(error);
		return [];
	}
};

const generateGameCountries = async (): Promise<void> => {
	const countryList: Country[] = await fetchCountries();

	const shuffledData: Country[] = shuffleArray(countryList);
	oGameData.gameCountries = shuffledData.slice(0, oGameData.nmbrOfCountries);
};

const endGame = () => {
	gamefieldRef.classList.toggle('d-none');

	const endgameWrongGuessesRef = document.querySelector(
		'#endgameWrongGuesses'
	) as HTMLSpanElement;
	const endgameTotalHelpRef = document.querySelector(
		'#endgameTotalHelp'
	) as HTMLSpanElement;
	const endgameSectionRef = document.querySelector('.endgame') as HTMLElement;
	const playAgainBtnRef = document.querySelector(
		'#playAgainBtn'
	) as HTMLButtonElement;

	endgameSectionRef.classList.toggle('d-none');
	endgameWrongGuessesRef.innerHTML = `${oGameData.wrongGuesses}`;
	endgameTotalHelpRef.textContent = `${oGameData.totalHelp}`;

	playAgainBtnRef.addEventListener('click', () => {
		oGameData.reset();
		endgameSectionRef.classList.toggle('d-none');
		initGame();
	});
};
