'use strict';
const Router = require('koa-router');
const router = new Router();
const crypto = require('crypto');
const User = require('../database/user.js');

const register = async (ctx, next) => {
    let data = ctx.request.body;
    const hmac = crypto.createHmac('sha256', 'secret-key');
    hmac.update(data.password);
    let password = hmac.digest('hex');
    let user = await User.findOne({ where: { username: data.username } });
    if (user) {
        ctx.response.status = 400;
        ctx.response.body = { msg: '用户名已存在' };
    } else {
        await User.create({ username: data.username, password }).then(user => {
            let { username, id, createdAt, updatedAt } = user.dataValues;
            ctx.response.status = 200;
            ctx.response.body = { username, id, createdAt, updatedAt };
        });
    }
}

const login = async (ctx, next) => {
    let data = ctx.request.body;
    let user = await User.findOne({ where: { username: data.username } });
    if (user) {
        const hmac = crypto.createHmac('sha256', 'secret-key');
        hmac.update(data.password);
        let password = hmac.digest('hex');
        if (password === user.password) {
            ctx.response.status = 200;
            let { username, id, createdAt, updatedAt } = user.dataValues;
            ctx.response.body = { username, id, createdAt, updatedAt };
        } else {
            ctx.response.status = 400;
            ctx.response.body = { msg: '密码不正确' };
        }
    } else {
        ctx.response.status = 400;
        ctx.response.body = { msg: '用户名不存在' };
    }
}


router.post('/login', login);
router.post('/register', register);
// router.delete('/destroy', destroy);
// router.patch('/patch', patch);

module.exports = router