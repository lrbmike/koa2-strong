const Promise = require('promise');
const Formidable = require('formidable');

module.exports = function (opts) {
    opts = opts || {};
    Object.assign({multiples: true}, opts);
    return async function(ctx,next){
        const form = Formidable(opts);
        await new Promise((reslove,reject) => {
            form.parse(ctx.req,(err,fields,files) => {
                if (err) {
                    reject(err);
                }else {
                    ctx.request.body = fields;
                    ctx.request.files = files;
                    reslove();
                }
            })
        })
        await next();
    }
}