import { useState } from "react";
import { supabase } from "./SupabaseClient";
import toast from "react-hot-toast";
import { defaultProfileUrl } from "./defaultImage";
import { useUser } from "./useUser";

function CreateStory({ onClose, onStoriesSuccess }) {
  const [preview, setPreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const{ user } = useUser();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setSelectedImage(file);

    setTimeout(() => {
      e.target.value = "";
    }, 0);
  };

  const handleStory = async () => {
    if (!selectedImage) {
      toast.error("Please select an image first!");
      return;
    }

    try {
      setLoading(true);

      // 1. Get user
      
      if (!user){
         toast.error("You are not login!")
         return;
      }

      // 2. Upload story image
      const fileName = `${user.id}/${Date.now()}-${selectedImage.name}`;
      const { error: uploadError } = await supabase.storage
        .from("stories")
        .upload(fileName, selectedImage);
      if (uploadError) throw uploadError;

      // 3. Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("stories")
        .getPublicUrl(fileName);
      const imageUrl = publicUrlData?.publicUrl;
      if (!imageUrl) throw new Error("Failed to get public URL");

      // 4. Insert story record
      const {data: insertedData, error: insertError } = await supabase
        .from("stories")
        .insert([{ user_id: user.id, image_url: imageUrl }]).select();
      if (insertError) throw insertError;

            if (onStoriesSuccess) {
              onStoriesSuccess({
                ...insertedData[0],
                user: {
                  username: user?.username || "Unknow",
                  avatar_url: user?.avatar_url || defaultProfileUrl,
                },
              });
            }

      toast.success("Story posted successfully!");
      setTimeout(() => onClose(), 600);
    } catch (err) {
      console.error("Error posting story:", err.message);
      toast.error("Failed to post story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FULL-SCREEN LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
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

      {/* CREATE STORY MODAL */}
      <div className="bg-white w-[700px] h-[750px] flex flex-col rounded-lg p-6 border border-gray-300 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-gray-800">Create Story</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        {/* Upload */}
        <div className="flex flex-col items-center justify-center flex-1">
          <label
            className={`cursor-pointer px-5 py-2 rounded transition-colors mb-4 ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {preview ? "Change Image" : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={loading}
            />
          </label>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="max-h-[400px] rounded-md"
            />
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={handleStory}
            disabled={loading}
            className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-900 disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-5 py-2 rounded hover:bg-gray-300"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateStory;
