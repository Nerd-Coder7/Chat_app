const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try{
  const messages = await Message.find({ chat: req.params.id })
      .populate("sender", "name pic email")
      .populate("chat");
      return res.status(200).send({ messages: "get message successfully", data: messages })
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
  // console.log(req.params)
  // try {
  //   const arr = await Message.find({ chat: req.params.id })
  //   // console.log(arr)
  //   var att;
  //   const attachement = arr.map(async (el, i) => {
  //     att = el.attachement
  //     let [h, m, s] = el.time.split(":")
  //     let [ch, cm, cs] = new Date().toLocaleTimeString().split(":")
  //     h = Number(h)
  //     let expireTime = h + 2
  //     // console.log("hii")
  //     if (expireTime == Number(ch)) {
  //       const update = att.filter(val => !att.includes(val));
      
  //       const data = await Message.updateMany({attachement:el.attachement}, { attachement: update }, { new: true })
  //     }
  //   })
  //   const messages = await Message.find({ chat: req.params.id })
  //   if (!messages) {
  //     return res.status(400).send("something went wrong")
  //   } else {
  //     return res.status(200).send({ messages: "get message successfully", data: messages })
  //   }
  // } catch (error) {
  //   res.status(400);
  //   throw new Error(error.message);
  // }
});
//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
//   let { content, chatId } = req.body;
//   // chatId=JSON.parse(chatId)
// console.log(req.body,req.files)
//   if (!content || !chatId) {
//     console.log("Invalid data passed into request");
//     return res.sendStatus(400);
//   }

//   var newMessage = {
//     sender: req.user._id,
//     content: content,
//     chat:chatId,
//   };
//   try {
//     var message = await Message.create(newMessage);
//     message = await message.populate("sender", "name pic").execPopulate();
//     message = await message.populate("chat").execPopulate();
//     message = await User.populate(message, {
//       path: "chat.users",
//       select: "name pic email",
//     });

//     await Chat.findByIdAndUpdate(req.body.chatId._id, { latestMessage: message });

//     res.json(message);
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }





  const { content, chatId } = req.body;
  console.log(content, chatId)
  // console.log("dsffdsdfs")
  // if (!content || !chatId) {
  //   console.log("Invalid data passed into request");
  //   return res.sendStatus(400);
  // }
  let chatParse = JSON.parse(chatId)
  let attachement = []
  console.log(req.files)
  if (req.files) {
    req.files.forEach(file => {
      var att = 'http://localhost:5000/uploads/' + file.filename;
      attachement.push(att)
    })
  }
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatParse,
    attachement: attachement,
    time: new Date().toLocaleTimeString()
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic").execPopulate();
    message = await message.populate("chat").execPopulate();
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findByIdAndUpdate(chatParse, { latestMessage: message });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
module.exports = { allMessages, sendMessage };