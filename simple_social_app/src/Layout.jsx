// src/Layout.jsx
import { useModal } from "./useModel";
import CreatePost from "./CreatePost";
import CreateStory from "./CreateStory";
import { useNavigate } from "react-router-dom";
import { supabase } from "./SupabaseClient";
import { useUser } from "./useUser";
import { defaultProfileUrl } from "./defaultImage";

function Layout({ children }) {
  const navigate = useNavigate();
  const { showPost, setShowPost, showCreateStory, setShowCreateStory } =
    useModal();

  const { user } = useUser(); // ✅ get global user from context
  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/sign-in"); // redirect to login page after logout
  };

  return (
    <div className="w-full max-w-[1450px] min-h-screen mx-auto">
      {/* Header */}
      <header className="flex justify-between pt-2 items-center">
        <div className="flex justify-start items-center gap-4">
          <iconify-icon
            onClick={() => navigate("/")}
            icon="dinkie-icons:cat-face"
            width="48"
            height="48"
            style={{ color: "#4d4d4d" }}
          ></iconify-icon>
          <div className="relative w-[399px] h-[50px] bg-[#E3E3E3] rounded-[10px] flex items-center">
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
              className=" w-full pl-13 text-[20px] font-medium focus:outline-none"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="flex justify-end items-center gap-4">
          <iconify-icon
            icon="bi:file-earmark-post"
            width="38"
            height="38"
            onClick={() => setShowPost(true)}
            style={{ color: "#4d4d4d" }}
          ></iconify-icon>

          {user ? (
            <>
              <span className="text-[20px] font-semibold text-[#373737]">
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

      <main className="mt-4 flex-1 flex h-full overflow-hidden">{children}</main>
    </div>
  );
}

export default Layout;
