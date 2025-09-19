import Layout from "./Layout";
import { useEffect, useState } from "react";
import UserStories from "./UserStories";
import UserPost from "./UserPost";
import { useUser } from "./useUser";
import { defaultProfileUrl } from "./defaultImage";
import { supabase } from "./SupabaseClient";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

function Profile() {
  const { user } = useUser();
  const [activeTap, setActiveTap] = useState("posts");
  const [localUser, setLocalUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [loading, setLoading] = useState(false);

  // Show loading overlay
  const LoadingOverlay = () =>
    loading ? (
      <div className="fixed inset-0 bg-black/20 bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg text-lg font-medium">
          Loading, please wait...
        </div>
      </div>
    ) : null;

  // Update avatar
  const handleChangeAvatar = async (file) => {
    if (!file || !user) return;
    setLoading(true);

    try {
      const ext = file.name.split(".").pop();
      const filePath = `${user.id}-${uuidv4()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
          metadata: { owner: user.id },
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) throw new Error("Failed to get public URL");

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: urlData.publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setLocalUser({ ...localUser, avatar_url: urlData.publicUrl });

      toast.success("Avatar updated successfully!");
    } catch (error) {
      console.error("Error updating avatar:", error.message || error);
      toast.error("Failed to update avatar.");
    } finally {
      setLoading(false);
    }
  };

  // Update username & bio
  const handleSaveProfile = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ username, bio })
        .eq("id", user.id);

      if (error) throw error;

      user.username = username;
      user.bio = bio;

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error.message || error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLocalUser(user);
    setUsername(user?.username || "");
    setBio(user?.bio || "");
    document.title = "Cat | Profile";
  }, [user]);

  return (
    <Layout>
      <LoadingOverlay /> {/* Show overlay when loading */}
      <section className="w-full bg-white shadow h-[85vh] rounded-[10px] flex flex-col">
        {/* Header */}
        <header className="w-full px-6 py-4">
          <h1 className="text-[#111111] text-[20px] font-medium">My Profile</h1>
        </header>

        <hr className="border-gray-300" />

        <div className="w-full flex px-6 py-4 gap-4">
          {/* Avatar */}
          <div className="relative h-[128px] w-[128px] cursor-pointer">
            <img
              className="w-full h-full object-cover rounded-full"
              src={localUser?.avatar_url || defaultProfileUrl}
              alt="User Avatar"
            />
            <input
              type="file"
              accept="image/*"
              id="avatarInput"
              className="hidden"
              onChange={(e) => handleChangeAvatar(e.target.files[0])}
            />
            <div
              className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-md flex items-center justify-center hover:bg-gray-100"
              onClick={() => document.getElementById("avatarInput").click()}
            >
              <iconify-icon
                icon="fluent-mdl2:camera"
                width="24"
                height="24"
                style={{ color: "#393939" }}
              ></iconify-icon>
            </div>
          </div>

          {/* Username & Bio */}
          <div className="flex flex-col items-start flex-1">
            {isEditing ? (
              <div className="flex flex-col gap-2 w-full">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border rounded px-2 border-gray-100 focus:outline-none focus:border-b-blue-600 py-1 w-full text-[24px] font-semibold"
                />
                <input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="border rounded border-gray-100 focus:outline-none focus:border-b-blue-600 px-2 py-1 w-full h-[60px]"
                  placeholder="Write your bio..."
                />
                <div className="flex gap-2 mt-1">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={handleSaveProfile}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    className="bg-gray-300 px-3 py-1 rounded"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-full">
                <h1 className="text-[32px] text-[#0051FF] font-semibold flex items-center gap-2">
                  {user?.username}
                  <iconify-icon
                    className="cursor-pointer"
                    icon="hugeicons:edit-04"
                    width="28"
                    height="28"
                    onClick={() => setIsEditing(true)}
                  ></iconify-icon>
                </h1>
                <p className="text-[15px] text-[#2C2C2C] font-normal">
                  {user?.bio || "No bio yet."}
                </p>
              </div>
            )}
          </div>
        </div>

        <hr className="border-gray-300" />

        {/* Tabs */}
        <div className="flex px-6 py-4 gap-4">
          <button
            onClick={() => setActiveTap("posts")}
            className={`text-[17px] font-semibold ${
              activeTap === "posts"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 text-[15px]"
            }`}
          >
            Your Posts
          </button>
          <button
            onClick={() => setActiveTap("stories")}
            className={`text-[17px] font-semibold ${
              activeTap === "stories"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 text-[15px]"
            }`}
          >
            Your Stories
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-4 scrollbar-hide">
          {activeTap === "posts" && <UserPost />}
          {activeTap === "stories" && <UserStories />}
        </div>
      </section>
    </Layout>
  );
}

export default Profile;
