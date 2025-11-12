import type { Country } from '../interfaces/index';
import { shuffleArray } from '../utils/index.js';
import { oGameData } from '../data/index.js';

export const generateGameCountries = async (): Promise<void> => {
	const countryList: Country[] = await fetchCountries();

	const shuffledData: Country[] = shuffleArray(countryList);
	oGameData.gameCountries = shuffledData.slice(0, oGameData.nmbrOfCountries);
};

const fetchCountries = async (): Promise<Country[]> => {
	try {
		const response: Response = await fetch(
			'https://restcountries.com/v3.1/region/europe'
		);
		if (!response.ok) {
			throw new Error('Failed to fetch countries');
		}
		const data: Country[] = (await response.json()) as Country[];

		return data;
	} catch (error) {
		console.log(error);
		return [];
	}
};
