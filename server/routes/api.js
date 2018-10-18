'use strict';
const Router = require('koa-router');
const router = new Router();
const Note = require('../database/note.js');

const all = async (ctx, next) => {
    await Note.findAll().then(notes => {
        ctx.response.status = 200;
        ctx.response.body = notes;
    })
}

const create = async (ctx, next) => {
    let data = ctx.request.body;
    console.log(ctx.state);
    
    await Note.create(data).then(note => {
        ctx.response.status = 200;
        ctx.response.body = note.dataValues
    })
}

const patch = async (ctx, next) => {
    let { id, content } = ctx.request.body;
    let note = await Note.findById(id);
    if (note) {
        let array = await Note.update({ content }, { where: { id } });
        if (array[0] === 0) {
            ctx.response.status = 400;
            ctx.response.body = { msg: '更新失败' };
        } else {
            ctx.response.status = 200;
            ctx.response.body = await Note.findById(id);
        }
    } else {
        ctx.response.status = 400;
        ctx.response.body = { msg: '笔记不存在' };
    }
}

const destroy = async (ctx, next) => {
    let id = ctx.request.body.id;
    await Note.destroy({ where: { id } }).then(res => {
        ctx.response.status = 200;
        ctx.response.body = { msg: '删除成功' };
    })
}

router.get('/all', all);
router.post('/create', create);
router.delete('/destroy', destroy);
router.patch('/patch', patch);

module.exports = router