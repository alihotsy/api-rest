const { Router } = require('express');
const { check } = require('express-validator');
const { createStage, getAllStages, updateStage } = require('../controllers/stage');
const { stageExistsByName, stageExistsById } = require('../helpers/db-validator');
const stageNames = require('../helpers/stageNames');
const validateFields = require('../middlewares/validate-fields');

const router = Router();

router.post('/create',[
    check('name',`El nombre es inválido. Nombres válidos: ${stageNames}`).isIn(stageNames),
    check('name').custom(stageExistsByName),
    validateFields 
], createStage);

router.get('/get-all', getAllStages);

router.put('/update/:id',[
    check('id','ID no válido').isMongoId(),
    check('name','El nuevo nombre es inválido o tiene que ser requerido').isIn(stageNames),
    // check('nombre').custom(projectExistsByName),
    check('id').custom(stageExistsById),
    validateFields
], updateStage);

module.exports = router;