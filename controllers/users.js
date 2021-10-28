const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const getUser = async (req, res) => {
    const {limit = 5, from = 0} = req.query;
    // const users = await User.find({ status: true })
    //                         .skip(Number(from))
    //                         .limit(Number(limit))

    // const total = await User.countDocuments({ status: true });

    const [total, users] = await Promise.all([
        User.countDocuments({ status: true }),
        User.find({ status: true })
                            .skip(Number(from))
                            .limit(Number(limit))
    ]);

    res.json({
        msg: 'get API - controller',
        total,
        users
    })
};

const postUser = async (req, res) => {

    const {name, mail, password, role} = req.body;
    const user = new User({ name, mail, password, role });

    // repeated mail
    // const isRepeated = await User.findOne({ mail });
    // if (isRepeated) {
    //     return res.statsu(400).json({
    //         msg: 'mail already used'
    //     });
    // }

    // crypt pass
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    await user.save();

    res.json({
        msg: 'post API - controller',
        user
    })
};

const putUser = async (req, res) => {
    const id = req.params.id;
    const { _id, password, google, mail, ...rest } = req.body;

    // TODO: validar contra db
    if(password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json({
        msg: 'put API - controller',
        user
    })
};

const deleteUser = async (req, res) => {

    const {id} = req.params;

    // Físicamente
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {status: false});

    res.json({
        msg: 'delete API - controller',
        id,
        user
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