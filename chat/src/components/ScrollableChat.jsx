import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import { useContext, useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatContext } from "../Context/ChatProvider";
import { Link } from "react-router-dom";

const ScrollableChat = ({ messages }) => {
  const { user } = useContext(ChatContext);
  let get = ""
  useEffect(() => {
    messages.map((el) => console.log(el.attachement[0]?.split(".")[1] == "zip"))
  }, [])

  return (
    <ScrollableFeed>

      {messages.length !== 0 &&
        messages.map((m, i) => (
          <div className="message-text" style={{ display: "flex", alignItems: "center", borderTop: "1px solid #dddddd", padding: '30px', marginTop: '20px', position: 'relative' }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
                <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}

            {/* {m.attachement?.map((el)=> <img style={{ marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",}} width={"200px"} src={el} alt={"sss"} />)} */}

            {/* {m.attachement.length!==0 &&  <img style={{ marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",}} width={"200px"} src={m.attachement[0]} alt={"sss"} /> } */}
            {/* {m.attachement[0]?.split(".")[1]!=="jpg" && m.attachement[0]?.split(".")[1]!=="png" && <Link to={m.attachement[0]} download>Download</Link>
          } */}
            {/* {m.attachement[0].split("uploads")} */}
            {m.attachement[0]?.split(".")[1] == "png" || m.attachement[0]?.split(".")[1] == "jpg" ?
              <div style={{
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10
              }}>  <Link to={m.attachement[0]} target="_blank" > <img width={"250px"} src={m.attachement[0]} /></Link> </div>

              : m.attachement.length !== 0 ? <p style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: `${m.sender._id === user._id ? "#a39b8d" : "#a59b9b75"
                  }`, borderRadius: "20px",
                textDecoration: "underline",
                padding: "15px 30px", color: `${m.sender._id === user._id ? "white" : "black"
                  }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,

              }}> <Link className={'flex gap-3 items-center'} to={m.attachement[0]} target="_blank" ><img className="zip-image" width={"40px"} src="/images/zip.png" /> {m.attachement[0]?.split("uploads/")[1]} </Link></p> : ""}
            <span
              style={{
                fontSize: "16px",
                backgroundColor: `${m.sender._id === user._id ? "var(--primary-color)" : "#f8fafb"
                  }`,
                color: `${m.sender._id === user._id ? "white" : "#44566c"
                  }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "15px 30px",
                maxWidth: "50%",
                display: `${m.content == "" ? "none" : "block"}`
              }}
            >
              {m.content}
              
            </span>
            
          </div>

        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
