const Koa = require('koa')
const Bodyparser = require('koa-bodyparser');
const Formidable = require('./formidable');
const Router = require('./router');

class Application extends Koa {

    constructor() {
        super();

        let formOpts = {'uploadDir': 'uploads/'}
        this.use(Formidable(formOpts))

        let bodyparserOpts = {'formLimit': '2mb'}
        this.use(Bodyparser(bodyparserOpts))

        this.proxy = true;

        this.use(Router());

    }

    start() {
        this.listen(9012);
    }

}

module.exports = Application;