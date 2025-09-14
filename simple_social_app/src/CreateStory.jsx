import { useState } from "react";
import { supabase } from "./SupabaseClient";

function CreateStory({ onClose }) {
  const [preview, setPreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    setSelectedImage(file);

    setTimeout(() => {
      e.target.value = "";
    }, 0);
  };

  const handleStory = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);
    try {
      // 1. Get logged-in user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("User not logged in");

      // 2. Upload image to Supabase Storage
      const fileName = `${user.id}/${Date.now()}-${selectedImage.name}`;
      const { error: uploadError } = await supabase.storage
        .from("stories") // Make sure you created a bucket named "stories"
        .upload(fileName, selectedImage);

      if (uploadError) throw uploadError;

      // 3. Get public URL for the image
      const { data: publicUrlData } = supabase.storage
        .from("stories")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      // 4. Insert story record into DB
      const { error: insertError } = await supabase
        .from("stories")
        .insert([
          {
            user_id: user.id,
            image_url: imageUrl
          }
        ]);

      if (insertError) throw insertError;

      alert("Story posted successfully!");
      onClose();
    } catch (err) {
      console.error("Error posting story:", err.message);
      alert("Failed to post story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-[700px] h-[750px] flex flex-col rounded-lg p-6 border border-gray-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-800">Create Story</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* Upload */}
      <div className="flex flex-col items-center justify-center flex-1">
        <label className="cursor-pointer bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition-colors mb-4">
          {preview ? "Change Image" : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Preview */}
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
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CreateStory;
