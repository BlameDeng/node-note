'use strict';
const Router = require('koa-router');
const router = new Router();
const crypto = require('crypto');
const User = require('../database/user.js');

const create = async (ctx, next) => {
    let data = ctx.request.body;
    const hmac = crypto.createHmac('sha256', 'secret-key');
    hmac.update(data.password);
    let password = hmac.digest('hex');
    let user = await User.findOne({ where: { username: data.username } });
    if (user) {
        ctx.response.status = 400;
        ctx.response.body = { msg: '用户名已存在' };
    } else {
        ctx.response.status = 200;
        ctx.response.body = await User.create({ username: data.username, password }).then(user => {
            let { username, id, createdAt, updatedAt } = user.dataValues;
            return { username, id, createdAt, updatedAt };
        });
    }
}


// router.get('/all', all);
router.post('/create', create);
// router.delete('/destroy', destroy);
// router.patch('/patch', patch);

module.exports = router