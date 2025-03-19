import { getSign, getZodiac } from "horoscope";

const [month, day, year] = process.argv.slice(2).map(Number);

console.log(`Astrological Sign: ${getSign({ month, day })}`);
console.log(` Chinese Zodiac: ${getZodiac(year)}`);