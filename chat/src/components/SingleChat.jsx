import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, FormControl, IconButton, Image, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import addNotification from 'react-push-notification';
import Picker from "emoji-picker-react";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import { getSender, getSenderFull,getSenderImg } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import { ProfileDrawer } from "./miscellaneous/ProfileDrawer";
import "./styles.css";
import io from "socket.io-client";
import { ChatContext } from "../Context/ChatProvider";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { ChatInput } from "./ChatInput";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null)
  const ref = useRef();
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event) => {
    let message = newMessage;
    message += event.emoji;
    setNewMessage(message);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { selectedChat, setSelectedChat, user, notification, setNotification } = useContext(ChatContext)
  // console.log(selectedChat,"yaar")
  // console.log("Notification singleChat",notification)
  const fetchMessages = async () => {
    SingleChat
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data.data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);

    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  console.log(img, "Shivam")

  const sendMessage = async (event) => {

    if (event.key === "Enter") {
      socket.emit("stop typing", selectedChat._id);
      console.log(img, "SDGS")

      try {
        var bodyFormData = new FormData();
        bodyFormData.append('chatId', JSON.stringify(selectedChat));
        bodyFormData.append('content', newMessage);
        bodyFormData.append('attachment', img);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message", bodyFormData, config);
        setImg()
        socket.emit("new message", data);

        setMessages([...messages, data]);
        setFetchAgain(!fetchAgain)
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);


  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
      addNotification({
        title: "AWS CHAT_APP: " + newMessageRecieved.sender?.name,
        subtitle: 'This is a subtitle',
        message: newMessageRecieved?.content,
        theme: 'darkblue',
        native: true // when using native, your OS will handle theming.
      });
      console.log(newMessageRecieved, "TYOP LOPCS  ADF A")
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  const handleImg = (e) => {
    setImg(e.target.files[0])
  }
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "18px", md: "18px" }}
            color={'var(--primary-color)'}
            fontWeight={900}
            px={4}
            height={'100px'}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            border={'1px solid #eaedf0'}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  <Box display="flex" gap="4">
                    <Box className={'relative'}>
                      <Avatar name='Dan Abrahmov' src={getSenderImg(user, selectedChat.users)} />
                      <Badge colorScheme='green' className={'absolute'} w={'10px'} h={'10px'} border={'1px solid #fff'} display={'flex'} justifyContent={'center'} alignItems={'center'} textAlign={'center'} bottom={'4px'} right={0} borderRadius={'50%'} bg={'#09b66d'}></Badge>
                    </Box>
                    <span>
                      <Text color={'#495057'} textTransform={"capitalize"}>{getSender(user, selectedChat.users)}</Text>
                      <Text color={'#8697a8'} fontSize={'13px'}>1 min ago</Text>
                    </span>
                  </Box>
                  <ProfileDrawer user={getSenderFull(user, selectedChat.users)} />
                </>
              ) : (
                <>
                  {selectedChat.chatName}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Text>

          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            
            bg="transparent"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div style={{ width: "40%" }}>
                  <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <div style={{ display: "flex", alignItems: "center", border: "2px solid #dddddd", maxWidth: "100%", padding: "6px 10px", borderRadius: "8px" }}>

                <BsEmojiSmileFill fontSize={"30px"} onClick={handleEmojiPickerhideShow} />
                {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                {/* </div> */}
                <ChatInput newMessage={newMessage} typingHandler={typingHandler} handleImg={handleImg} img={img} /> </div>
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box d="flex" flexDir={"column"} alignItems="center" justifyContent="center" h="100%">
          <Text textAlign={"center"} fontSize="3xl" pb={3} fontFamily="Work sans" fontWeight={"bolder"}>
            Click on a user to start chatting
          </Text> <Image m={"auto"} src="/images/start-conv.gif" />

        </Box>
      )}
    </>
  );
};

export default SingleChat;
