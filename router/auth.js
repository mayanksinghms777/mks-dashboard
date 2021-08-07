const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs")
const cookieParser = require('cookie-parser')
router.use(cookieParser())
const authenticate = require('../middleware/authenticate')


require('../db/conn')
const User = require('../models/userschema')
const Employee = require('../models/empschema')

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.post('/register', async(req, res) => {
   
    const {firstname,lastname,email,gender,phone,age,password,confirmpassword} = req.body

    if(!firstname || !lastname || !email || !gender || !phone || !age || !password ||!confirmpassword){
        return res.status(402).json({error :"please fill the field "})
    }

    try{
       const userExist = await User.findOne({email : email})
       if(userExist){
            return res.status(402).json({error :"Email already exists "})
        }else if(password != confirmpassword){
            return res.status(402).json({error :"password not matching"})
        }else{
            const user = new User({firstname,lastname,email,gender,phone,age,password,confirmpassword})
            const userregister = await user.save()
            res.status(201).json({message :"Sucessfully registered "})
        }


    }catch(e){
        console.log(e)
    }
})

router.post('/signin', async(req, res) => {

    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(402).json({error :"please fill the field "})
        }
        
        const userLogin = await User.findOne({email:email})

        if(userLogin){

            const isMatch = await bcrypt.compare(password,userLogin.password)
            const token = await userLogin.generateAuthToken();
            console.log(token)
            res.cookie("jwtoken",token,{
                expires : new Date(Date.now() + 25892000000),
                httpOnly :true,
                secure: false
            })

            if(!isMatch){
                res.status(402).json({error :"invalid match"})
            }else{
                res.status(201).json({message :"Sucessfully login "})
            }
        }else{
            res.status(402).json({error :"invalid login"})
        }


    }catch(err){
        console.log(err)
    }

})

router.get('/about',authenticate, (req, res) => {
    res.send(req.rootUser)
  })


router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken',{path:"/"})
    res.status(200).send("user logout")
  })

router.post('/addemp',async (req, res) => {
    
    const {name,email,phone} = req.body

    if(!name || !email || !phone){
        return res.status(402).json({error :"please fill the field "})
    }

    try{
       const userExist = await Employee.findOne({email : email})
       if(userExist){
            return res.status(402).json({error :"Email already exists "})
        }else{
            const employee = new Employee({name,email,phone})
            const employeeadd = await employee.save()
            res.status(201).json({message :"Sucessfully employee added"})
        }


    }catch(e){
        console.log(e) 
    }
  })

router.get('/employees',authenticate, async(req, res) => {
 
    const employeedata = await Employee.find()
   res.send(employeedata)

  })

router.patch('/editemp/:id', async(req, res) => {
    
    try{

        const _id = req.params.id
        const employeedata = await Employee.findByIdAndUpdate(_id, req.body)
        res.status(201).send(employeedata)
        console.log(employeedata)
     
       }catch(e){
         res.status(404).send(e);
       } 

  })

router.delete('/employees/:id', async(req,res) =>{

    try{
  
     const _id = req.params.id
     const deleteemployee = await Employee.findByIdAndDelete(_id)
     console.log("deleted")
     res.status(201).json("deleted")
     
    }catch(e){
      res.status(404).send(e);
    }
  })




module.exports=router;