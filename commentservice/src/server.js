const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const {client} = require('./database');
const {checkToken} = require('./middleware');
const {createComment} = require("./controllers");
app.use((req, res, next) => {
    res.set('Timing-Allow-Origin', '*');
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

client.connect((err) => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
});

app.get('/test', (req, res) => {
    res.send('Comment Service is up and running');
});

app.post('/create', checkToken, createComment);

const port = process.env.USER_SERVER_PORT || '80';
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});