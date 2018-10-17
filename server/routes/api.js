const Router = require('koa-router');
const router = new Router();
const Note = require('../database/note.js');

Note.findAll().then(notes => {
    console.log('xxx');
    console.log(notes);
})


const api = async (ctx, next) => {
    console.log(ctx.request);
};

router.post('/api', api);