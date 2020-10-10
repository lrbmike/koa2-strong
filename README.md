# koa2-strong
The framework integrates many commonly used modules, and based on Koa2. Includes koa-orm(sequelize)、koa-router、koa-bodyparser、koa-session2、koa-static、koa-ejs and integrate into a more MVC-like model.

## Installation
npm install koa2-strong

## Recommendation
Here are some specification recommendations.

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

the 'config' directory holds the project configuration files, such as database configuration file、router configuration file...

for example, router configuration file 'routes.js' like this:
```js
module.exports = {
    'get /': 'index#index',

    'get /user/get/:id': 'index#userGetId'
}
```


## Usage

this module has a default setting(you must conform to the specifications), now you can use the setting file to configure different modules, just add a 'setting.json' file in the config directory

'setting.json' like this
```json
{
  "session": {
    "key": "koa2-strong"
  },
  "static": {
    "root": "/public"
  },
  "render": {
    "root": "/public/views",
    "layout": false,
    "viewExt": "html",
    "cache": false,
    "debug": false
  },
  "form": {
    "uploadDir": "uploads/"
  },
  "bodyparser": {
    "formLimit": "2mb"
  },
  "router": {
    "routesFilePath": "/config/routes.js",
    "controllerFilePath": "/app/controllers/{controller}.js",
    "controllerPattern": "{controller}"
  },
  "db": {
    "settingPath": "/config/db.json",
    "modelPath": "/app/schema"
  },
  "logger": {
    "appenders": {
      "out": { "type": "stdout"},
      "app": { "type": "dateFile", "filename": "logs/app.log", "pattern": ".yyyy-MM-dd", "compress": true}
    },
    "categories": {
      "default": { "appenders": [ "out", "app" ], "level": "debug" }
    }
  }
}
```
if you want to modify an attribute, you can see the corresponding module

#### Start
project startup file 'app.js' like this:
```js
// use Application module, and include some modules with the default setting
const Application = require('koa2-strong').Application;
const app = new Application()
// the default port is 9012.
app.start();
```

if you need orm module, you can require the 'ORM' module and create the base model file  

the 'BaseModel.js' like this:
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