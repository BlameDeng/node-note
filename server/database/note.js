const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname, './note.sqlite')
});

// sequelize.authenticate().then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

const Note = sequelize.define('note', {
    content: {
        type: Sequelize.STRING
    }
})

// Note.sync({ force: true }).then(() => {
//     return Note.create({
//         content: 'test'
//     })
// })

// Note.findAll().then(notes => {
//     console.log(notes)
// })

module.exports = Note;