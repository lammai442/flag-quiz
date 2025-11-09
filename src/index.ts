import type { GameData, Country } from './interfaces/index';
import { generateRandomNmbr } from './utils/index.js';
const randomNumber: number = generateRandomNmbr();

console.log(randomNumber);

const oGameData: GameData = {
	gameCountries: [],
	playerName: '',
	errorNmbr: 0,
	nmbrOfCountries: 5,
	helpNmbr: 1,
	reset() {
		this.playerName = '';
		this.errorNmbr = 0;
	},
};

// Referenser som behövs i koden
const playBtnRef = document.querySelector(
	'.welcome__play-btn'
) as HTMLButtonElement;
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

// När använder trycker på playBtn
playBtnRef.addEventListener('click', () => {
	welcomeSectionRef.classList.add('d-none');
	initGame();
});

const initGame = async (): Promise<void> => {
	gamefieldRef.classList.toggle('d-none');
	errorNmbrRef.innerHTML = `${oGameData.errorNmbr}`;

	const countryList: Country[] = await fetchCountries();
	generateGameCountries(countryList);

	showQuestion(oGameData.gameCountries);

	helpBtnRef.addEventListener('click', () => {
		helpTextRef.innerHTML = `It starts with : ${oGameData.gameCountries[0].name.common.slice(
			0,
			oGameData.helpNmbr
		)}`;
		oGameData.helpNmbr += 1;
	});

	answerFormRef.addEventListener('submit', (e) => {
		e.preventDefault();
		// Vid rätt svar
		if (
			answerInputRef.value.toLowerCase() ===
			oGameData.gameCountries[0].name.common.toLowerCase()
		) {
			oGameData.gameCountries.shift();
			answerInputRef.value = '';
			oGameData.helpNmbr = 1;
			helpTextRef.classList.toggle('d-none');

			if (oGameData.gameCountries.length === 0) {
				endGame();
			} else {
				showQuestion(oGameData.gameCountries);
			}
		} else {
			oGameData.errorNmbr += 1;
			errorNmbrRef.innerHTML = `${oGameData.errorNmbr}`;
		}
	});
};

const showQuestion = (gameCountries: Country[]) => {
	flagRef.src = gameCountries[0].flags.png;
	console.log('gameCountries[0].name.common: ', gameCountries[0].name.common);
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

const generateGameCountries = (countryList: Country[]): void => {
	const shuffledData: Country[] = shuffleArray(countryList);
	oGameData.gameCountries = shuffledData.slice(0, oGameData.nmbrOfCountries);
};

function shuffleArray<T>(array: T[]): T[] {
	const arr = [...array]; // kopiera så vi inte ändrar originalet
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1)); // slumpa index 0 → i
		[arr[i], arr[j]] = [arr[j], arr[i]]; // byt plats
	}
	return arr;
}

const endGame = () => {
	gamefieldRef.classList.toggle('d-none');

	const endgameErrorNmbrRef = document.querySelector(
		'#endgameErrorNmbr'
	) as HTMLSpanElement;
	const endgameSectionRef = document.querySelector('.endgame') as HTMLElement;
	const playAgainBtnRef = document.querySelector(
		'#playAgainBtn'
	) as HTMLButtonElement;

	endgameSectionRef.classList.toggle('d-none');
	endgameErrorNmbrRef.innerHTML = `${oGameData.errorNmbr}`;

	playAgainBtnRef.addEventListener('click', () => {
		oGameData.reset();
		endgameSectionRef.classList.toggle('d-none');
		initGame();
	});
};
