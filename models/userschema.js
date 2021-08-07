const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    firstname :{
        type :String,
        required : true
    },
    lastname :{
        type :String,
        required : true
    },
    email :{
        type :String,
        required : true,
        unique : true
    },
    gender :{
        type :String,
        required : true
    },
    phone :{
        type :Number,
        required : true
    },
    age :{
        type :Number,
        required : true
    },
    password :{
        type :String,
        required : true
    },
    confirmpassword :{
        type :String,
        required : true
    },
    tokens :[
        {
            token :{
                type :String,
                required : true
            }
        }
    ]

})

//hashing password

userSchema.pre('save',async function(next){
    console.log("hii from inside")
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
        this.confirmpassword = await bcrypt.hash(this.confirmpassword,12)
    }
    next();
})

//generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        let tokengenerate = jwt.sign({_id:this._id},process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token : tokengenerate})
        await this.save();
        return tokengenerate;
    
    }catch(err){
        console.log(err)
    }
}


//collection create
const User = new mongoose.model("USER", userSchema);

module.exports = User;