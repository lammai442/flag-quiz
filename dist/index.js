const oGameData = {
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
    startTimeInMilliseconds: function () {
        this.startTime = Date.now();
    },
    endTimeInMilliseconds: function () {
        this.endTime = Date.now();
    },
};
// Referenser som behövs i koden
const playBtnRef = document.querySelector('.welcome__play-btn');
const gamefieldRef = document.querySelector('#gamefield');
const welcomeSectionRef = document.querySelector('#welcomeBox');
const flagRef = document.querySelector('#flagSrc');
playBtnRef.addEventListener('click', () => {
    console.log('här ');
    initGame();
});
const initGame = async () => {
    welcomeSectionRef.classList.add('d-none');
    gamefieldRef.classList.toggle('d-none');
    const gameCountries = await fetchCountries();
    flagRef.src = gameCountries[0].flags.png;
};
const fetchCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/region/europe');
        if (!response.ok) {
            throw new Error('Failed to fetch countries');
        }
        const data = (await response.json());
        const shuffledData = shuffleArray(data);
        const fiveCountries = shuffledData.slice(0, 5);
        return fiveCountries;
    }
    catch (error) {
        console.log(error);
        return [];
    }
};
function shuffleArray(array) {
    const arr = [...array]; // kopiera så vi inte ändrar originalet
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // slumpa index 0 → i
        [arr[i], arr[j]] = [arr[j], arr[i]]; // byt plats
    }
    return arr;
}
initGame();
export {};
