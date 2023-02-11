const {client} = require('./database');
const {dateFromNow} = require('./utils');

async function getTotalLike(post_id) {
    try {
        const query = {
            text: `select count(user_id) as total
                   from like_post
                   where like_post.post_id = $1`,
            values: [post_id],
        }
        const result = await client.query(query);
        return result.rows[0].total;
    } catch (e) {
        console.log(e);
        return null;
    }
}

async function getNewestPost(req, res) {
    try {
        const query = {
            text: `select p.*, count(c.id) as comments_count
                   from posts p
                            join comments c on p.id = c.post_id
                   where deleted = false
                     and locked = false
                   group by p.id
                   order by p.id desc limit 5;`,
            values: [],
        }
        const result = await client.query(query);
        for (const row of result.rows) {
            delete row.deleted;
            delete row.locked;
            delete row.content;
            row.updated_at = dateFromNow(row.updated_at);
            row.likes_count = await getTotalLike(row.id);
        }
        return res.json(result.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal Server Error'});
    }

}

async function getUpdatePosts(req, res) {
    const page = req.query.page || 1;
    try {
        const query = {
            text: `select *
                   from posts
                   where locked = false
                     and deleted = false
                   order by id desc limit 50
                   offset $1`,
            values: [(page - 1) * 10],
        }
        const result = await client.query(query);
        for (const row of result.rows) {
            delete row.deleted;
            delete row.locked;
            delete row.content;
            row.updated_at = dateFromNow(row.updated_at);
        }
        return res.json(result.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

async function createPost(req, res) {
    if (!(req.user && req.body.title && req.body.content && req.body.type))
        return res.status(400).json({message: 'Bad Request'});
    try {
        const query = {
            text: `insert into posts (user_id, title, content, type, views, deleted, locked)
                   values ($1, $2, $3, $4, $5, $6, $7)`,
            values: [req.user, req.body.title, req.body.content, req.body.type, 0, false, false],
        }
        await client.query(query);
        return res.status(201).json({message: 'Created'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

module.exports = {getNewestPost, getUpdatePosts, createPost};