// Your code will go here!
let humanYears = Number(process.argv[2]); 
let dogYears;
let dogName = process.argv[3];

if (humanYears === 1) {
    dogYears = 15;
} else if (humanYears === 2) {
    dogYears = 15 + 9;
} else if (humanYears > 2) {
    dogYears = 15 + 9 + (humanYears - 2) * 5;
};


console.log(`Your dog ${dogName} is ${dogYears} old in dog years`)