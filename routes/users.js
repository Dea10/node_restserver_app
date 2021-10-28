const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, postUser, putUser, deleteUser, patchUser } = require('../controllers/users');
const { isValidRole, isEmailRepeated, userIdExists } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', getUser);

router.post('/', [
    check('mail', 'invalid mail').isEmail(),
    check('mail').custom((mail) => isEmailRepeated(mail)),
    check('name', 'name required').not().isEmpty(),
    check('password', 'password required and more than six characters').isLength( {min: 6} ),
    check('role').custom((role) => isValidRole(role)),
    validateFields
], postUser);

router.put('/:id', [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(userIdExists),
    check('role').custom((role) => isValidRole(role)),
    validateFields
], putUser);

router.delete('/:id',[
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(userIdExists),
    validateFields
], deleteUser);

router.patch('/', patchUser);

module.exports = router;