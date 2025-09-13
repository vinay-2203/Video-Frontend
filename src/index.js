import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import jwt_decode from "jwt-decode";

import Homepage from './landingpage/home/Homepage';
import './index.css'
import NavBar from './landingpage/Navbar';
import Footer from './landingpage/Footer';

import Signup from './landingpage/signup/Signup';
import Login from './landingpage/Login/Login';

import Meeting from './landingpage/meeting/Meeting';
// import Password from './landingpage/password/Password';
import MeetingRoom from './landingpage/MeetingRoom/MeetingRoom';
import Chats from './landingpage/chatting/Chats';
import AddFriend from './landingpage/chatting/AddFriend';
import ChatPage from './landingpage/chatting/StartChat';

const root = ReactDOM.createRoot(document.getElementById('root'));
function Main(){
const token = localStorage.getItem('token');

if(token){
  try{
  const decoded = jwt_decode(token);
  console.log("Decoded : ",decoded);
  const current_time = Date.now() / 1000;
  if(decoded.exp < current_time){
    localStorage.removeItem('token');
    window.location.href = "/login"
  }
  }catch(err){
    console.err(err);
    localStorage.getItem('token');
    window.location.href = "/login";
  }
}
else{
  if(window.location.pathname !== "/login" && window.location.pathname !== '/Signup'){
    window.location.href = '/login'
  }
}
return (
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/meeting" element={<Meeting />} />
      <Route path="/meeting/:roomId" element={<MeetingRoom />} />
      {/* <Route path="/password-reset" element={<Password />} /> */}
      <Route path="/chat" element={<Chats />} />
      <Route path='/AddFriend' element={<AddFriend></AddFriend>}></Route>
      <Route path='/Start-Chat' element={<ChatPage></ChatPage>}></Route>
    </Routes>
    <Footer />
  </BrowserRouter>
)
}

root.render(<Main/>)