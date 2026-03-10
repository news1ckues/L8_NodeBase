require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const { sortObjectsByPropertyIgnoreSpaces } = require('./modules/sort-module');
const { fetchData } = require('./modules/fetch-module');
const fileSystem = require('./modules/file-system-module');

async function demonstrateModules() {
    console.log('=== USING CUSTOM MODULES ===\n');
    
    console.log('1. Fetching users from JSONPlaceholder...');
    const result = await fetchData('https://jsonplaceholder.typicode.com/users');
    
    if (result.error) {
        console.error('Failed to fetch users:', result.error);
        return;
    }
    
    const users = result.data;
    console.log(`Loaded ${users.length} users\n`);

    console.log('2. Sorting users by name...');
    const sortedUsers = sortObjectsByPropertyIgnoreSpaces(users, 'name');
    console.log('First 3 users after sorting:');
    sortedUsers.slice(0, 3).forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.name}`);
    });
    console.log('');
    
    console.log('3. Creating directory structure...');
    
    await fileSystem.createDirAsync('users');
    
    const names = users.map(user => user.name).join('\n');
    const emails = users.map(user => user.email).join('\n');
    
    console.log('   Writing names to names.txt...');
    await fileSystem.writeFileAsync('users/names.txt', names);
    
    console.log('   Writing emails to emails.txt...');
    await fileSystem.writeFileAsync('users/emails.txt', emails);
    
    console.log('\n4. Verifying created files...');
    
    const savedNames = await fileSystem.readFileAsync('users/names.txt');
    const savedEmails = await fileSystem.readFileAsync('users/emails.txt');
    
    console.log(`   names.txt contains ${savedNames.split('\n').length} names`);
    console.log(`   First name: ${savedNames.split('\n')[0]}`);
    console.log(`   emails.txt contains ${savedEmails.split('\n').length} emails`);
    console.log(`   First email: ${savedEmails.split('\n')[0]}`);
    
    console.log('\n5. All non-served files in project:');
    const allFiles = fileSystem.getAllFilesSync();
    allFiles.slice(0, 10).forEach((file, index) => {
        console.log(`   ${index + 1}. ${file}`);
    });
    
    if (allFiles.length > 10) {
        console.log(`   ... and ${allFiles.length - 10} more files`);
    }
}

demonstrateModules().catch(console.error);

console.log('\n=== CURRENT MODE ===');
console.log(`Application is running in ${process.env.MODE || 'development'} mode`);