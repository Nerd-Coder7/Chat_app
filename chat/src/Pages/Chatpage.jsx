import { Box } from "@chakra-ui/react";
import { useContext, useState } from "react";
import Chatbox from "../components/Chatbox";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import { ChatContext } from "../Context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const {user} = useContext(ChatContext)
  // const { user } = ChatState();

  return (
    <div style={{ width: "100vw" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h={["94vh"]}>
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
