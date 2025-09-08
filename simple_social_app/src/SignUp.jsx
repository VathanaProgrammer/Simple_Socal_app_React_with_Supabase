import { useEffect, useState } from "react";
import { signUpWithEmail } from "./auth";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Sign Up | Cat";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(""); // new state for validation errors

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    
    setError(""); // reset previous errors

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    const result = await signUpWithEmail(email, password, username);
    if (result.success) {
      navigate("/");
      // redirect user or clear form
    } else {
      setError(result.error || "Something went wrong."); // display Supabase error
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center mx-auto bg-[#D2EEF5]">
      <div className="w-[80%] h-[700px] flex flex-col justify-between rounded-[20px] border-white border-2 bg-transparent p-2">
        <form
          onSubmit={handleEmailSignUp}
          className="bg-white h-full rounded-[20px] flex flex-col p-5 justify-start"
        >
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-1/2 h-full">
              <header className="flex justify-start gap-4">
                <iconify-icon
                  icon="dinkie-icons:cat-face"
                  width="48"
                  height="48"
                  style={{ color: "#4d4d4d" }}
                ></iconify-icon>
              </header>
              <div className="w-full flex flex-col justify-center items-center mt-15 px-20">
                <h1 className="text-[36px] w-full font-medium text-start text-[#2C2C2C]">
                  Get Start Now
                </h1>
                <p className="w-full -m-1 text-start text-[15px] font-normal text-[#2C2C2C]">
                  Sign up today and start posting, chatting, and exploring!
                </p>

                {/* Display error message */}
                {error && (
                  <div className="w-full text-red-600 text-sm mt-2 text-start">
                    {error}
                  </div>
                )}

                <div className="w-full mt-5 flex flex-col gap-4">
                  <label className="text-[#2C2C2C] text-[15px] font-medium">
                    Username
                  </label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    className="h-[37px] -mt-2 w-full px-4 text-[#2C2C2C] border border-gray-400 rounded-[10px] focus:ring-1 focus:ring-gray-400 text-[15px]"
                    placeholder="Enter your username"
                  />
                </div>
                <div className="w-full mt-2 flex flex-col gap-4">
                  <label className="text-[#2C2C2C] text-[15px] font-medium">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="h-[37px] -mt-2 w-full px-4 text-[#2C2C2C] border border-gray-400 rounded-[10px] focus:ring-1 focus:ring-gray-400 text-[15px]"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="w-full mt-2 flex flex-col gap-4">
                  <label className="text-[#2C2C2C] text-[15px] font-medium">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="h-[37px] -mt-2 w-full px-4 text-[#2C2C2C] border border-gray-400 rounded-[10px] focus:ring-1 focus:ring-gray-400 text-[15px]"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="w-full flex flex-col gap-4">
                  <button
                    type="submit"
                    className="h-[37px] w-full px-4 text-white bg-[#4153EF] mt-4 rounded-[10px] focus:ring-1 focus:ring-gray-400 text-[15px] font-semibold"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full bg-[#4153EF] rounded-[20px]"></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
