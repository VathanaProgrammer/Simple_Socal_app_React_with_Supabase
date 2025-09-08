import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  ModalProvider  from "./ModalProvider.jsx";
import Home from "./Home.jsx";
import SignUp from "./SignUp.jsx";
import SignIn from "./SignIn.jsx";
import CallBack from "./CallBack.jsx";
import CreatePost from "./CreatePost.jsx";
import Profile from "./Profile.jsx";
function App() {
  return (
    <Router>
      <ModalProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/call-back" element={<CallBack />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </ModalProvider>
    </Router>
  );
}
export default App;
