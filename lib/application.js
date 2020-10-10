const Koa = require('koa')
const Bodyparser = require('koa-bodyparser');
const Session = require("koa-session2");
const Serve = require('koa-static');
const Render = require('koa-ejs');
const Formidable = require('./formidable');
const Router = require('./router');
const path = require('path');

class Application extends Koa {

    constructor() {
        super();

        let config = global.koa_config;

        let sessionConfig = config.session;
        this.use(Session(sessionConfig));

        let root = process.cwd();

        let staticConfig = config.static;
        this.use(Serve(path.join(root, staticConfig.root)));

        let renderConfig = config.render;

        renderConfig.root = path.join(root, renderConfig.root);
        Render(this, renderConfig);

        let formConfig = config.form;
        this.use(Formidable(formConfig));

        let bodyparserConfig = config.bodyparser;
        this.use(Bodyparser(bodyparserConfig));

        this.proxy = true;

        this.use(Router());

    }

    start(port) {
        port = port || 9012;
        this.listen(port);
    }

}

module.exports = Application;