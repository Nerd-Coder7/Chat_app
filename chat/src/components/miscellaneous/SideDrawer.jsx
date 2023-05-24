import { BellIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Avatar, Box, Button, Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay, Image, Input,
  Menu, MenuButton,
  MenuDivider,
  MenuItem,
  MenuList, Spinner, Text, Tooltip, useDisclosure
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useContext, useState } from "react";
import NotificationBadge, { Effect } from "react-notification-badge";
import { useNavigate } from "react-router-dom";
import { getSender } from "../../config/ChatLogics";
import { ChatContext } from "../../Context/ChatProvider";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import ProfileModal from "./ProfileModal";
import { ProfileDrawer } from "./ProfileDrawer";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = useContext(ChatContext)
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const setSearchetr = async (e) => {
    setSearch(e.target.value)

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log("first", search)
      const res = await axios.get(`/api/user?search=${search}`, config)
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data, "Shivam", res)
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      console.log("data", data, "accesschats")
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="#000"
        w="100%"
        color="#000"
        p="5px 10px 5px 10px"
      >
        <Image maxW={{ base: '25%', sm: '20%', md: '10%', lg: '8%', xl: '6%' }} src="images/awslogo_1.png" />
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          {/* <Button w={{ base: '0%', md: '30%', lg: '17%' }} h={'35px'} bg="#665dfe" _hover={{ bg: "var(--primary-color)" }} borderRadius={'8px'} onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text color="#fff" display={{ base: "flex" }} gap={{ base: "4px", md: "10px" }} justifyContent={{ md: "center" }} alignItems={{ md: "center" }} px={4}>
              <Text color="#fff" display={{
                base: "none",
                md: "flex"
              }}>Search User </Text> <Search2Icon />
            </Text>
          </Button> */}

          <Button bg="transparent" _hover={{ bg: "var(--primary-color)" }} borderRadius={'8px'} onClick={onOpen} display={{
                base: "none",
                md: "none"
              }}>
            <i className="fas fa-search"></i>
            <Text color="#fff" display={{ base: "flex" }} gap={{ base: "4px", md: "10px" }} justifyContent={{ md: "center" }} alignItems={{ md: "center" }} px={4}>
              <Text color="#fff" display={{
                base: "none",
                md: "none"
              }}>a</Text>  
            </Text>
          </Button>

        </Tooltip>

        <Box className={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
          <Menu>
            <Button w={{ base: '0%', md: '3%', lg: '3%' }} h={'35px'} bg="#665dfe" _hover={{ bg: "var(--primary-color)" }} borderRadius={'8px'} onClick={onOpen} mr={4}>
              <i className="fas fa-search"></i>
              <Text color="#fff" display={{ base: "flex" }} gap={{ base: "4px", md: "10px" }} justifyContent={{ md: "center" }} alignItems={{ md: "center" }} px={4}>
                <Text color="#fff" display={{
                  base: "flex",
                  md: "flex"
                }}> <Search2Icon /></Text>
              </Text>
            </Button>
            <MenuButton p={1} mr={3}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="3xl" color={"#fff"} m={1} />
            </MenuButton>
            <MenuList color="white" bg="var(--primary-color)" textAlign={'center'} pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  color="red"
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`
                  }
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton colorScheme="transparent" as={Button} bg="var(--primary-color)" color={"white"} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size={{ base: 'xs', md: 'sm' }}
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList bg={"var(--primary-color)"} color="#fff">
              <ProfileDrawer user={user} />
              <MenuDivider borderColor={"#fff"} />
              <MenuItem bg={"var(--primary-color)"} onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent background={"var(--primary-color)"}>
          <DrawerHeader borderBottomWidth="1px" color={"white"}>Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                boder="2px solid black"
                color={"black"}
                bg="lightwheat"
                value={search}
                onChange={setSearchetr}
              // onChange={(e) => setSearch(e.target.value)}
              />

            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
