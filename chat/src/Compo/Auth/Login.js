import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(){
    const [userData, setUserData] = useState({email:'',password:''});
    const [message, setMessage] = useState('')
    const navigate = useNavigate();
    const userValuehandle = (e)=>{
        setUserData((prev)=>{
            return{
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const loginHandle =(e)=>{
        e.preventDefault();
        const data = {email:userData.email,password:userData.password}
        setUserData({email:'',password:''})
        axios.post('http://localhost:4000/v1/user/userLogin',data)
        .then((res)=>{
            console.log(res)
            if(res.data.message === 'email IS Required!'){
                setMessage('Email is required')
            }
            if(res.data.message === 'something went wrong'){
                setMessage('Something went wrong')
            }
            else if(res.data.message === 'password is wrong'){
                setMessage('Wrong Password')
            }
            else if(res.data.message === 'login successfully'){
                setMessage('Logged In');
                localStorage.setItem('User', JSON.stringify(res.data))
                navigate('/home')
            }
        })
    }
    return(
        <>
            <div className="sign_up_main w-full min-h-screen flex items-center justify-center overflow-x-hidden">
                <div className="signup_form_container w-full max-w-xl mx-auto bg-black/60 rounded-lg">
                    <p className="text-2xl bg-primary p-2 uppercase font-bold rounded-t-lg text-white block">Log In</p>
                    <form className="px-5 border border-black/50">
                        <div className="grid sm:grid-cols-2 gap-5 my-3 mb-10 items-center">
                            <div>
                                <img src="images/logo.png" alt="Aron web Solutions" className="w-40 block" />
                            </div>
                        </div>
                        <div className="grid gap-2 gap-y-5">
                            <div className="form_input_wrap">
                                <label className="form_label">Email</label>
                                <input onChange={userValuehandle} type="email" name="email" value={userData.email} placeholder="Enter your email" className="w-full text-base placeholder:text-white/60 text-white outline-none bg-white/10 px-3 py-2" />
                            </div> 
                            <div className="form_input_wrap">
                                <label className="form_label">Password</label>
                                <input onChange={userValuehandle} type="password" value={userData.password}  placeholder="Enter your password" name="password" className="w-full text-base placeholder:text-white/60 text-white outline-none bg-white/10 px-3 py-2" />
                            </div>
                            <div className="mb-5">
                                <button className="w-full bg-primary text-white font-medium p-3 text-lg rounded-md" onClick={loginHandle}>Login</button>
                                <p className="text-white text-center mb-8 mt-2">
                                    <span className="cursor-pointer hover:underline" onClick={()=>navigate('/')}>Don't have an account? Sign Up</span>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}