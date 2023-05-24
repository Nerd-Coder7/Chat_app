import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import { ChatContext } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";
import "./styles.css";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = useContext(ChatContext)

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      bg="whiteAlpha.400"
      color="orange"
      w={{ base: "100%", md: "60%", lg: "70%", xl: "85%" }}
      borderWidth="0px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
