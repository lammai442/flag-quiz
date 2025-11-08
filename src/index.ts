import type { GameData, Country } from './interfaces/index';

const oGameData: GameData = {
	gameCountries: [],
	startTime: 0,
	endTime: 0,
	nmbrOfGuesses: 0,
	nmbrOfSeconds: 0,
	playerName: '',
	errorNmbr: 0,
	nmbrOfCountries: 5,
	rightAnswers: 0,
	reset() {
		this.nmbrOfGuesses = 0;
		this.nmbrOfSeconds = 0;
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

// När använder trycker på playBtn
playBtnRef.addEventListener('click', () => {
	initGame();
});

const initGame = async (): Promise<void> => {
	welcomeSectionRef.classList.add('d-none');
	gamefieldRef.classList.toggle('d-none');
	errorNmbrRef.innerHTML = `${oGameData.errorNmbr}`;

	oGameData.gameCountries = await fetchCountries();

	showQuestion(oGameData.gameCountries);

	answerFormRef.addEventListener('submit', (e) => {
		e.preventDefault();
		// Vid rätt svar
		if (
			answerInputRef.value.toLowerCase() ===
			oGameData.gameCountries[0].name.common.toLowerCase()
		) {
			oGameData.gameCountries.shift();

			if (oGameData.gameCountries.length === 0) {
				endGame();
			} else {
				answerInputRef.value = '';
				showQuestion(oGameData.gameCountries);
			}
		} else {
			console.log('fel');

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

const endGame = () => {
	gamefieldRef.classList.toggle('d-none');

	const endgameErrorNmbrRef = document.querySelector(
		'#endgameErrorNmbr'
	) as HTMLSpanElement;
	const endgameSectionRef = document.querySelector('.endgame') as HTMLElement;

	endgameSectionRef.classList.toggle('d-none');
	endgameErrorNmbrRef.innerHTML = `${oGameData.errorNmbr}`;
};

// initGame();
