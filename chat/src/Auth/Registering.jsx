import {
    Alert,
    Box,
    Button, Flex,
    FormControl,
    FormLabel,
    Heading,
    Image,
    Input,
    Spinner,
    Stack,
    Text,
    useToast
} from "@chakra-ui/react";
import {BiLogInCircle} from "react-icons/bi"
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
    const userObj = {
        name:"",
      email: "",
        password: "",
        confirm_password:""
    };
    const Registering = () => {
      const toast = useToast();
      const [user,setUser]  = useState(userObj);
      const [loading,setLoading]=useState(false);
      const [loginstatus,setLoginStatus]= useState(0);
      const navigate = useNavigate();
      const emailValidate = "@gmail.com";
      // console.log(user)
      const handleChange=(e)=>{
          const { name, value ,type,checked} = e.target;
          const inputValue= type ==="checkbox"?checked :value;
          setUser({ ...user, [name]: inputValue });
      }
      
      const handleSubmit=async()=>{
      // PostUser(user)
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      if(user.name!=="" && user.password!=="" && user.email!=="" && user.confirm_password!==""){
          if(user.password===user.confirm_password){
            setLoading(true)
          return  await axios.post(
            "/api/user",
            {
              name:user.name,
              email:user.email,
          password:user.password
            },
            config
          ).then((res)=>{
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 6000,
          isClosable: true,
        })
          setLoading(false)
      navigate("/")
      }
      ).catch((err)=>{
        setLoading(false)
        console.log(err)
        setLoginStatus(1)
          setTime()})
      }else{
          {setLoginStatus(2)
              setTime()}
      }
      }else{
          setLoginStatus(3)
          setTime()
      }
      }
      const setTime=()=>{
          setTimeout(()=>{
      setLoginStatus(0)
          },6000)
      }
      const {email,name,password,confirm_password}=user;
      return (
        <Stack direction={{base: "column", lg: "row"}}>
          <Flex flex={1.5} >
            <Box w="full" display={"flex"} flexDir="column" gap="40px" alignItems={"center"}>
            <Box display={"flex"} alignItems="center" h={"200px"} w="100%" bg={"#0d0d44"} >
              <Image ml={"20px"} w={"200px"} src="/img/logo.png"></Image>
            </Box>
            <Stack p="30px" spacing={4} w={"full"} maxW={"lg"}>
              <Heading fontSize={"2xl"}>Sign in to your account</Heading>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  onChange={handleChange}
                  value={name}
                  name="name"
                  type="name"
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  onChange={handleChange}
                  value={email}
                  name="email"
                  type="email"
                />
                {!user.email.includes(emailValidate)?"*Input valid email address":<div></div>}
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  onChange={handleChange}
                  value={password}
                  type="password"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  name="confirm_password"
                  onChange={handleChange}
                  value={confirm_password}
                  type="confirm_password"
                />
              </FormControl>
              <Stack  spacing={6}>
              <Link to={"/"}>   <Stack direction={{base: "column", sm: "row"}}
                align={"center"}
              ><BiLogInCircle/>
          <Text>Login here</Text>
        </Stack></Link>
                <Button
                  onClick={handleSubmit}
                  colorScheme={"blue"}
                  // color="#0d0d44"
                  variant={"solid"}
                  isDisabled={!user.email.includes(emailValidate)}
                >
                Sign-up
                </Button>
              </Stack>
              <div>
              {loading?"Wait a moment.....":
      loginstatus===1?<Alert variant="filled" severity="error">
  Email is already in use!
  </Alert>:loginstatus===2?<Alert variant="filled" severity="info">
  Password isn't same as confirm password
  </Alert>:loginstatus===3?<Alert variant="filled" severity="error">
    Please input all the fields
  </Alert>:<div></div>}</div>
            </Stack>
          </Box>
          </Flex>
          <Flex flex={2.2} height="100vh" >
            <Image
              width={'100%'}
              loading="lazy"
              objectFit={"cover"}
              // mt={3}
              src={
                "/img/login.jpg"
              }
            />
          </Flex>
        </Stack>
      );
    };
    export default Registering;