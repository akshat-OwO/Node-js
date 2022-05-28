const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://netninja:test1234@blogapp.gwt1w.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) =>{
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'lorem ipsum dolor sit amet consectetur'},
    ];
    // res.render('index', {title: 'Home', blogs: blogs});
    res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res) =>{
    res.render('about', {title: 'About Us'});
});

app.get('/blogs/create', (req, res) =>{
    res.render('create', {title: 'Create New Blog'});
})

// 404 page
app.use((req, res) =>{
    res.status(404).render('404', {title: '404'});
});