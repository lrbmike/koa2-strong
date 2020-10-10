const path = require('path');

const config = global.koa_config;
const dbConfig = config.db;

const root = process.cwd();

const dbPath = path.join(root, dbConfig.settingPath);
const dbJson = require(dbPath);
dbJson.modelPath = path.join(root, dbConfig.modelPath);

const orm = require('koa-orm')(dbJson);
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