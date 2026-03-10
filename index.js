require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

console.log('=== INFORMATION FROM .ENV ===');
console.log(`Name: ${process.env.NAME}`);
console.log(`Surname: ${process.env.SURNAME}`);
console.log(`Group: ${process.env.GROUP}`);
console.log(`Student Number: ${process.env.STUDENT_NUMBER}`);
console.log(`Current Mode: ${process.env.MODE}`);

function showCurrentMode() {
    console.log(`\n=== CURRENT APPLICATION MODE ===`);
    console.log(`Application is running in ${process.env.MODE} mode`);
}

showCurrentMode();