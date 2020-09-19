
/* JavaScript file for Portfolio-Generator project. */

const inquirer = require( 'inquirer' );   /* import the 'inquirer' module, loaded by 'npm' */

//console.log( inquirer );


/* ////////////////////////////////////////////////////// 
   Question Section                                    */

inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        }
    ])
    .then( answers => console.log( answers ) );
    