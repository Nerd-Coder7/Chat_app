import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route, Routes } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import { PrivateRoute } from "./Context/PrivateRoute";
import SignUp2 from "./components/Authentication/SignUp2";
import Registering from "./Auth/Registering";
import Logging from "./Auth/Logging";
import Fopert from "./components/NewInputBox";


function App() {
  return (
    <div className="App">
      <Routes>  
      <Route path="/login" element={ <Logging/>} />  
      <Route path="/rhhg" element={ <Registering/>} />
      <Route path="/signup" element={ <SignUp2/>} />   
      <Route path="/" element={ <Homepage/>} />
      <Route path="/chats" element={<PrivateRoute><Chatpage/></PrivateRoute>} />

      </Routes>
    </div>
  );
}

export default App;
