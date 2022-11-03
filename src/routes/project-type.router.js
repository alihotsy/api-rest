const { Router } = require('express');
const { check } = require('express-validator');
const { getAllProjectTypes, createProjectType, updateProjectType } = require('../controllers/project-type');
const { projectTypeExistsByName, projectTypeExistsById, updateProjectName } = require('../helpers/db-validator');
const projectNames = require('../helpers/projectNames');
const validateFields = require('../middlewares/validate-fields');

const router = Router();


router.get('/get-all', getAllProjectTypes)

router.post('/create',[
    check('nombre',`El nombre es inválido. Nombres válidos: ${projectNames}`).isIn(projectNames),
    check('nombre').custom(projectTypeExistsByName),
    validateFields 
], createProjectType)

router.put('/update/:id',[
    check('id','ID no válido').isMongoId(),
    check('nombre','El nuevo nombre es inválido o tiene que ser requerido').isIn(projectNames),
    // check('nombre').custom(projectExistsByName),
    check('id').custom(projectTypeExistsById),
    validateFields
],updateProjectType )

module.exports = router;