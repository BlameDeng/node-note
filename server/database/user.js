'use strict';
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname, './user.sqlite')
});

// sequelize.authenticate().then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

// Note.sync({ force: true }).then(() => {
//     return Note.create({
//         content: 'test'
//     })
// })

// Note.findAll().then(notes => {
//     console.log(notes)
// })

// Note.findById('10').then(note=>{
//   console.log(note)
// })

// Note.findAll({
//     where:{
//         content:'hello world'
//     }
// }).then(notes=>{
//     // console.log(notes)
// })
// Note.update({ content: '这是修改后的内容' }, { where: { id: '15' } }).then(res=>{
//     console.log(res)
// })

module.exports = User;