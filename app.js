
/* JavaScript file for Portfolio-Generator project. */
/* R. Ay, September 2020 */


// Import the required modules and external file (functions).
const inquirer = require( 'inquirer' );                                /* import the 'inquirer' module, loaded by 'npm' */

const {writeFile, copyFile} = require( './utils/generate-site.js' );   /* import the functions from 'generate-site.js' */
/* Import the HTML template and assign to 'generatePage' */
const generatePage = require( './src/page-template.js' );              


/* ///////////////////////// Mock Data ////////////////////////////////////////////// */
const mockData = 
{
    name: 'Lernantino',
    github: 'lernantino',
    confirmAbout: true,
    about:
      'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
    projects: [
      {
        name: 'Run Buddy',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['HTML', 'CSS'],
        link: 'https://github.com/lernantino/run-buddy',
        feature: true,
        confirmAddProject: true
      },
      {
        name: 'Taskinator',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['JavaScript', 'HTML', 'CSS'],
        link: 'https://github.com/lernantino/taskinator',
        feature: true,
        confirmAddProject: true
      },
      {
        name: 'Taskmaster Pro',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
        link: 'https://github.com/lernantino/taskmaster-pro',
        feature: false,
        confirmAddProject: true
      },
      {
        name: 'Weather Report',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
        languages: ['JavaScript', 'CSS', '3rd Party APIs'],
        link: 'https://github.com/lernantino/robot-gladiators',
        feature: false,
        confirmAddProject: true
      },
      {
        name: 'Robot Gladiators',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
        languages: ['JavaScript'],
        link: 'https://github.com/lernantino/robot-gladiators',
        feature: false,
        confirmAddProject: false
      }
    ]
  };

//console.log( inquirer );


/* ////////////////////////////////////////////////////// 
   Question Section                                    */
/* See the NPM documentation on 'inquirer' for details on the code below. */

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name (Required)?',
            validate: nameInput => {
                if( nameInput ) {
                    return true;
                } else {
                    console.log( "Please enter your name, it is required!" );
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required):',
            validate: nameInput => {
                if( nameInput ) {
                    return true;
                } else {
                    console.log( "Please enter your GitHub Username, it is required !" );
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
          },
        {
            type: 'input',
            name: 'about',     /* This prompt only happens if "confirmAbout" is 'true'. */
            message: 'Provide some information about yourself:',
            when: ( { confirmAbout } ) => confirmAbout
        }
    ]);
};

const promptProject = portfolioData => {
    console.log(`
  =================
  Add a New Project
  =================
  `);

    // If there isn't a 'projects' array property, create it as an empty array.
    if( !portfolioData.projects ) {
        portfolioData.projects = [];
    }


    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project (Required)?',
            validate: nameInput => {
                if( nameInput ) {
                    return true;
                } else {
                    console.log( "Please enter your project name, it is required!" );
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required):',
            validate: nameInput => {
                if( nameInput ) {
                    return true;
                } else {
                    console.log( "Please enter your a project description, it is required." );
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you code this project with? (Check all that apply)?',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required):',
            validate: nameInput => {
                if( nameInput ) {
                    return true;
                } else {
                    console.log( "Please enter your project GitHub link, it is required!" );
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then( projectData => {
        portfolioData.projects.push( projectData );

        // See if another project should be added
        if( projectData.confirmAddProject) {
            return promptProject( portfolioData );
         } else {
            return portfolioData;
        }     
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  
// promptUser()
//   .then(promptProject)
//   .then(portfolioData => {
//     return generatePage(portfolioData);
//   })

//   .then(pageHTML => {
//     return writeFile(pageHTML);
//   })

//   .then(writeFileResponse => {
//     console.log(writeFileResponse);
//     return copyFile();
//   })

//   .then(copyFileResponse => {
//     console.log(copyFileResponse);
//   })

//   .catch(err => {
//     console.log(err);
//   });

// For testing/mocking.  Comment out the above 'promptUser' and its promises, and 
// use the code below instead.
const pageHTML = generatePage(mockData);
writeFile(pageHTML);
