const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async( role = '' ) => {
    const roleExists = await Role.findOne({ role });

    if(!roleExists) {
        throw new Error('invalid role - validator');
    }
}

const isEmailRepeated = async ( mail ) => {
    const isRepeated = await User.findOne({ mail });

    if (isRepeated) {
        throw new Error('mail already used - validator');
    }
}

const userIdExists = async ( id ) => {
    const userExists = await User.findById( id );

    if (!userExists) {
        throw new Error('user doesn\'t exist - validator');
    }
}

module.exports = { isValidRole, isEmailRepeated, userIdExists }