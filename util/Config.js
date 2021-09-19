
const fs = require('fs');

let c = {
    file: require('../config.json'),
    update: (key,value) => {
        file.key = value;
        fs.writeFileSync("../config.json", JSON.stringify(this.file, null, 2));
    },
    get: (key) => {
        return this.file[key];
    }
}
class Config {
    file = null;

    constructor() {
        this.file = JSON.parse(fs.readFileSync("./config.json"));
    }
    update(key,value) {
        this.file[key] = value;
        fs.writeFileSync("../config.json", JSON.stringify(this.file,null,2));
    }
    get(key) {
        //console.log(this.file);
        if(this.file !== null) {
            return this.file[key];
        } else {
            return "error";
        }
    }
}
module.exports = new Config();