import type { GameData, Country } from './interfaces/index';

const oGameData: GameData = {
	flags: [],
	startTime: 0,
	endTime: 0,
	nmbrOfGuesses: 0,
	nmbrOfSeconds: 0,
	playerName: '',
	errorNumber: 0,
	nmbrOfCountries: 1,
	reset() {
		this.flags = [];
		this.startTime = 0;
		this.endTime = 0;
		this.nmbrOfGuesses = 0;
		this.nmbrOfSeconds = 0;
		this.playerName = '';
		this.errorNumber = 0;
	},
	startTimeInMilliseconds: function () {
		this.startTime = Date.now();
	},
	endTimeInMilliseconds: function () {
		this.endTime = Date.now();
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
const errorNbrRef = document.querySelector('#errorNbr') as HTMLSpanElement;
const answerFormRef = document.querySelector('#answerForm') as HTMLFormElement;

// När använder trycker på playBtn
playBtnRef.addEventListener('click', () => {
	initGame();
});

const initGame = async (): Promise<void> => {
	welcomeSectionRef.classList.add('d-none');
	gamefieldRef.classList.toggle('d-none');
	errorNbrRef.innerHTML = `${oGameData.errorNumber}`;

	const gameCountries = await fetchCountries();
	flagRef.src = gameCountries[0].flags.png;
	console.log('gameCountries[0].name.common: ', gameCountries[0].name.common);

	answerFormRef.addEventListener('submit', (e) => {
		e.preventDefault();
		let rightAnswer: string = '';
		if (answerInputRef.value === gameCountries[0].name.common) {
			rightAnswer = 'Right';
			console.log('right: ', rightAnswer);
		} else {
			oGameData.errorNumber++;
			errorNbrRef.innerHTML = `${oGameData.errorNumber}`;
		}
	});
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
		const shuffledData: Country[] = shuffleArray(data);
		const fiveCountries: Country[] = shuffledData.slice(
			0,
			oGameData.nmbrOfCountries
		);
		return fiveCountries;
	} catch (error) {
		console.log(error);
		return [];
	}
};

function shuffleArray<T>(array: T[]): T[] {
	const arr = [...array]; // kopiera så vi inte ändrar originalet
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1)); // slumpa index 0 → i
		[arr[i], arr[j]] = [arr[j], arr[i]]; // byt plats
	}
	return arr;
}

initGame();
