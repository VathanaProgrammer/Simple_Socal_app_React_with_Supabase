// src/Layout.jsx
import { useModal } from "./useModel";
import CreatePost from "./CreatePost";
import CreateStory from "./CreateStory";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "./SupabaseClient";
import { useUser } from "./useUser";
import { defaultProfileUrl } from "./defaultImage";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { showPost, setShowPost, showCreateStory, setShowCreateStory } =
    useModal();

  const { user } = useUser(); // ✅ get global user from context
  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/sign-in"); // redirect to login page after logout
  };

  // Check if current page is chat
  const isChatPage = location.pathname === "/messages"; // adjust if your chat route is different
  return (
    <div className="w-full max-w-[1450px] min-h-screen mx-auto p-1">
      {/* Header */}
      <header className="flex justify-between pt-2 items-center relative">
        {/* Left: Logo */}
        <div className="flex justify-start items-center gap-4">
          <iconify-icon
            onClick={() => navigate("/")}
            icon="dinkie-icons:cat-face"
            width="48"
            height="48"
            style={{ color: "#4d4d4d" }}
          ></iconify-icon>

          {/* Search bar (visible on lg+, hidden on small) */}
          <div className="hidden md:flex relative w-[399px] h-[50px] bg-[#E3E3E3] rounded-[10px] items-center">
            <span className="absolute left-0 inset-y-0 flex items-center ps-4">
              <iconify-icon
                icon="quill:search"
                width="31"
                height="31"
                style={{ color: "#4d4d4d" }}
              ></iconify-icon>
            </span>
            <input
              type="text"
              className="w-full pl-13 text-[20px] font-medium focus:outline-none"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right: User Info */}
        <div className="flex justify-end items-center gap-4">
          <iconify-icon
            icon="bi:file-earmark-post"
            width="38"
            height="38"
            onClick={() => navigate("/create-post")}
            className="hidden lg:inline"
            style={{ color: "#4d4d4d" }}
          ></iconify-icon>

          {user ? (
            <>
              <span className="text-[20px] font-semibold text-[#373737] hidden md:inline">
                {user.user_metadata?.username || "Unknown User"}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
              <img
                onClick={() => navigate("/profile")}
                className="w-[50px] h-[50px] rounded-full cursor-pointer"
                src={user?.avatar_url || defaultProfileUrl}
                alt="User avatar"
              />
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/sign-in")}
                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-500 transition"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/sign-up")}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Bottom Bar → Only visible on small screens AND NOT in chat */}
        {!isChatPage && (
          <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-between items-center px-4 py-2">
            <div className="relative w-[70%] h-[45px] bg-[#E3E3E3] rounded-[10px] flex items-center">
              <span className="absolute left-0 inset-y-0 flex items-center ps-3">
                <iconify-icon
                  icon="quill:search"
                  width="24"
                  height="24"
                  style={{ color: "#4d4d4d" }}
                ></iconify-icon>
              </span>
              <input
                type="text"
                className="w-full pl-10 text-[16px] font-medium focus:outline-none"
                placeholder="Search"
              />
            </div>
            <div className="flex gap-3">
              <iconify-icon
                onClick={() => navigate("/messages")}
                icon="ri:chat-3-fill"
                width="32"
                height="32"
                className="cursor-pointer"
                style={{ color: "#4d4d4d" }}
              ></iconify-icon>
              <iconify-icon
                icon="bi:file-earmark-post"
                width="32"
                height="32"
                onClick={() => navigate("/create-post")}
                style={{ color: "#4d4d4d" }}
              ></iconify-icon>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
      {showPost && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <CreatePost onClose={() => setShowPost(false)} />
        </div>
      )}
      {showCreateStory && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <CreateStory onClose={() => setShowCreateStory(false)} />
        </div>
      )}

      <main className="mt-4 flex-1 flex h-full overflow-hidden">
        {children}
      </main>
    </div>
  );
}

export default Layout;
