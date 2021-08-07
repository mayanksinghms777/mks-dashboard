import React,{useState} from 'react'
import {useHistory} from "react-router-dom"

function Login() {

    const history = useHistory();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const LoginUser = async(e) =>{
        e.preventDefault();

        const res = await fetch("/signin",{
            method :"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
             email, password 
            })
        })

        const data = await res.json();
        if(res.status ===402 || !data){
            window.alert("Invalid login")
            console.log("invalid login")
        }else{
            window.alert("Sucessfull login")
            console.log("Sucessfull login")
            
            history.push("/")
        }

    }

    return (
        <>
         <style>{'body { background-color:  rgb(245, 254, 255); }'}</style>
             <section className = "signup">
        <div className="container mt-5">
            <div className ="signup-content">
                <div className="signup-form">
                    <h2 className = "form-title">Log In</h2>
                    <form method="POST" className ="register-form row g-3" id="register-form">
                            <div className="col-md-6">
                                <label htmlFor="Email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="inputEmail4"  name="email" placeholder="Mks@gmail.com"  value ={email} 
                                onChange ={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="inputPassword4"  name="password" value ={password} 
                                onChange ={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="col-12 mb-2">
                                <button type="submit" className="btn btn-primary" value="signin" name ="login" onClick={LoginUser}>Log In</button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
        </>
    )
}

export default Login
