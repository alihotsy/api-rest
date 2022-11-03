
const { response } = require("express")
const ProjectType = require("../../models/project-type")


 
 const getAllProjectTypes = async(req, res = response) => {
    
    
    const [projectTypes,total] = await Promise.all([
        ProjectType.find(),
        ProjectType.countDocuments()
    ])

    res.json({
        total,
        projectTypes
    })
}

const createProjectType = async(req, res = response) => {
    
    
    const { nombre } = req.body;

    const typeProject = new ProjectType({nombre});
    await typeProject.save();

    res.json(typeProject)
}

const updateProjectType = async(req, res = response) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const findProjectTypeByName = await ProjectType.findOne({nombre});

    //Permite validar y en consecuencia actualizar el nombre sin que se repita de otro tipo de proyecto. 
     //También si el nombre viejo coincide con el nuevo, de todas formas lo actualiza: es como
     //si no se hubiera actualizado.
    
    if(id === findProjectTypeByName?._id.toString() || !findProjectTypeByName) {
        const updateProjectType = await ProjectType.findByIdAndUpdate(id,{nombre});
        return res.json(updateProjectType)
    }
 
    res.status(400).json({
        msg:'El nombre ya existe de otro proyecto. No es posible actualizar'
    })

    
}
module.exports = {
    getAllProjectTypes,
    createProjectType,
    updateProjectType
}