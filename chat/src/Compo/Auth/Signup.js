import axios  from "axios";
import React,{useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


export default function SignUp() {
const navigate = useNavigate();
const [formdata, setFormdata] = useState({username:'',DOB:'',email:'',password:'',confpassword:'',phoneNumber:'',gender:'',address:'',country_code:"+91"})
const [formerror, setFormerror] = useState({username:'',DOB:'',email:'',password:'',confpassword:'',phoneNumber:'',gender:'',address:''})
const [formSubmitted, setFormsubmitted] = useState(false)

useEffect(()=>{
    if(formSubmitted){
        handleValidation();
    }
},[formdata])
const inputHandle =(e)=> {
    const newData = {...formdata};
    newData[e.target.name] = e.target.value;
    setFormdata(newData);
    console.log(newData);
}

const formHandle =(e)=>{
    console.log(formdata)
    e.preventDefault();
    setFormsubmitted(true)
    if(handleValidation()){
        let formData = new FormData();
        formData.append("username",formdata.username)
        formData.append("DOB",formdata.DOB)
        formData.append("email",formdata.email)
        formData.append("password",formdata.password)
        formData.append("phoneNumber",formdata.phoneNumber)
        formData.append("gender",formdata.gender)
        formData.append("address",formdata.address)
        e.preventDefault();
        // axios.post("http://localhost:4000/v1/user/userRegister",{
        //     data:formdata,
        //     headers: { "Content-Type": "multipart/form-data" },
        // }).then(res=> console.log(res))
        axios({
            method: "post",
            url: "http://localhost:4000/v1/user/userRegister",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then((res)=>{
            if(res.status === 200){
                setTimeout(()=>{
                    navigate('/login')
                },4000)
                toast('Successfully registered', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            console.log(res)
        })
    }
    
}

const handleValidation =()=>{
    const error = {username:'',DOB:'',email:'',password:'',confpassword:'',phoneNumber:'',gender:'',address:''}
    if(!(formdata.username).trim()){
        error.username = 'Username is required'
    }
    if(!formdata.DOB){
        error.DOB = 'DOB is required'
    }
    if(!(formdata.email).trim()){
        error.email = 'Email is required'
    }
    if(!(formdata.password).trim()){
        error.password = 'Password is required'
    }
    if(!(formdata.confpassword).trim()){
        error.confpassword = 'Confirm password is required'
    }
    if(!(formdata.phoneNumber).trim()){
        error.phoneNumber = 'Phone number is required'
    }
    if(!(formdata.gender)){
        error.gender = 'Gender is required'
    }
    if(!(formdata.address).trim()){
        error.address = 'Address number is required'
    }
    setFormerror(error);
    return !error.username && !error.DOB && !error.email && !error.password && !error.confpassword && !error.phoneNumber && !error.gender && !error.address; 
}

return (
    <div className="sign_up_main w-full min-h-screen flex items-center justify-center overflow-x-hidden">
        <div className="signup_form_container w-full max-w-xl mx-auto bg-black/60 rounded-lg">
            <p className="text-2xl bg-primary p-2 uppercase font-bold rounded-t-lg text-white block">Sign up</p>
            <form className="px-5 border border-black/50">
                <div className="grid sm:grid-cols-2 gap-5 my-3 mb-10 items-center">
                    <div>
                        <img src="images/logo.png" alt="Aron web Solutions" className="w-40 block" />
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 gap-y-5">
                    <div className="form_input_wrap">
                        <label className="form_label">Name</label>
                        <input onChange={inputHandle} type="text" name="username" value={formdata.username} placeholder="Enter your name" className="w-full text-base placeholder:text-white/60 text-white outline-none bg-white/10 px-3 py-2" />
                        {formerror.username ? <span className="text-danger font-medium">{formerror.username}</span> :<span></span>}
                    </div> 
                    <div className="form_input_wrap">
                        <label className="form_label">Date of birth</label>
                        <input onChange={inputHandle} type="date" name="DOB" value={formdata.DOB} className="w-full text-base placeholder:text-white/60 text-white outline-none bg-white/10 px-3 py-2" />
                        {formerror.DOB ? <span className="text-danger font-medium">{formerror.DOB}</span> :<span></span>}
                    </div>
                </div>
                <div className="my-3 form_input_wrap">
                    <label className="form_label">Email</label>
                    <input onChange={inputHandle} type="email" name="email" value={formdata.email} placeholder="Enter your email" className="w-full text-base placeholder:text-white/60 text-white outline-none bg-white/10 px-3 py-2" />
                    {formerror.email ? <span className="text-danger font-medium">{formerror.email}</span> :<span></span>}
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                    <div className="my-3 form_input_wrap">
                        <label className="form_label">Password</label>
                        <input onChange={inputHandle} type="password" name="password" value={formdata.password} placeholder="Enter password" className="w-full text-base placeholder:text-white/60 text-white outline-none bg-white/10 px-3 py-2" />
                        {formerror.password ? <span className="text-danger font-medium">{formerror.password}</span> :<span></span>}
                    </div>
                    <div className="my-3 form_input_wrap">
                        <label className="form_label">Confirm Password</label>
                        <input onChange={inputHandle} type="password" name="confpassword" value={formdata.confpassword} placeholder="Confirm your password" className="w-full text-base placeholder:text-white/60 text-white outline-none bg-white/10 px-3 py-2" />
                        {formerror.confpassword ? <span className="text-danger font-medium">{formerror.confpassword}</span> :<span></span>}
                    </div>
                </div>
                <div className="my-3 form_input_wrap">
                    <label className="form_label">Phone</label>
                    <input onChange={inputHandle} type="number" name="phoneNumber" value={formdata.phoneNumber} placeholder="Enter your phone no." className="w-full text-base placeholder:text-white/60 text-white outline-none bg-white/10 px-3 py-2" />
                    {formerror.phoneNumber ? <span className="text-danger font-medium">{formerror.phoneNumber}</span> :<span></span>}
                </div>
                <div className="my-3 form_input_wrap">
                    <fieldset className="text-white">
                        <legend>Gender</legend>
                        <div className="flex flex-wrap gap-5 mt-2">
                            <div>
                                <input id="male" className="peer/male" type="radio" name="gender" value="Male" onChange={inputHandle} />
                                <label htmlFor="male" className="peer-checked/male:text-sky-500 cursor-pointer ml-1">Male</label>
                            </div>
                            <div>
                                <input id="female" className="peer/female" type="radio" value="Female" name="gender" onChange={inputHandle} />
                                <label htmlFor="female" className="peer-checked/female:text-sky-500 cursor-pointer ml-1">Female</label>
                            </div>
                        </div>
                    </fieldset>
                    {formerror.gender ? <span className="text-danger font-medium">{formerror.gender}</span> :<span></span>}
                </div>
                <div className="my-3 form_input_wrap">
                    <label className="form_label">Address</label>
                    <input onChange={inputHandle} type="text" name="address" value={formdata.address} placeholder="Enter your address" className="w-full text-base placeholder:text-white/60 text-white outline-none bg-white/10 px-3 py-2" />
                    {formerror.address ? <span className="text-danger font-medium">{formerror.address}</span> :<span></span>}
                </div>
                <div className="mt-5">
                    <button onClick={formHandle} className="w-full bg-primary text-white p-3 text-lg rounded-md">Register</button>
                    <p className="text-white text-center mb-8 mt-2">
                        <span className="cursor-pointer hover:underline" onClick={()=>navigate('/login')}>Already have an account? Login</span>
                    </p>
                </div>
            </form>
            <div>
                <ToastContainer 
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
        </div>
    </div>
    );
}
