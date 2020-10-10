const Router =  require('koa-router');
const path = require('path');

module.exports = () => {

    let config = global.koa_config;
    let routerConfig = config.router;

    let root = process.cwd();
    let routesPath = path.join(root, routerConfig.routesFilePath);
    let controllerPath = path.join(root, routerConfig.controllerFilePath);

    let options = {
        routesPath: routesPath,
        controllerPath: controllerPath
    };

    let routes = require(options.routesPath);

    let routerPathKeys = Object.keys(routes);

    const router = new Router();

    for (const routeKey of routerPathKeys){

        const [verb, url] = routeKey.split(' ');

        const routeValue = routes[routeKey];
        if (routeValue[0] === '/') {
            router.redirect(url, routeValue, 301);

        }else {

            const [controllerPath, action] = routeValue.split('#');

            const controller = require(options.controllerPath.replace(routerConfig.controllerPattern, controllerPath));

            if (controller){
                const actionInstance = controller[action];
                if (actionInstance){

                    router[verb](url, actionInstance);
                }else{
                    throw new Error('Unable to find controller action for route:' + routeKey);
                }
            }else {
                throw new Error('Unable to find controller for route:' + routeKey);
            }
        }

    }

    return router.routes();
}
