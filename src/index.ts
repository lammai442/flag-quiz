import { oGameData } from './oGameData';
import { shuffleArray } from './utils/index.ts';

// Referenser som behövs i koden
const playBtnRef = document.querySelector(
	'.welcome__play-btn'
) as HTMLButtonElement;
const gamefieldRef = document.querySelector('#gamefield') as HTMLElement;
const welcomeSectionRef = document.querySelector('#welcomeBox') as HTMLElement;

playBtnRef.addEventListener('click', () => {
	initGame();
});

const initGame = (): void => {
	welcomeSectionRef.classList.add('d-none');
	gamefieldRef.classList.toggle('d-none');
};

const flagSetup = async (): Promise<void> => {
	const countryList = await fetchCountries();
};

const fetchCountries = async (): Promise<void> => {
	console.log('där');

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

fetchCountries();
