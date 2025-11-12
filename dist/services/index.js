import { shuffleArray } from '../utils/index.js';
import { oGameData } from '../data/index.js';
export const generateGameCountries = async () => {
    const countryList = await fetchCountries();
    const shuffledData = shuffleArray(countryList);
    oGameData.gameCountries = shuffledData.slice(0, oGameData.nmbrOfCountries);
};
const fetchCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/region/europe');
        if (!response.ok) {
            throw new Error('Failed to fetch countries');
        }
        const data = (await response.json());
        return data;
    }
    catch (error) {
        console.log(error);
        return [];
    }
};
