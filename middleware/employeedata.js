const Employee = require('../models/empschema')

const Employeedata = async (req,res,next) =>{

    try{


        const rootUser = await Employee.findOne({_id :verifyToken._id ,"tokens.token":token})

        if(!rootUser){throw new Error ('user not found')}

        req.rootUser = rootUser

        next();

    }catch(e){
        res.status(401).send("no employee data get")
        console.log(e)
    }
}

module.exports = Employeedata;