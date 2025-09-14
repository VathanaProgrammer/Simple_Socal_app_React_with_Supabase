import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient"; // your Supabase client

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Sign In | Cat";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Supabase login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Email not confirmed")) {
          // Call Edge Function to resend confirmation
          await fetch("https://zajeidltrkiobkkkrius.supabase.co/resendConfirmation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });

          alert("Email not confirmed. A new confirmation link has been sent!");
        } else {
          alert(error.message);
        }
      } else {
        // Login successful
        // Success -> navigate to home or profile
        navigate("/"); // you can change to "/profile" if you want
        console.log("User logged in:", data.user);
      }
    } catch (err) {
      alert("Error logging in: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center mx-auto bg-[#D2EEF5]">
      <div className="w-[80%] h-[700px] flex flex-col justify-between rounded-[20px] border-white border-2 bg-transparent p-2">
        <form
          onSubmit={handleLogin} // ✅ use handleLogin
          className="bg-white h-full rounded-[20px] flex flex-col p-5 justify-start"
        >
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-1/2 h-full ">
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
                  Login in to your Account
                </h1>
                <p className="w-full -m-1 text-start text-[15px] font-normal text-[#2C2C2C]">
                  New here?{" "}
                  <span
                    onClick={() => navigate("/sign-up")}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Create an account
                  </span>{" "}
                  and join the community!
                </p>

                {/* Email input */}
                <div className="w-full mt-4 flex flex-col gap-4">
                  <label className="text-[#2C2C2C] text-[15px] font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-[37px] -mt-2 w-full px-4 text-[#2C2C2C] border border-gray-400 rounded-[10px] focus:ring-1 focus:ring-gray-400 text-[15px]"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Password input */}
                <div className="w-full mt-2 flex flex-col gap-4">
                  <label className="text-[#2C2C2C] text-[15px] font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-[37px] -mt-2 w-full px-4 text-[#2C2C2C] border border-gray-400 rounded-[10px] focus:ring-1 focus:ring-gray-400 text-[15px]"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {/* Remember me checkbox */}
                <div className="flex items-start w-full mt-2">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded-sm"
                    />
                  </div>
                  <label className="ms-2 text-sm font-medium text-[#2C2C2C]">
                    Remember me
                  </label>
                </div>

                {/* Sign in button */}
                <div className="w-full flex flex-col gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="h-[37px] w-full px-4 text-white bg-[#4153EF] mt-4 rounded-[10px] focus:ring-1 focus:ring-gray-400 text-[15px] font-semibold disabled:opacity-50"
                  >
                    {loading ? "Signing in..." : "Sign In"}
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

export default SignIn;
