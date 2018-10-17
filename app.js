const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

const api = async (ctx, next) => {
  console.log(ctx.request);
};

router.post("/api", api);

app.use(router.routes()).use(router.allowedMethods());
app.listen(8989, () => {
  console.log("Koa开始监听8989端口");
});