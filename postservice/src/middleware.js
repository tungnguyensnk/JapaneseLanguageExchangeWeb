const {client} = require('./database');

async function getUserFromToken(token) {
    try {
        const result = await fetch('http://nginx/api/profile', {
            method: 'GET',
            headers: {
                "Authorization": token
            }
        });

        const user = await result.json();
        if (user === null) {
            return null;
        }
        return user.user.id;
    } catch (e) {
        console.log(e);
        return null;
    }
}

async function checkToken(req, res, next) {
    let token = req.headers.authorization;
    if (token === undefined) {
        res.status(401).send('Unauthorized');
    } else {
        const user = await getUserFromToken(token);
        if (user === null) {
            res.status(401).send('Unauthorized');
        } else {
            req.user = user;
            next();
        }
    }
}

module.exports = {checkToken};