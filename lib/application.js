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

        this.use(Session({
            key: 'koa2-strong'
        }));

        let root = process.cwd();

        this.use(Serve(path.join(root, '/public')));

        Render(this, {
            root: path.join(root, '/public/views'),
            layout: false,
            viewExt: 'html',
            cache: false,
            debug: false
        });

        let formOpts = {'uploadDir': 'uploads/'}
        this.use(Formidable(formOpts))

        let bodyparserOpts = {'formLimit': '2mb'}
        this.use(Bodyparser(bodyparserOpts))

        this.proxy = true;

        this.use(Router());

    }

    start(port) {
        port = port || 9012;
        this.listen(port);
    }

}

module.exports = Application;