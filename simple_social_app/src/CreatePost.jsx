import { useState } from "react";
import { supabase } from "./SupabaseClient";
import { v4 as uuidv4 } from "uuid";
import { defaultProfileUrl } from "./defaultImage";
import toast from "react-hot-toast";
import { useUser } from "./useUser";

function CreatePost({ onClose, onPostSuccess }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const { user } = useUser();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedImage(file);
  };

  const handlePost = async () => {
    
    console.log("username for this user: ", user)
    if (!user) {
      toast.error("User not logged in");
      return;
    }

    if (!description.trim() || !selectedImage) {
      toast.error("Description and image required!");
      return;
    }

    try {
      setUploading(true); // show full-screen overlay

      // upload to storage
      const fileName = `${uuidv4()}-${selectedImage.name}`;
      const { error: uploadError } = await supabase.storage
        .from("posts")
        .upload(fileName, selectedImage);
      if (uploadError) throw uploadError;

      // get public URL
      const { data: publicUrlData } = supabase.storage
        .from("posts")
        .getPublicUrl(fileName);
      const imageUrl = publicUrlData?.publicUrl;
      if (!imageUrl) throw new Error("Failed to get public URL");

      // insert into DB
      const { data: insertedData, error: dbError } = await supabase
        .from("posts")
        .insert([
          {
            user_id: user.id,
            content: description,
            image_url: imageUrl,
            created_at: new Date(),
          },
        ])
        .select();
      if (dbError) throw dbError;

      // notify parent
      if (onPostSuccess) {
        onPostSuccess({
          ...insertedData[0],
          user: {
            username: user?.username || "Unknow",
            avatar_url: user?.avatar_url || defaultProfileUrl,
          },
        });
      }

      toast.success("Post created successfully!");
      setTimeout(() => onClose(), 600);
    } catch (err) {
      console.error(err);
      toast.error("Error creating post");
    } finally {
      setUploading(false); // hide overlay
    }
  };

  return (
    <>
      {/* FULL SCREEN BLOCKING LOADING OVERLAY */}
      {uploading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-lg p-4 flex items-center gap-3 shadow-lg">
            <svg
              className="animate-spin h-6 w-6 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <div className="text-gray-700 font-medium">Posting…</div>
          </div>
        </div>
      )}

      {/* CREATE POST MODAL */}
      <div className="bg-white w-[700px] h-[750px] flex flex-col rounded-lg p-6 border border-gray-300 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-gray-800">Create Post</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={uploading}
          >
            ✕
          </button>
        </div>

        {/* Textarea */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your description..."
          rows={4}
          className="text-[#777777] text-[15px] font-medium w-full focus:outline-none resize-none p-2 border rounded"
          disabled={uploading}
        />

        {/* Upload */}
        <div className="flex flex-col items-center justify-center flex-1">
          <label
            className={`cursor-pointer px-5 py-2 rounded transition-colors mb-4 ${
              uploading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {selectedImage ? "Change Image" : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={uploading}
            />
          </label>

          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              className="max-h-[300px] rounded-md"
            />
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={handlePost}
            disabled={uploading}
            className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-900 disabled:opacity-50"
          >
            {uploading ? "Posting..." : "Post"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-5 py-2 rounded hover:bg-gray-300"
            disabled={uploading}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
