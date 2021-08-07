import React ,{ useEffect } from 'react';
import { useHistory } from "react-router-dom";

const Logout = () => {

    const history = useHistory();
    const callLogoutPage = async () =>{
        try{
        
            const res = await fetch('/logout', {
                method :"GET",
                headers:{
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials:"include"
            });

            history.push("/login",{replace:true})
            if(!res.status !== 200){
                const error = new Error(res.error);
                throw error;
            }

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
       callLogoutPage();
    });


    return (
        <>
            <h1>user has log out</h1>
        </>
    )
}

export default Logout
