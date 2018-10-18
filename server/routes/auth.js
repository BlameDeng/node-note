'use strict';
const Router = require('koa-router');
const router = new Router();
const crypto = require('crypto');
const hmac = crypto.createHmac('sha256', 'secret-key');
const User = require('../database/user.js');

const create = async (ctx, next) => {
    ctx.response.status = 200;
    let data = ctx.request.body;
    hmac.update(data.password);
    let password = hmac.digest('hex');
    User.create({ username: data.username, password }).then(res => {
        console.log(res);
    })
    // ctx.response.body = await Note.create(data);
}

// router.get('/all', all);
router.post('/create', create);
// router.delete('/destroy', destroy);
// router.patch('/patch', patch);

module.exports = router