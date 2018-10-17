const Koa = require('koa');
const app = new Koa();

const router = require('./server/routes/api.js');

app.use(router.routes()).use(router.allowedMethods());
app.listen(8989, () => {
    console.log('Koa开始监听8989端口');
});