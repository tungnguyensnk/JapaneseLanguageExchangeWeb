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

async function getListLike(post_id) {
    try {
        const query = {
            text: `select u.name
                   from posts p
                            join like_post lp on p.id = lp.post_id
                            join users u on u.id = lp.user_id
                   where p.id = $1;`,
            values: [post_id],
        }
        const result = await client.query(query);
        return result.rows;
    } catch (e) {
        console.log(e);
        return [];
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
                   order by p.id desc
                   limit 5;`,
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
        return res.json({message: 'success', data: result.rows});
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
                   order by id desc
                   limit 50 offset $1`,
            values: [(page - 1) * 10],
        }
        const result = await client.query(query);
        for (const row of result.rows) {
            delete row.deleted;
            delete row.locked;
            delete row.content;
            row.updated_at = dateFromNow(row.updated_at);
        }
        return res.json({message: 'success', data: result.rows});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

async function createPost(req, res) {
    if (!req.body.title || !req.body.content || !req.body.type)
        return res.status(400).json({message: 'Bad Request'});
    try {
        const query = {
            text: `insert into posts (user_id, title, content, type, views, deleted, locked)
                   values ($1, $2, $3, $4, $5, $6, $7)`,
            values: [req.user, req.body.title, req.body.content, req.body.type, 0, false, false],
        }
        await client.query(query);
        return res.status(200).json({message: 'success'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

async function addView(req, res) {
    try {
        const query = {
            text: `update posts
                   set views = views + 1
                   where id = $1`,
            values: [req.params.id],
        }
        await client.query(query);
        return res.status(200).json({message: 'success'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

async function getTotalCommentOfPost(post_id) {
    try {
        const query = {
            text: `select count(*) as count_t
                   from comments
                   where post_id = $1`,
            values: [post_id],
        }
        const result = await client.query(query);
        return result.rows[0].count_t;
    } catch (e) {
        return 0;
    }
}

async function getCommentOfPost(post_id) {
    try {
        const query = {
            text: `select *
                   from comments
                   where post_id = $1
                     and parent_id is null`,
            values: [post_id],
        }
        const result = await client.query(query);
        for (const row of result.rows) {
            row.updated_at = dateFromNow(row.updated_at);
            delete row.parent_id;
        }
        return result.rows;
    } catch (e) {
        console.log(e);
        return [];
    }
}

async function getPostById(req, res) {
    const id = req.params.id;
    try {
        const query = {
            text: `select p.*, u.name, u.email
                   from posts p
                            join users u on u.id = p.user_id
                   where p.id = $1`,
            values: [id],
        }
        const result = await client.query(query);
        if (result.rows.length === 0)
            return res.status(404).json({message: 'Not Found'});
        let $comments = {
            total: await getTotalCommentOfPost(id),
            parent_comments: await getCommentOfPost(id),
        }

        let $likes = {
            total: await getTotalLike(id),
            list: await getListLike(id),
        }
        result.rows[0].comments = $comments;
        result.rows[0].likes = $likes;
        return res.json({message: 'success', data: result.rows[0]});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

async function searchPosts(req, res) {
    const page = req.body.page || 1;
    const type = req.body.type || 'post';
    const tsort = req.body.tsort || 'newest';
    if (page < 1 || !req.body.content)
        return res.status(400).json({message: 'Bad Request'});
    let qry = "";
    if (tsort === 'newest')
        qry = `select *
               from posts
               where type = $1
                 and deleted = false
                 and locked = false
                 and (title ilike $3 or content ilike $3)
               order by id desc
               limit 10 offset $2`;
    else if (tsort === 'oldest')
        qry = `select *
               from posts
               where type = $1
                 and deleted = false
                 and locked = false
                 and (title ilike $3 or content ilike $3)
               order by id asc
               limit 10 offset $2`;
    else if (tsort === 'most_viewed')
        qry = `select *
               from posts
               where type = $1
                 and deleted = false
                 and locked = false
                 and (title ilike $3 or content ilike $3)
               order by views desc
               limit 10 offset $2`;
    else if (tsort === 'most_liked')
        qry = `select p.*, count(lp.user_id) as likes
               from posts p
                        join like_post lp on p.id = lp.post_id
               where type = $1
                 and deleted = false
                 and locked = false
                 and (title ilike $3 or content ilike $3)
               group by p.id
               order by likes desc
               limit 10 offset $2`;
    else if (tsort === 'most_commented')
        qry = `select p.*, count(c.id) as comments
               from posts p
                        join comments c on p.id = c.post_id
               where type = $1
                 and deleted = false
                 and locked = false
                 and (title ilike $3 or content ilike $3)
               group by p.id
               order by comments desc
               limit 10 offset $2`;
    try {
        const query = {
            text: qry,
            values: [type, (page - 1) * 10, '%' + req.body.content + '%'],
        }
        const result = await client.query(query);
        for (const row of result.rows) {
            delete row.deleted;
            delete row.locked;
            row.content = row.content.length > 100 ? row.content.substring(0, 100) + '...' : row.content;
            row.updated_at = dateFromNow(row.updated_at);
        }
        let total_rows = result.rows.length;
        return res.json({message: 'success', total_results: total_rows, results: result.rows});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

module.exports = {getNewestPost, getUpdatePosts, createPost, getPostById, searchPosts, addView};