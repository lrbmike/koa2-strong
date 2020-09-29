const path = require('path');

const dbPath = process.cwd() +'/config/db.json';
const dbConfig = require(dbPath);
const _path = path.resolve('./');
dbConfig.modelPath = path.join(_path, '/app/schema');

const orm = require('koa-orm')(dbConfig);
const databases = orm.database();

class ORM {

    constructor(databases) {
        this.databases = databases
    }

    getDatabase() {
        return this.databases
    }

}

let connect = new ORM(databases)

module.exports = {
    connect: connect.getDatabase()
}