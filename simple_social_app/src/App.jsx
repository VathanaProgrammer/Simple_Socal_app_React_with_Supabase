import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import SignUp from "./SignUp.jsx";
import SignIn from "./SignIn.jsx";
import CallBack from "./CallBack.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/call-back" element={<CallBack />} />
      </Routes> 
    </Router>
  ); 
}
export default App;
