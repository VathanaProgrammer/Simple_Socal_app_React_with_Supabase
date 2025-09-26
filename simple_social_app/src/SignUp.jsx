import { useEffect, useState } from "react";
import { signUpWithEmail } from "./auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import image from "./assets/image/e701e49077bfe48c6c335559438ab28b.jpg";

function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign Up | Cat";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSignUp = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      const result = await signUpWithEmail(email, password, username);

      if (result.success) {
        toast.success(result.message); // friendly success
        navigate("/sign-in"); // redirect only after telling user
      } else {
        toast.error(result.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-lg font-medium">
            Loading, please wait...
          </div>
        </div>
      )}

      {/* SignUp Form */}
      <div
        className={`min-h-screen w-full flex justify-center items-center mx-auto bg-[#D2EEF5] ${
          loading ? "pointer-events-none select-none" : ""
        }`}
      >
        <div className="lg:w-[80%] lg:h-[700px] md:w-[90%] md:h-[600px] h-full min-h-[500px] flex flex-col md:justify-between rounded-[20px] border-white border-2 bg-transparent p-2">
          <form
            onSubmit={handleEmailSignUp}
            className="bg-white flex-1 h-full rounded-[20px] flex flex-col p-3 lg:p-4 xl:p-5 justify-start"
          >
            <div className="w-full h-full flex justify-center items-center">
              <div className="md:w-1/2 w-full h-full">
                <header className="flex justify-start gap-4">
                  <iconify-icon
                    icon="dinkie-icons:cat-face"
                    width="48"
                    height="48"
                    onClick={() => navigate("/")}
                    style={{ color: "#4d4d4d" }}
                  ></iconify-icon>
                </header>
                <div className="w-full flex flex-col justify-center items-center mt-6 md:mt-15 p-3 md:px-5 lg:px-15 xl:px-20">
                  <h1 className="text-[36px] w-full font-medium text-start text-[#2C2C2C]">
                    Get Start Now
                  </h1>
                  <p className="w-full -m-1 text-start text-[15px] font-normal text-[#2C2C2C]">
                    Sign up today and start posting, chatting, and exploring!
                  </p>
                  <p
                    onClick={() => navigate("/sign-in")}
                    className="w-full pt-2 text-start text-[15px] font-normal text-blue-500 hover:underline cursor-pointer"
                  >
                    Already have an account?
                  </p>

                  <div className="w-full mt-5 flex flex-col gap-4">
                    <label className="text-[#2C2C2C] text-[15px] font-medium">
                      Username
                    </label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      disabled={loading}
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
                      disabled={loading}
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
                      disabled={loading}
                      className="h-[37px] -mt-2 w-full px-4 text-[#2C2C2C] border border-gray-400 rounded-[10px] focus:ring-1 focus:ring-gray-400 text-[15px]"
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="w-full flex flex-col gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="h-[37px] w-full px-4 text-white bg-[#4153EF] mt-4 rounded-[10px] focus:ring-1 focus:ring-gray-400 text-[15px] font-semibold disabled:opacity-50"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
              <div className="h-full hidden md:block md:w-1/2 bg-[#4153EF] rounded-[20px]"> <img src={image} className="w-full h-full object-cover rounded-[20px]" alt="" /></div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
