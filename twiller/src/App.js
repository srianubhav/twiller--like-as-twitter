import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Login/Signup";
import Feed from "./Pages/Feed/Feed";
import Explore from "./Pages/Explore/Explore";
import Notification from "./Pages/Notification/Notification";
import Message from "./Pages/Messages/Message";
import {UserAuthContextProvider} from './context/UserAuthContext'
import Profile from "./Pages/Profile/Profile"
import Bookmark from "./Pages/Bookmark/Bookmark";
import Lists from "./Pages/Lists/Lists"
import More from "./Pages/More/More"
function App() {
  return (
    <div className="app">
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Home/>}>
          <Route index element={<Feed/>}/>
          </Route>
         <Route path="/" element={<Home/>}/>
         
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Home" element={<Home />}>
            <Route path="feed" element={<Feed />} />
            <Route path="explore" element={<Explore />} />
            <Route path="notification" element={<Notification />} />
            <Route path="messages" element={<Message />} />
            <Route path="more" element={<More/>}/>
            <Route path="bookmarks" element={<Bookmark />} />
            <Route path="profile" element={<Profile />} />
            <Route path="lists" element={<Lists/>}/>
            
          </Route>
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;