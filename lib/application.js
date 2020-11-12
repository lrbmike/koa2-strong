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

        this.config = global.koa_config;

        this.s_middleware = []
    }

    bind(middleware) {
        this.s_middleware.push(middleware);
    }

    start(port) {

        let sessionConfig = this.config.session;
        this.use(Session(sessionConfig));

        let root = process.cwd();

        for(let mid of this.s_middleware){
            this.use(mid)
        }

        let staticConfig = this.config.static;
        this.use(Serve(path.join(root, staticConfig.root)));

        let renderConfig = this.config.render;

        renderConfig.root = path.join(root, renderConfig.root);
        Render(this, renderConfig);

        let formConfig = this.config.form;
        this.use(Formidable(formConfig));

        let bodyparserConfig = this.config.bodyparser;
        this.use(Bodyparser(bodyparserConfig));

        this.proxy = true;

        this.use(Router());

        port = port || 9012;
        this.listen(port);
    }

}

module.exports = Application;