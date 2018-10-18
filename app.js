'use strict';
const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const api = require('./server/routes/api.js');
const auth = require('./server/routes/auth.js');

const Router = require('koa-router');
const router = new Router();

router.use('/api', api.routes());
router.use('/auth', auth.routes());

app.use(koaBody({ multipart: true, strict: false }));
app.use(router.routes());
// .use(router.allowedMethods());
app.listen(8989, () => {
    console.log('Koa开始监听8989端口');
});