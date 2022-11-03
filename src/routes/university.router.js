const { Router } = require('express');
const { check } = require('express-validator');
const { createUniversity, getAllUniversities, updateUniversity } = require('../controllers/university');
const { universityExistsByName, universityExistsByPhone, universityExistById } = require('../helpers/db-validator');
const validateFields = require('../middlewares/validate-fields');

const router = Router();

router.post('/create',[
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('name').custom(universityExistsByName),
    check('address', 'La dirección es requerida').not().isEmpty(),
    check('phone', 'El teléfono es requerido').not().isEmpty(),
    check('phone').custom(universityExistsByPhone),
    validateFields
], createUniversity);

router.get('/get-all', getAllUniversities);

router.put('/update/:id',[
    check('id','ID inválido').isMongoId(),
    check('id').custom(universityExistById),
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('address', 'La dirección es requerida').not().isEmpty(),
    check('phone', 'El teléfono es requerido').not().isEmpty(),
    validateFields
], updateUniversity);

module.exports = router;