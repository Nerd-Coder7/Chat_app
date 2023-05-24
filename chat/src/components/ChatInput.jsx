import { useState,useEffect } from "react";
import Attach from "/images/attach.png"
export const ChatInput =({typingHandler,newMessage,handleImg,img})=>{
const [preview,setPreview]=useState()
useEffect(() => {
  if (!img) {
      setPreview(undefined)
      return
  }

  const objectUrl = URL.createObjectURL(img)
  setPreview(objectUrl)
  console.log(img)
  // free memory when ever this component is unmounted
  return () => URL.revokeObjectURL(objectUrl)
}, [img])
return(
  <>
   <div className="input chat_input">
  {!img ?"": img.name?.split(".")[1]!=="jpg" && img.name?.split(".")[1]!=="png" ? <p style={{fontSize:"10px",border:"1px solid gray",padding:"3px"}}>{img.name}</p>:<img src={preview} width="70px" />}
      <input
        type="text"
        placeholder="Type something..."
        fontSize="16px"
        onChange={typingHandler}
        value={newMessage}
      />
      <div className="send">
       
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={handleImg}
        />
        <label htmlFor="file"> 
        <img src={Attach} alt="" />
        </label>

      </div>
    </div>
  </>
)
}