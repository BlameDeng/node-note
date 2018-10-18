'use strict';
const Router = require('koa-router');
const router = new Router();
const Note = require('../database/note.js');

// Note.findAll().then(notes => {
//     console.log('xxx');
//     console.log(notes);
// })
// dataValues:
//    { id: 2,
//      content: '123456789',
//      updatedAt: 2018-10-18T01:25:02.143Z,
//      createdAt: 2018-10-18T01:25:02.143Z },


const all = async (ctx, next) => {
    ctx.response.status = 200;
    ctx.response.body = await Note.findAll();
    // .then(notes=>{
    //     return notes;
    //     console.log(notes);
    // })
}

const create = async (ctx, next) => {
    let data = ctx.request.body;
    ctx.response.status = 200;
    ctx.response.body = await Note.create(data);
}

const patch = async (ctx, next) => {
    ctx.response.status = 200;
    let { id, content } = ctx.request.body;
    ctx.response.body = await Note.update({ content }, { where: { id } }).then(() => {
        return Note.findById(id);
    })
}

const destroy = async (ctx, next) => {
    ctx.response.status = 200;
    let id = ctx.request.body.id;
    ctx.response.body = await Note.destroy({ where: { id } }).then(res => {
        // console.log(res);
        return { message: '删除成功' };
    })
}

router.get('/api/all', all);
router.post('/api/create', create);
router.delete('/api/destroy', destroy);
router.patch('/api/patch', patch);

module.exports = router