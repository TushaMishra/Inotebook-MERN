import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'



const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();
    
    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
            // API Call 
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({email: credentials.email, password: credentials.password})
            });
            const json = await response.json();
            console.log(json);
            if(json.success){
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken);
                navigate('/');
                props.showAlert("Logged in Successfully ", "success")
            }
            else{
                props.showAlert("Invalid Credentials", "danger")
            }
    }
    
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

  return (
    <div className='mt-3'>
        <h2 className='my-3'>Login to continue to iNotebook</h2>
        <form onSubmit={handleSubmit}>
            <div className="my-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login
