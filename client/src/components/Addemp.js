import React,{useState} from 'react'
import {useHistory} from "react-router-dom"

function Addemp() {

    const history = useHistory();
    const [user,setUser] = useState({
        name :"", email :"", phone : "",
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
        const { name, email, phone} = user
        
        const res = await fetch("/addemp",{
            method :"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone
            })
        })

        const data = await res.json();
        if(res.status === 402 || !data){
            window.alert("Invalid employee add or Email already exist")
            console.log("invalid  employee add or Email already exist")
        }else{
            window.alert("Sucessfull employee added")
            console.log("Sucessfull employee added")
            
            history.push("/employees")
        }
    }

    return (
        <>
    <style>{'body { background-color:  rgb(245, 254, 255); }'}</style>
    <section className = "addemp">
        <div className="container mt-5">
            <div className ="signup-content">
                <div className="signup-form">
                    <h2 className = "form-title">Add Employee</h2>
                    <form method="POST" className ="register-form row g-3" id="register-form">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" placeholder="Name" name="name" 
                                value ={user.name} onChange = {handleTnputs}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Phone_num" className="form-label">Phone Number</label>
                                <input type="number" className="form-control" placeholder="91XXXXXXX"  name="phone" 
                                value ={user.phone} onChange = {handleTnputs}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Email" className="form-label">Email</label>
                                <input type="email" className="form-control" name="email" placeholder="Mks@gmail.com" 
                                value ={user.email} onChange = {handleTnputs}/>
                            </div>
                            <div className="col-12 mb-2">
                                <button type="submit" className="btn btn-primary" name ="addemp" value="addemp" onClick={PostData}>Add Employee</button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
        </>
    )
}

export default Addemp
