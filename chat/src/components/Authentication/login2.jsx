import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login2 = () => {
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://127.0.0.1:5000/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      console.log("navigata it")
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <div className='md:flex h-screen'>
      <div className='w-[100%] md:w-[60%] lg:w-[70%] flex flex-col justify-center h-[485px] md:h-screen linear-bg-1'>
        <div className='mt-[10px] ml-[10px] absolute top-0 left-0'>
          <img className="w-[120px] h-[40px]" src="aws logo.png" alt="AWS" />
        </div>
        <div  className='w-[100%] flex flex-col justify-center'>
          <div className='flex flex-col justify-center items-center text-center space-y-5 m-[10px]'>
            <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold p-[15px] m-[10px]">
              Login to Your Account
            </h1>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='font-bold mt-5 p-[15px] h-[50px]  md:w-[80%]  lg:w-[50%] rounded-full' />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' type='password' className='font-bold mt-5 p-[15px] h-[50px] md:w-[80%]  lg:w-[50%] rounded-full' />
          </div>
          <div className='flex justify-center m-[10px]'>
            <button className='bg-orange-500 text-white w-[100%] md:w-3/6 h-[50px] rounded-full text-lg xl:text-xl font-bold hover:bg-gray-400' onClick={submitHandler}>Login</button>
          </div>
        </div>
      </div>
      <div className=' w-[100%] md:w-[40%] lg:w-[30%] flex flex-col justify-center p-[15px] md:flex-col h-[370px] md:h-screen bg-orange-300'>
        <div className='flex flex-col items-center  text-center space-y-5'>
          <div className='text-2xl md:text-4xl font-bold'>
            <p className='p-[5px] text-3xl sm:text-3xl md:text-3xl lg:text-4xl 2xl:text-5xl'>New Here?</p>
            <p className='text-xl font-normal md:text-xl lg:text-2xl pt-[15px]'>Signup and discover a great<br /> amount of new opportunities! </p>
            <button className='bg-black text-white w-[80%] h-[50px] rounded-full mt-5 font-bold text-lg xl:text-xl hover:bg-orange-500' onClick={() => navigate("/signup")}> Signup</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Login2;
