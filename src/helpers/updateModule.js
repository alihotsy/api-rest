

const updateModule = async(id,res,module) => {

    if(id === module?._id.toString() || !module) {
        const updateStage = await module.findByIdAndUpdate(id,{name});
        return res.json(updateStage);
    }
 
    res.status(400).json({
        msg:'El nombre ya existe de otra etapa. No es posible actualizar'
    })
}

module.exports = updateModule;