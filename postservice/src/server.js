const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const {client} = require('./database');
const {checkToken} = require('./middleware');
const {
    getNewestPost,
    getUpdatePosts,
    createPost,
    getPostById,
    searchPosts,
    addView,
    getView,
    getListUser
} = require('./controllers');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

client.connect((err) => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
});

app.get('/new', getNewestPost);
app.get('/get', getUpdatePosts);
app.get('/get/:id', getPostById);
app.post('/create', checkToken, createPost);
app.post('/search', searchPosts);
app.post('/view', addView);
app.get('/view', getView);
app.get('/list', getListUser);

const port = process.env.USER_SERVER_PORT || '80';
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});