import { oGameData } from './oGameData';

// Referenser som behövs i koden
const playBtnRef = document.querySelector(
	'.welcome__play-btn'
) as HTMLButtonElement;
const gamefieldRef = document.querySelector('#gamefield') as HTMLElement;
const welcomeSectionRef = document.querySelector('#welcomeBox') as HTMLElement;

playBtnRef.addEventListener('click', () => {
	welcomeSectionRef.classList.add('d-none');
	gamefieldRef.classList.toggle('d-none');

	initGame();
});

const initGame = (): void => {};
