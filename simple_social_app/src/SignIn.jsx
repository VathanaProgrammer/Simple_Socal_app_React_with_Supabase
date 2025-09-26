import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./SupabaseClient";
import { toast } from "react-hot-toast";
import image from "./assets/image/e701e49077bfe48c6c335559438ab28b.jpg";

// Modal for resending confirmation email
function ResendConfirmationModal({ email, password, onClose }) {
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    try {
      const { error: resendError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (resendError) {
        // Extract cooldown time if present
        const match = resendError.message.match(/\d+/);
        if (match) {
          const seconds = parseInt(match[0], 10);
          toast.error(
            `Please wait ${seconds} second${seconds > 1 ? "s" : ""} before resending.`
          );
        } else {
          toast.error(resendError.message);
        }
      } else {
        toast.success("Confirmation email resent! Please check your inbox.");
        onClose();
      }
    } catch (err) {
      toast.error("Error resending email: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-lg max-w-sm w-full p-6 text-center">
        <h2 className="text-lg font-semibold mb-4">Email Not Confirmed</h2>
        <p className="text-sm mb-6">
          Your email is not confirmed. Do you want to resend the confirmation email?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleResend}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Resend"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResendModal, setShowResendModal] = useState(false);

  useEffect(() => {
    document.title = "Sign In | Cat";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Email not confirmed")) {
          setShowResendModal(true);
        } else {
          toast.error(error.message);
        }

        console.log(error);
      } else {
        toast.success("Logged in successfully!");
        navigate("/"); // redirect after login
      }
    } catch (err) {
      toast.error("Error logging in: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const LoadingOverlay = () =>
    loading ? (
      <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg text-lg font-medium">
          Signing in, please wait...
        </div>
      </div>
    ) : null;

  return (
    <>
      <LoadingOverlay />
      {showResendModal && (
        <ResendConfirmationModal
          email={email}
          password={password}
          onClose={() => setShowResendModal(false)}
        />
      )}
      <div className="min-h-screen w-full flex justify-center items-center mx-auto bg-[#D2EEF5]">
        <div className="lg:w-[80%] lg:h-[700px] md:w-[90%] md:h-[600px] h-full min-h-[500px] flex flex-col md:justify-between rounded-[20px] border-white border-2 bg-transparent p-2">
          <form
            onSubmit={handleLogin}
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
                    Log in to your Account
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
                      disabled={loading}
                      autoComplete="username"
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
                      disabled={loading}
                      autoComplete="current-password"
                    />
                  </div>

                  {/* Sign in button */}
                  <div className="w-full flex flex-col gap-4 mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="h-[37px] w-full px-4 text-white bg-[#4153EF] rounded-[10px] focus:ring-1 focus:ring-gray-400 text-[15px] font-semibold disabled:opacity-50"
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-full hidden md:block md:w-1/2 bg-[#4153EF] rounded-[20px]">
              <img src={image} className="w-full h-full object-cover rounded-[20px]" alt="" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
