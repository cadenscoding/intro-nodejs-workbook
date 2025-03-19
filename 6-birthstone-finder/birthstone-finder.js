// Create a Node app that determines the birthstone based on a month inputted by the user. Refer to the README instructions.
import fs from 'fs/promises'; 

const month = process.argv[2];

async function getBirthstone(month) {
  try {
 
    const data = await fs.readFile('./data.json', 'utf8');
    const birthstones = JSON.parse(data);

   
    if (birthstones[month]) {
      console.log(`The birthstone for ${month} is ${birthstones[month]}.`);
    } else {
      console.log('Invalid month entered. Please enter a valid month.');
    }
  } catch (error) {
    console.error('Error reading file:', error);
  }
}


getBirthstone(month);