import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModalProvider from "./ModalProvider.jsx";
import Home from "./Home.jsx";
import SignUp from "./SignUp.jsx";
import SignIn from "./SignIn.jsx";
import CallBack from "./CallBack.jsx";
import CreatePost from "./CreatePost.jsx";
import Profile from "./Profile.jsx";
import { Toaster } from "react-hot-toast";
import MessageRes from "./MessageRes.jsx";
import CreateStory from "./CreateStory.jsx";

function App() {
  return (
    <Router>
      <ModalProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/call-back" element={<CallBack />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<MessageRes />} />
          <Route path="*" element={<div>404 Not Found</div>} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/create-story" element={<CreateStory />} />
        </Routes>
      </ModalProvider>
    </Router>
  );
}
export default App;
