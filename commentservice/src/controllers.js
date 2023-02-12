const {client} = require('./database');

async function createComment(req, res) {
    if (!(req.user && req.body.content && req.body.post_id))
        return res.status(400).json({message: 'Bad Request'});
    try {
        const query = {
            text: `insert into comments (user_id, content, post_id, parent_id)
                   values ($1, $2, $3, $4)`,
            values: [req.user, req.body.content, req.body.post_id, req.body.parent_id || null],
        }
        await client.query(query);
        return res.status(201).json({message: 'success'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

async function getChildComment(req, res) {
    try {
        const query = {
            text: `select *
                   from comments
                   where parent_id = $1`,
            values: [req.params.id],
        }
        const result = await client.query(query);
        return res.status(200).json(result.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

module.exports = {createComment, getChildComment};