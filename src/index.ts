const playBtnRef = document.querySelector(
	'.welcome__play-btn'
) as HTMLButtonElement;

playBtnRef.addEventListener('click', () => {
	const welcomeSectionRef = document.querySelector(
		'#welcomeBox'
	) as HTMLElement;

	const gamefieldRef = document.querySelector('#gamefield') as HTMLElement;
	welcomeSectionRef.classList.add('d-none');
	gamefieldRef.classList.toggle('d-none');
});
