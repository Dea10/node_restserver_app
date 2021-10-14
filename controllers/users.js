
const getUser = (req, res) => {
    const query = req.query;

    res.json({
        msg: 'get API - controller',
        query
    })
};

const postUser = (req, res) => {
    const body = req.body;

    res.json({
        msg: 'post API - controller',
        body
    })
};

const putUser = (req, res) => {
    const id = req.params.id;
    res.json({
        msg: 'put API - controller',
        id
    })
};

const deleteUser = (req, res) => {
    res.json({
        msg: 'delete API - controller'
    })
};

const patchUser = (req, res) => {
    res.json({
        msg: 'patch API - controller'
    })
};

module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser,
    patchUser
}