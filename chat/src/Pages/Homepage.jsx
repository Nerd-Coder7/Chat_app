import {
  Box,
  Container,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import Login2 from "../components/Authentication/login2";
import SignUp2 from "../components/Authentication/SignUp2";

function Homepage() {
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chats");
  }, []);

  return (
    <>
  {/* <SignUp2/> */}
    <Login2/>
    </>
  );
}

export default Homepage;
