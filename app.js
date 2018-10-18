'use strict';
const Koa = require('koa');
const koaBody = require('koa-body');
const api = require('./server/routes/api.js');
const auth = require('./server/routes/auth.js');
const koajwt = require('koa-jwt');
const Router = require('koa-router');
const key = require('./server/routes/key.js');

const app = new Koa();
const router = new Router();

app.use((ctx, next) => {
    return next().catch(err => {
        if (err.status === 401) {
            console.log('401');
            
            console.log(err);
        } else {
            throw (err);
        }
    })
})

router.use('/api', api.routes());
router.use('/auth', auth.routes());

app.use(koajwt({ secret: key.jwt_key }).unless({ path: [/\/auth.?/] }));
app.use(koaBody({ multipart: true, strict: false }));
app.use(router.routes());
// .use(router.allowedMethods());
app.listen(8989, () => {
    console.log('Koa开始监听8989端口');
});