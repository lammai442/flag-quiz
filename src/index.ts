import type { GameData } from './interfaces/index';

const oGameData: GameData = {
	flags: [],
	startTime: 0,
	endTime: 0,
	nmbrOfGuesses: 0,
	nmbrOfSeconds: 0,
	playerName: '',
	reset() {
		this.flags = [];
		this.startTime = 0;
		this.endTime = 0;
		this.nmbrOfGuesses = 0;
		this.nmbrOfSeconds = 0;
		this.playerName = '';
	},
};
console.log('oGameData: ', oGameData);

// Referenser som behövs i koden
const playBtnRef = document.querySelector(
	'.welcome__play-btn'
) as HTMLButtonElement;
const gamefieldRef = document.querySelector('#gamefield') as HTMLElement;
const welcomeSectionRef = document.querySelector('#welcomeBox') as HTMLElement;

playBtnRef.addEventListener('click', () => {
	console.log('här ');
	initGame();
});
const initGame = (): void => {
	welcomeSectionRef.classList.add('d-none');
	gamefieldRef.classList.toggle('d-none');

	fetchCountries();
};

const flagSetup = async (): Promise<void> => {
	const countryList = await fetchCountries();
};

const fetchCountries = async (): Promise<void> => {
	try {
		const response: Response = await fetch(
			'https://restcountries.com/v3.1/region/europe'
		);
		if (response.ok) {
			const data = await response.json();
			const shuffledData = shuffleArray(data);
			console.log('data: ', shuffledData);
		}
	} catch (error) {}
};

function shuffleArray<T>(array: T[]): T[] {
	const arr = [...array]; // kopiera så vi inte ändrar originalet
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1)); // slumpa index 0 → i
		[arr[i], arr[j]] = [arr[j], arr[i]]; // byt plats
	}
	return arr;
}
