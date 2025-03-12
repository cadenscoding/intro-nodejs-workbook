// Here is where you will write your bill splitter code
// let bill = 100;
// let tipPercentage = 0.20;
// let numGuests = 4;

// let tipAmount = bill * tipPercentage;
// let total = bill + tipAmount;
// let amountOwedPerGuest = total / numGuests;

console.log(`Each guest owes: ${amounyOwedPerGuest}`)


let bill = Number(process.argv[2]);
let tipPercentage = Number(process.argv[3]); / 100;
let numGuests = Number(process.argv[4]);

let tipAmount = bill * tipPercentage;
let total = bill + tipAmount;
let amountOwedPerGuest = total / numGuests;

// REQUEST: Received the request from the frontend (in a POST request) to create our bill and calculate the amount that needs to be paid per guest.
// STORE: Send the amountPerGuest, bill, tip, numOfGuest to the database. Run a query to INSERT the data into our data table. 
// RESPONSE: Send the amountOwedPerGuest to the Frontend so that it can be displayed to the user