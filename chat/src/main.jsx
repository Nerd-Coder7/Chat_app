import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ChatProvider from "./Context/ChatProvider";
import "./index.css";
// import {Notifications} from "react-push-notification"
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <ChatProvider>
        <ChakraProvider>
        {/* <Notifications/> */}
          <App />
        </ChakraProvider>
      </ChatProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
