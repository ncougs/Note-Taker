//files requried
const dbLocation = './db/db.json';
const fs = require('fs');

newID = () => {
    //read db file
    const db = JSON.parse(fs.readFileSync(dbLocation, 'utf8'));
    //sort by id values
    if(db.length < 1) {
        //If no existing db
        const id = 1
        return id
    }
    else {
        db.sort((a, b) => {return a.id - b.id});
        //get last index in array, new ID = last ID + 1
        const id = db[db.length -1].id + 1;
        //return new id value
        return id
    }
};

module.exports = newID;