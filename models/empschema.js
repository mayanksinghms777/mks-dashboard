const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const autoIncrement = require("mongoose-auto-increment")



const userSchema = new mongoose.Schema({
    name :{
        type :String,
        required : true
    },
    email :{
        type :String,
        required : true,
        unique : true
    },
    phone :{
        type :Number,
        required : true
    },

})

//collection create
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin,'EMPLOYEE');
userSchema.plugin(autoIncrement.plugin, {
    model: 'EMPLOYEE',
    field: '_id',
    startAt: 0,
    incrementBy:1
});

const Employee = new mongoose.model("EMPLOYEE", userSchema);

module.exports = Employee;