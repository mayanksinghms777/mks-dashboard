import React ,{useEffect,useState} from 'react'
import logo from "../images/brandlogo.png"
import {useHistory} from "react-router-dom"

function About() {

    const history = useHistory();
    const [userData, setUserData] = useState({});

    const callAboutPage = async () =>{
        try{
        
            const res = await fetch('/about', {
                method :"GET",
                headers:{
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials:"include"
            });

            const data = await res.json();
            console.log("hello about page")
            setUserData(data);
            if(!res.status === 201){
                const error = new Error(res.error);
                throw error;
            }

        }catch(err){
            console.log(err)
            history.push("/login")
        }
    }

    useEffect(() => {
       callAboutPage();
    },[]);

    return (
        <>
            <style>{'body { background-color:  rgb(245, 254, 255); }'}</style>
            <div className="container  mt-5">
                <form method="GET">
                    <div className="row">
                        <div className="col-md-4">    
                        <div className="card">
                        <img className="card-img-top"  src={logo} alt="Card"/>
                        <div className="card-body">
                        </div>
                        </div>
                        </div>

                        <div className="col-md-6 mt-3">   
                           <h1>My Account :</h1>

                           <div className="row m-3 mt-4">
                                <div className="col-md-6">
                                    <label >USER ID :</label>
                                </div>   
                                <div className="col-md-6">
                                    <label >123455667</label>
                                </div>   
                           </div>
                           <div className="row m-3 mt-4">
                                <div className="col-md-6">
                                    <label >NAME :</label>
                                </div>   
                                <div className="col-md-6">
                                    <label >{userData.firstname}</label>
                                </div>   
                           </div>
                           <div className="row m-3 mt-4">
                                <div className="col-md-6">
                                    <label >EMAIL :</label>
                                </div>   
                                <div className="col-md-6">
                                    <label >{userData.email}</label>
                                </div>   
                           </div>
                           <div className="row m-3 mt-4">
                                <div className="col-md-6">
                                    <label >CONTACT NO. :</label>
                                </div>   
                                <div className="col-md-6">
                                    <label >{userData.phone}</label>
                                </div>   
                           </div>

                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}

export default About
