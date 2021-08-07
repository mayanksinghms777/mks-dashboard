import React ,{useEffect,useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {useHistory} from "react-router-dom"


function Employees() {

    const history = useHistory();
    const [userData, setUserData] = useState([]);

    const callEmpPage = async () =>{
        try{
        
            const res = await fetch('/employees', {
                method :"GET",
                headers:{
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials:"include"
            });

            const data = await res.json();
            console.log("hello employees page")
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
       callEmpPage();
    },[]);


    const PostData = () =>{
            
        history.push("/addemp")

    }

    const Editlink = (id) =>{
            
        history.push('/editemp/'+id)

    }


    const DeleteData = async (id) =>{
            
            await fetch('/employees/'+id, {
            method :"DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        });
            window.alert("Sucessfull employee DELETED")
            console.log("Sucessfull employee DELETED")
            
            callEmpPage();

    }


    return (
        <>
         <style>{'body { background-color:  rgb(245, 254, 255); }'}</style>
            <h1 className="m-2">EMPLOYEES</h1>
            <div className="container mt-5">
            <div className="mx-auto">
            <button onClick={PostData} type="button" className="btn btn-primary update m-2">Add User</button>
            <div className="table">
                <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email ID</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Change U/D</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        userData.map(userdata =>(
                    <tr>
                        <th scope="row">{userdata._id}</th>
                        <td>{userdata.name}</td>
                        <td>{userdata.email}</td>
                        <td>{userdata.phone}</td>
                        <td><button onClick={() => Editlink(userdata._id)} type="button" className="btn btn-outline-primary update m-1">Update</button>
                        <button type="button" onClick={() => DeleteData(userdata._id)} className="btn btn-outline-danger update">Delete</button></td>
                        
                    
                    </tr>
                        ))    
            
                    }
                    
                    </tbody>
                </table>
                </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default Employees
