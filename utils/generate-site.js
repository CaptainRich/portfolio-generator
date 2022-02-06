
// Allow the usage of the fs module's functions.
const fs = require( 'fs' );


//////////////////////////////////////////////////////////////
// The function to write a file, by creating a 'promise'
const writeFile = fileContent => {
    return new Promise( (resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            // If there's an error, reject the Promise and send the error to the Promise's `.catch()` method
            if (err) {
              reject(err);
              // Return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
              return;
            }
      
            // If everything went well, resolve the Promise and send the successful data to the `.then()` method
            resolve({
              ok: true,
              message: 'File created!'
            });
          });
    } );
};


//////////////////////////////////////////////////////////////
// The function to copy a file, by creating a 'promise'
const copyFile = () => {
    return new Promise( (resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            // On error, reject the Promise and send the error to the Promise's `.catch()` method
            if (err) {
              reject(err);
              // On error, need to return, don't do anything else
              return;
            }
      
            // If everything is ok, resolve the Promise and send the data to the `.then()` method
            resolve({ 
              ok: true,
              message: 'File created!'
            });
          });
    } );
};


//////////////////////////////////////////////////////////////////////////////////
// Export the two functions above

module.exports = {
    writeFile: writeFile,
    copyFile: copyFile
};