import {
  Alert,
  Box,
  Button,
  Flex,
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
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
  const obj = {
    email: "",
      password: "",
  };
  const Logging = () => {
    const toast = useToast();

    const [text, setText] = useState(obj);
    const emailValidate = "@gmail.com";
    const [loading,setLoading]=useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { value, name } = e.target;
      setText({...text, [name]: value});
    };
    const {email, password} = text;
    const [loginstatus,setLoginStatus]= useState(0);
    const handleSubmit = async() => {
      if (email || password) {

      // console.log(email, password);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
  setLoading(true)
        const { data } = await axios.post(
          "/api/user/login",
          { email, password },
          config
        );
  
        // console.log(JSON.stringify(data));
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
        console.log(error)
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
        }else{
          setLoginStatus(2)
            setTime()
        }}
        const handleForgot=async()=>{
          setLoading(true)
              return await axios.post("http://localhost:4003/v1/user/forget_password",{email:text.email}).then((res)=>{
              setLoading(false)
                toast({
                  title: "Password sent successfully on the mail",
                  position: "top",
                  status: "success",
                  duration: 6000,
                  isClosable: true,
                })
              }).catch((err)=> {
            setLoginStatus(3)
        setTime()
          })
          }

          const setTime=()=>{
            setTimeout(()=>{
        setLoginStatus(0)
            },5000)
        }

    return (
      <Stack direction={{base: "column", lg: "row"}}>
        <Flex flex={1.5} >
          <Box w="full" display={"flex"} flexDir="column" gap="40px" alignItems={"center"}>
          <Box display={"flex"} alignItems="center" h={"200px"} w="100%" bg={"#0d0d44"} >
            <Image ml={"20px"} w={"200px"} src="/img/logo.png"></Image>
          </Box>
          <Stack p="30px" spacing={4} w={"full"} maxW={"lg"}>
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                onChange={handleChange}
                value={email}
                name="email"
                type="email"
              />
              {!text.email.includes(emailValidate)?"*Input valid email address":<div></div>}
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
            <Stack spacing={6}>
              <Stack
                direction={{base: "column", sm: "row"}}
                align={"start"}
                justify={"space-between"}
              >
                <Text onClick={handleForgot}  color={"blue.400"}>
                  Forgot password?
                </Text>
                <Link to={"/register"}>    <Text color={"red.400"}>
                Don't have account?
                </Text></Link>
              </Stack>
              <Button
                onClick={handleSubmit}
                colorScheme={"blue"}
                // color="#0d0d44"
                variant={"solid"}
                isDisabled={!text.email.includes(emailValidate)}
              >
                {loading ? <Spinner /> : "Sign in"}
              </Button>
            </Stack>
            <div>
            {loading?"Wait a moment.....":
    loginstatus===1?<Alert variant="filled" severity="error">
Email or password is wrong!
</Alert>:loginstatus===2?<Alert variant="filled" severity="info">
  Please input all fields!
</Alert>:loginstatus===3?<Alert variant="filled" severity="error">
  Please try again....
</Alert>:<div></div>}</div>
          </Stack>
        </Box>
        </Flex>
        <Flex flex={2.2} height="100vh" >
          <Image
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
  export default Logging;