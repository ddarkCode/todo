require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const ejs = require('ejs');
const axios = require('axios');

const {getDate, getTodos, postNewTodo, todayTodos, workTodos} = require('./utils/utils')


const {PORT2} = process.env;
const log = console.log;
const todayCrudServer = 'http://localhost:5555/today/lists'
const workCrudServer = 'http://localhost:5555/work/lists'

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(logger('combined'));



app.get('/', async (req, res) => {
    try {
        const response = await axios.get(todayCrudServer);
        res.status(200);
        return res.render('index', {date: getDate(), data: response.data});
    } catch (error) {
        log(error)
    }
})

app.post('/', async (req, res) => {
  try {
    const {newTodo} = req.body;
    const response = await axios.post(todayCrudServer, {name: newTodo})
    // log(response.data);
    res.status(201);
    return res.redirect('/');
  } catch (error) {
    log(error);
  }
})

app.get('/work', async (req, res) => {
    try {
        const response = await axios.get(workCrudServer)
        res.render('work', {data: response.data});
    } catch (error) {
        log(error)
    }
})

app.post('/work', async (req, res) => {
   try {
    const {newTodo} = req.body;
    const response = await axios.post(workCrudServer, {name: newTodo});
    log(response);
    res.redirect('/work');
   } catch (error) {
    log(error);
   }
})

app.post('/work/delete', async (req, res) => {
    try {
        log('Request Body: ', req.body);
        const deleteATask = await axios.delete(`${workCrudServer}/${req.body.todoId}`)
        // log(deleteATask);
        res.status(200);
       return res.redirect('/work');
    } catch (error) {
        log(error)
    }
  
})

app.listen(PORT2, () => {
    log(`Server is started on port:${PORT2}`);
})