import { shuffleArray } from './utils/index.ts';
// Referenser som behövs i koden
const playBtnRef = document.querySelector('.welcome__play-btn');
const gamefieldRef = document.querySelector('#gamefield');
const welcomeSectionRef = document.querySelector('#welcomeBox');
playBtnRef.addEventListener('click', () => {
    initGame();
});
const initGame = () => {
    welcomeSectionRef.classList.add('d-none');
    gamefieldRef.classList.toggle('d-none');
};
const flagSetup = async () => {
    const countryList = await fetchCountries();
};
const fetchCountries = async () => {
    console.log('där');
    try {
        const response = await fetch('https://restcountries.com/v3.1/region/europe');
        if (response.ok) {
            const data = await response.json();
            const shuffledData = shuffleArray(data);
            console.log('data: ', shuffledData);
        }
    }
    catch (error) { }
};
fetchCountries();
//# sourceMappingURL=index.js.map