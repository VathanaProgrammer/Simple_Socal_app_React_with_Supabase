import { useEffect, useState } from "react";
import { supabase } from "./SupabaseClient";
import { saveUserProfile } from "./auth";

function CallBack() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    document.title = "Sign Up | Cat";

    // Fetch logged-in user after redirect
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    }
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return alert("Username is required!");
    if (!user) return alert("User not found");

    // Save username in profiles table
    const { success, error } = await saveUserProfile(user.id, username);
    if (success) {
      alert("Username saved!");
      window.location.href = "/"; // redirect home
    } else {
      alert("Error: " + error);
    }
  };

  return (
    <div className="h-screen max-w-[1450px] mx-auto py-10 flex justify-center">
      <form onSubmit={handleSubmit} className="w-full">
        <header className="w-full flex flex-col items-center justify-center">
          <iconify-icon
            icon="dinkie-icons:cat-face"
            width="48"
            height="48"
            style={{ color: "#4d4d4d" }}
          ></iconify-icon>
          <h1 className="text-6xl text-[#2C2C2C] font-semibold">
            What should we call you?
          </h1>
          <p className="text-[15px] mt-2 text-[#2C2C2C] font-normal">
            Pick a username that will be your identity across Cat — be creative,
            but keep it simple!
          </p>
        </header>
        <div className="w-full flex flex-col items-center mt-10">
          {/* Email Input */}
          <div class="relative z-0 max-w-sm w-[500px] mb-5 group">
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="floating_text"
              id="floating_text"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_text"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Username
            </label>
          </div>

          {/* Submit Button */}
          <div className="max-w-sm w-[500px]">
            <button
              type="submit"
              className="h-[37px] w-full px-4 text-white bg-[#4153EF] rounded-[10px] focus:ring-1 focus:ring-gray-400 text-[15px] font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CallBack;
