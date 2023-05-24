import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp2 = () => {
  const toast = useToast();
  const navigate = useNavigate()

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();


  const submitHandler = async () => {
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios.post(
        "/api/user",
        {
          name,
          email,
          password
        },
        config
      ).then((res) => console.log(res)).catch((err) => console.log(err))
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/");
    } catch (error) {
      console.log(error)
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

    }
  };

  return (
    <div className=" md:flex h-screen linear-bg-1">
      {/* SignUp */}
      <div className="w-[100%] md:w-[60%] lg:w-[70%] flex flex-col justify-center h-[555px] md:h-screen linear-bg-1">
        {/* Logo Part */}
        <div className="p-[10px] absolute top-0 left-0">
          <img src="aws logo.png" alt="logo" className="w-[120px] h-[40px]" />
        </div>

        {/* Fields */}
        <div className="w-[100%] flex flex-col justify-center">
          <div className="flex flex-col items-center text-center m-[10px]">
            <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold p-[10px] md:p-[15px] m-[10px]">
              Create an Account
            </h1>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="h-[50px] mt-5  p-[15px] rounded-full text-lg font-semibold md:w-[80%]  lg:w-[50%]"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-[50px] mt-5  p-[15px] rounded-full text-lg font-semibold md:w-[80%]  lg:w-[50%]"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="h-[50px] mt-5  p-[15px] rounded-full text-lg font-semibold md:w-[80%]  lg:w-[50%]"
            />
            <input
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              placeholder="Confirm password"
              className="h-[50px] mt-5  p-[15px] rounded-full text-lg font-semibold md:w-[80%]  lg:w-[50%]"
            />
          </div>
          <div className="flex justify-center m-5">
            <button onClick={submitHandler} className="bg-orange-500 text-white w-[100%] md:w-3/6 h-[50px] rounded-full text-lg xl:text-xl font-bold hover:bg-gray-400">
              SignUp
            </button>
          </div>
        </div>
      </div>
      {/* Login Button */}

      <div className='w-[100%] md:w-[40%] lg:w-[30%] flex flex-col justify-center p-[15px] md:flex-col h-[370px] md:h-screen bg-orange-300'>
        <div className='flex flex-col items-center  text-center space-y-5'>
          <div className='text-2xl md:text-4xl font-bold'>
            <p className='text-black p-[5px] text-3xl sm:text-3xl md:text-3xl lg:text-4xl 2xl:text-5xl'>Already a user?</p>
            <p className='text-xl text-black font-normal md:text-xl lg:text-2xl pt-[15px]'>Login and discover a great <br /> amount of new opportunities!</p>
            <button onClick={() => navigate("/")} className="bg-black text-white w-[80%] h-[50px] rounded-full mt-5 font-bold text-lg xl:text-xl hover:bg-orange-500">
            Login
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp2;
