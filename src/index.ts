import type { Country, NewGamePlayer } from './interfaces/index';
import { shuffleArray } from './utils/index.js';
import { updateLocalStorage, oGameData } from './data/index.js';

// Referenser som behövs i koden
const welcomeFormRef = document.querySelector(
	'#welcomeForm'
) as HTMLFormElement;
const gamefieldRef = document.querySelector('#gamefield') as HTMLElement;
const welcomeSectionRef = document.querySelector('#welcomeBox') as HTMLElement;
const flagRef = document.querySelector('#flagSrc') as HTMLImageElement;
const answerInputRef = document.querySelector(
	'#answerInput'
) as HTMLInputElement;
const answerFormRef = document.querySelector('#answerForm') as HTMLFormElement;
const helpBtnRef = document.querySelector('#helpBtn') as HTMLButtonElement;
const helpTextRef = document.querySelector('#helpText') as HTMLSpanElement;

// När spelaren trycker på playBtn
welcomeFormRef.addEventListener('submit', (e: SubmitEvent) => {
	e.preventDefault();
	initGame();
});

// Initiering av spelet
const initGame = async (): Promise<void> => {
	welcomeSectionRef.classList.add('d-none');
	gamefieldRef.classList.remove('d-none');

	const playerInputRef = document.querySelector(
		'#playerInput'
	) as HTMLInputElement;

	oGameData.playerName = playerInputRef.value;

	await generateGameCountries();

	showQuestion(oGameData.gameCountries);
};

// Lyssnare när spelaren skickar in svaret
answerFormRef.addEventListener('submit', (e: SubmitEvent) => {
	e.preventDefault();
	checkAnswer();
});

const checkAnswer = (): void => {
	const errorMsgRef = document.querySelector('#errorMsg') as HTMLSpanElement;

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

// När spelaren väljer att trycka på helpBtn
helpBtnRef.addEventListener('click', (): void => {
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

const showQuestion = (gameCountries: Country[]): void => {
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
	const endgameTitleRef = document.querySelector(
		'#endgameTitle'
	) as HTMLHeadingElement;

	gamefieldRef.classList.add('d-none');
	endgameSectionRef.classList.remove('d-none');
	endgameTitleRef.textContent = `Congratulations ${oGameData.playerName}!`;
	endgameWrongGuessesRef.innerHTML = `${oGameData.wrongGuesses}`;
	endgameTotalHelpRef.textContent = `${oGameData.totalHelp}`;

	const NewGamePlayer: NewGamePlayer = {
		playerName: oGameData.playerName,
		wrongGuesses: oGameData.wrongGuesses,
		totalHelp: oGameData.totalHelp,
	};

	const highScore: NewGamePlayer[] = updateLocalStorage(NewGamePlayer);
	setupHighScore(highScore);

	playAgainBtnRef.addEventListener('click', () => {
		oGameData.reset();
		endgameSectionRef.classList.add('d-none');
		welcomeSectionRef.classList.remove('d-none');
		const highScoreListRef = document.querySelector(
			'#highScoreList'
		) as HTMLUListElement;
		highScoreListRef.innerHTML = '';
	});
};

const setupHighScore = (highScore: NewGamePlayer[]): void => {
	const highScoreListRef = document.querySelector(
		'#highScoreList'
	) as HTMLUListElement;

	highScore.forEach((score) => {
		const listItemElement = document.createElement('li') as HTMLLIElement;
		listItemElement.innerHTML = `Player: <strong>${score.playerName}</strong> with <strong>${score.wrongGuesses}</strong> wrong guesses and <strong>${score.totalHelp}</strong> helps`;
		highScoreListRef.appendChild(listItemElement);
	});
};
