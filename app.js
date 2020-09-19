
/* JavaScript file for Portfolio-Generator project. */

const fs           = require( 'fs' );                           /* Include the 'file system' module */
const generatePage = require( './src/page-template.js' );       /* Import from a local module */


/////////////////////////////////////////////////////////////////////////////////////////////
//////// *** This is a sample routine to show argument handling, arrow functions
//////// *** and 'forEach'
/////////////////////////////////////////////////////////////////////////////////////////////
// const profileDataArgs = process.argv.slice(2, process.argv.length);
// console.log( profileDataArgs);

// const printProfileData = profileDataArr => {
//      profileDataArr.forEach( profileItem => console.log(profileItem));
// };
    

// printProfileData(profileDataArgs);



const profileDataArgs = process.argv.slice(2, process.argv.length);
// const uname   = profileDataArgs[0];
// const github = profileDataArgs[1];

const [name, github] = profileDataArgs;


// Write out the generated HTML page to a file.

fs.writeFile( 'index.html', generatePage( name, github ), err => {
    if( err ) throw err;

    console.log( 'Portfolio complete! Check out index.html to see the output!' );
});