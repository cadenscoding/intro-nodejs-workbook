// Create a program that checks to see if the current year is leap year using the Moment module.
import moment from 'moment'; 

function isLeapYear(year) {
  return moment(year, 'YYYY').isLeapYear();
}

const currentYear = moment().year(); // Get the current year
if (isLeapYear(currentYear)) {
  console.log(`${currentYear} is a leap year!`);
} else {
  console.log(`${currentYear} is not a leap year.`);
}