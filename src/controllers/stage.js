const { response } = require("express");
const Stage = require("../../models/stage");

const createStage = async(req, res = response) => {
    const { name } = req.body;

    const stage = new Stage({name});
    await stage.save();

    res.json(stage);
}

const getAllStages = async(req, res= response) => {

    const [stages,total] = await Promise.all([
        Stage.find(),
        Stage.countDocuments()
    ])

    res.json({
        total,
        stages
    })
}

const updateStage = async(req, res = response) => {
    const { id } = req.params;
    const { name } = req.body;
    const findStageByName = await Stage.findOne({name});

    //Permite validar y en consecuencia actualizar el nombre sin que se repita de otro tipo de proyecto. 
     //También si el nombre viejo coincide con el nuevo, de todas formas lo actualiza: es como
     //si no se hubiera actualizado.
    
    if(id === findStageByName?._id.toString() || !findStageByName) {
        const updateStage = await Stage.findByIdAndUpdate(id,{name});
        return res.json(updateStage);
    }
 
    res.status(400).json({
        msg:'El nombre ya existe de otra etapa. No es posible actualizar'
    })
}

module.exports = {
    createStage,
    getAllStages,
    updateStage
}