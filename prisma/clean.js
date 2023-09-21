const fs = require('fs-extra');
const path = require("path");

const pathDbTest = path.join(__dirname, `./test/`)
fs.removeSync(pathDbTest, (err) => console.log(err))