import React,{useState} from 'react'
import {useHistory} from "react-router-dom"

function Signup() {

    const history = useHistory();
    const [user,setUser] = useState({
        firstname :"", lastname :"", email :"", gender :"", phone : "", age : "", password :"" ,
        confirmpassword : ""
    });

    let name,value;
    const handleTnputs = (e) =>{
        console.log(e)
        name = e.target.name;
        value = e.target.value;

        setUser({...user,[name]:value})

    }

    const PostData = async(e) =>{
        e.preventDefault();
        const { firstname, lastname, email, gender, phone , age , password , confirmpassword} = user
        
        const res = await fetch("/register",{
            method :"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstname, lastname, email, gender, phone , age , password , confirmpassword
            })
        })

        const data = await res.json();
        if(res.status ===422 || !data){
            window.alert("Invalid registration")
            console.log("invalid registration")
        }else{
            window.alert("Sucessfull registration")
            console.log("Sucessfull registration")
            
            history.push("/login")
        }
    }

    return (
        <>
        <style>{'body { background-color:  rgb(245, 254, 255); }'}</style>
    <section className = "signup">
        <div className="container mt-5">
            <div className ="signup-content">
                <div className="signup-form">
                    <h2 className = "form-title">Sign Up</h2>
                    <form method="POST" className ="register-form row g-3" id="register-form">
                            <div className="col-md-6">
                                <label htmlFor="First_name" className="form-label">First Name</label>
                                <input type="text" className="form-control" placeholder="First name" name="firstname" 
                                value ={user.firstname} onChange = {handleTnputs}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Last_name" className="form-label">Last Name</label>
                                <input type="text" className="form-control" placeholder="Last name"  name="lastname" 
                                value ={user.lastname} onChange = {handleTnputs}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Phone_num" className="form-label">Phone Number</label>
                                <input type="number" className="form-control" placeholder="91XXXXXXX"  name="phone" 
                                value ={user.phone} onChange = {handleTnputs}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="age" className="form-label">Age</label>
                                <input type="Number" className="form-control" name="age" 
                                value ={user.age} onChange = {handleTnputs}/>
                            </div>
                                <div className="col-md-6">
                                <label htmlFor="Gender" className="form-label">Gender</label>
                                <select id="inputState" className="form-select"  name="gender" 
                                value ={user.gender} onChange = {handleTnputs}>
                                <option selected>Choose...</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Email" className="form-label">Email</label>
                                <input type="email" className="form-control" name="email" placeholder="Mks@gmail.com" 
                                value ={user.email} onChange = {handleTnputs}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="inputPassword4"  name="password" 
                                value ={user.password} onChange = {handleTnputs}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Confirm_password" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control"  name="confirmpassword" 
                                value ={user.confirmpassword} onChange = {handleTnputs}/>
                            </div>
                            <div className="col-12 mb-2">
                                <button type="submit" className="btn btn-primary" name ="signup" value="register" onClick={PostData}>Register</button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
        </>
    )
}

export default Signup
