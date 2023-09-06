// require('dotenv').config();

// const express = require('express');
// const logger = require('morgan');
// const ejs = require('ejs');
// const {getDate, getTodos, postNewTodo, todayTodos, workTodos} = require('./utils/utils')


// const {PORT} = process.env;
// const log = console.log;

// const app = express();

// app.set('view engine', 'ejs');
// app.use(express.static('public'));
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
// app.use(logger('combined'));



// app.get('/', async (req, res) => {
//     const data = await getTodos(todayTodos)
//     res.render('index', {date: getDate(), data});
// })

// app.post('/', (req, res) => {
//   const {newTodo} = req.body;
//   postNewTodo(newTodo, todayTodos);
//   res.redirect('/');
// })

// app.get('/work', async (req, res) => {
//     const data = await getTodos(workTodos)
//     res.render('work', {data});
// })

// app.post('/work', (req, res) => {
//     const {newTodo} = req.body;
//     postNewTodo(newTodo, workTodos);
//     res.redirect('/work');
// })

// app.listen(PORT, () => {
//     log(`Server is started on port:${PORT}`);
// })