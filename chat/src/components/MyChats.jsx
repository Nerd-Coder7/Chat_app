import { AddIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { getSender, getSenderImg } from "../config/ChatLogics";
import { ChatContext } from "../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = ({ fetchAgain }) => {

  const { selectedChat, setSelectedChat, user, chats, setChats } = useContext(ChatContext)
  let loggedUser = JSON.parse(localStorage.getItem("userInfo"));
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log(loggedUser, "Logged inn")
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  console.log("Shivam", chats)
  useEffect(() => {

    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      py={'0px'}
      bg="var(--secondary-color)"
      w={{ base: "100%", md: "40%", lg: "30%", xl: "20%", '2xl': '20%' }}
      borderWidth="1px"
      borderColor="#dddddd"
    >
      <Box
        p={5}
        fontSize={{ base: "18px", md: "20px" }}
        fontFamily="Work sans"
        display="flex"
        flexDirection={{ base: 'column', xl: 'column', '2xl': 'row' }}
        gap={{ base: '10px', '2xl': '0' }}
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        color={"#495057"}
        fontWeight={900}
      >
        My Chats 😍
        <GroupChatModal>
          <Button
            display="flex"
            background="var(--primary-color)"
            _hover={{ bg: "var(--primary-color)" }}
            color="#fff"
            fontSize={{ base: "13px", md: "14px", lg: "14px" }}
            borderRadius={'8px'}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        px={5}
        bg="transparent"
        w="100%"
        overflowY="hidden"
        borderTop={'1px solid #e5e9f2'}
        pt={'5'}
      >
        {chats ? (
          <Stack overflowY={"scroll"}>
            {chats?.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                borderRadius={'8px'}
                border={selectedChat?._id === chat?._id ? "" : "1px solid #e5e9f2"}
                bg={selectedChat?._id === chat?._id ? "var(--primary-color)" : "transparent"}
                color={selectedChat?._id === chat?._id ? "#fff" : "#495057"}
                px={3}
                py={3}
                key={chat._id}
              >
                <Flex align={"center"} gap={3} justifyContent="space-between">
                  <Box display="flex" gap={3} alignItems={'center'}>
                    <Avatar size={"md"} src=
                      {!chat.isGroupChat
                        ? getSenderImg(loggedUser, chat.users)
                        : chat.chatName}>
                    </Avatar>
                    <Flex
                      flexDirection={'column'}
                      gap={1}>
                      <Text textTransform={"capitalize"}
                        fontSize="14px"
                        fontWeight="500">
                        {!chat.isGroupChat
                          ? getSender(loggedUser, chat.users)
                          : chat.chatName}
                      </Text>
                      {chat.latestMessage && (
                        <Text fontSize="14px">
                          <b>{chat.latestMessage.sender.email === loggedUser.email ? "You" : chat.latestMessage.sender.name} : </b>
                          {chat.latestMessage.content.length > 20
                            ? chat.latestMessage.content.substring(0, 21) + "..."
                            : chat.latestMessage.content == "" ? chat.latestMessage.attachement[0]?.split("uploads/")[1] : chat.latestMessage.content}
                        </Text>
                      )}
                    </Flex>
                  </Box>
                  <Flex
                    flexDirection={'column'}
                    justifyContent={'center'} alignItems={'center'}
                    textAlign={'center'}
                    gap={1}
                  >
                    <Text textTransform={"capitalize"} fontSize={'13px'} fontWeight={'500'} color={'#495057'}>
                      1 min
                    </Text>
                    {/* <Text color={'white'} w={'18px'} h={'18px'} borderRadius={'50%'} bg={"#ff3d57"} display={'flex'} justifyContent={'center'} alignItems={'center'} fontSize={'10px'} >
                      5
                    </Text> */}
                  </Flex>

                </Flex>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box >
  );
};

export default MyChats;
