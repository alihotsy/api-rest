const { Router } = require('express');
const { check } = require('express-validator');
const { createClient, getAllClients, updateClient } = require('../controllers/client');
const { clientExistsByEmail, clientExistsById } = require('../helpers/db-validator');
const validateFields = require('../middlewares/validate-fields');

const router = Router();

router.post('/create',[
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'Email inválido o es requerido').isEmail(),
    check('email').custom(clientExistsByEmail),
    validateFields
], createClient)
router.get('/get-all', getAllClients)

router.put('/update/:id',[
    check('id','ID inválido').isMongoId(),
    check('id').custom(clientExistsById),
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'Email inválido o es requerido').isEmail(),
    // check('email').custom(clientExistsByEmail),
    validateFields
], updateClient)

module.exports = router;