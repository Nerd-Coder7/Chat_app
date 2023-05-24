import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("userInfo"));
console.log(user,"User")
useEffect(()=>
{
  if (user==null) navigate("/");
},[])
  
  return (children)
}
