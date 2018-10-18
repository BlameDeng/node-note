'use strict';
const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');

const router = require('./server/routes/api.js');

app.use(koaBody({ multipart: true, strict: false }));
app.use(router.routes()).use(router.allowedMethods());
app.listen(8989, () => {
    console.log('Koa开始监听8989端口');
});