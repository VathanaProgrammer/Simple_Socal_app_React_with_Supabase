import { useModal } from "./useModel";
import CreatePost from "./CreatePost";
import CreateStory from "./CreateStory";
import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();

  const { showPost, setShowPost, showCreateStory, setShowCreateStory } =
    useModal();

  return (
    <div className="w-full max-w-[1450px] mx-auto">
      {/* Header */}
      <header className="flex justify-between pt-2">
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
            onClick={() => setShowPost(true)} // ✅ Use prop from parent
            style={{ color: "#4d4d4d" }}
          ></iconify-icon>
          <h2 className="text-[20px] font-semibold text-[#373737]">Mew Mew</h2>
          <img
            onClick={() => navigate("/profile")}
            className="w-[50px] h-[50px] rounded-full"
            src="https://i.pinimg.com/736x/8b/65/74/8b657489fa35658b8a660e843261b433.jpg"
            alt=""
          />
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

      <main className="mt-4">{children}</main>
    </div>
  );
}

export default Layout;
