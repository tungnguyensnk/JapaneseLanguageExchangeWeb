const {client} = require('./database');

async function getNotification(req, res) {
    try {
        const query = {
            text: `select *
                   from notifications
                   where user_id = $1`,
            values: [req.user],
        }
        const result = await client.query(query);
        return res.status(200).json({message: 'success', data: result.rows});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

module.exports = {getNotification};