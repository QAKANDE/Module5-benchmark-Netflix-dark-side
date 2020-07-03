const {readJSON,writeJSON} = require("fs-extra")

const readFromDB =  async (filePath) => {
    const fileJSON = await readJSON(filePath)
    return fileJSON;
}

const writeToDB =  async (filePath,data) => {
     await writeJSON(filePath,data)
}

module.exports = {
    readFromDB,
    writeToDB,
}