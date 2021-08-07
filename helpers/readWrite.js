const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const writeFile = (location, data) => {
    fs.writeFile(location, JSON.stringify(data, null, 4), (err) => {
        if(err) {
            console.error(err)
        }
        else {
            console.info(`Data written to ${location}`)
        }
    });
};

const appendDataFile = (newData,location) => {
    readFile(location)
        .then(data => {
            const jsonData = JSON.parse(data);
            jsonData.push(newData);
            writeFile(location, jsonData);
            console.info(`Data appended to ${location}`);
        })
        .catch(error => console.error(error));
};

module.exports = { readFile, appendDataFile, writeFile };
