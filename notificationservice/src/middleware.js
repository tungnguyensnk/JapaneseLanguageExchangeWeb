const {client} = require('./database');

async function getUserFromToken(token) {
    const query = {
        text: 'select tokenable_id from personal_access_tokens where token = $1',
        values: [token],
    }
    const result = await client.query(query);
    if (result.rows.length === 0) {
        return null;
    } else {
        return result.rows[0];
    }
}

async function checkToken(req, res, next) {
    let token = req.headers.authorization;
    if (token === undefined) {
        res.status(401).send('Unauthorized');
    } else {
        token = token.replace('Bearer ', '');
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