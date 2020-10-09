# koa2-strong
The framework integrates many commonly used modules, and based on Koa2  
Includes koa-orm、koa-router、koa-bodyparser、koa-session2、koa-static、koa-ejs and integrate into a more mvc-like model.

## Installation
npm install koa2-strong

## Usage Specification
to use this module, your project need to meet the specification

* **directory structure**

```html
├── app
    ├── common 
    ├── controllers 
    ├── middleware 
    ├── models 
    ├── schema 
    ├── service 
        ├── sys 
├── config 
├── logs 
├── public 
    ├── views 
```

* **config files**

includes 'db.json'、'routes.js' config file in the 'config' directory  

'db.json' like this:
```json
{
  "db": "db_name",
  "username": "user_name",
  "password": "pass_word",
  "dialect": "mysql",
  "host": "127.0.0.1",
  "port": "3306",
  "pool": {
    "max": 5,
    "min": 0,
    "acquire": 30000,
    "idle": 10000
  }
}
```

'routes.js' like this:
```js
module.exports = {
    'get /': 'index#index',

    'get /user/get': 'index#userGet',
    'get /user/get/:id': 'index#userGetId'
}
```


## Usage

app.js like this:
```js
// use Application module, and include some modules with the default setting
const app = require('koa2-strong').Application;
// the default port is 9012.
app.start();
```

if you need orm module, you can require the 'ORM' module and create the base model file  

the BaseModel.js like this:
```js
// use 'sequelize' module, other model can extend this base model to get the db object(this.orm)

const ORM = require('koa2-strong').ORM;
const myLog4js = require('koa2-strong').Logger;

class BaseModel {

    constructor(opts){
        this.opts = opts || {};
        this.orm = ORM;
        this.model = this.opts.model;
        this.attrs = this.opts.attrs;
        this.list_attrs = this.opts.list_attrs
        this.logger = myLog4js;
    }

    /**
     * get by pk
     *
     * @param id
     * @returns {Promise<any>}
     */
    async get(id) {
        return await this.orm[this.model].findByPk(id);
    }

    /**
     * get one record by clause
     *
     * @param clause
     * @returns {Promise<any>}
     */
    async getOne(clause) {
        return await this.orm[this.model].findOne({
            attributes: this.attrs,
            where: clause
        });
    }
    
}

module.exports = BaseModel
```