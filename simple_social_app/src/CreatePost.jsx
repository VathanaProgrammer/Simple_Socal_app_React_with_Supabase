import { useState } from "react";
import { supabase } from "./SupabaseClient";
import { v4 as uuidv4 } from "uuid";

function CreatePost({ onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(file);
  };

  const handlePost = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("User not logged in");

    if (!description || !selectedImage) {
      return alert("Description and image required!");
    }

    try {
      setUploading(true);

      const fileName = `${uuidv4()}-${selectedImage.name}`;
      const { error } = await supabase.storage.from("posts").upload(fileName, selectedImage);
      if (error) throw error;

      const { data: publicUrlData } = supabase.storage.from("posts").getPublicUrl(fileName);
      const imageUrl = publicUrlData.publicUrl;

      const { error: dbError } = await supabase.from("posts").insert([{
        user_id: user.id,
        content: description,
        image_url: imageUrl,
        created_at: new Date(),
      }]);
      if (dbError) throw dbError;

      alert("Post created successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error creating post");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white w-[700px] h-[750px] flex flex-col rounded-lg p-6 border border-gray-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-800">Create Post</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
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
        className="text-[#777777] text-[15px] font-medium w-full focus:outline-none resize-none"
      />

      {/* Upload */}
      <div className="flex flex-col items-center justify-center flex-1">
        <label className="cursor-pointer bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition-colors mb-4">
          {selectedImage ? "Change Image" : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        {/* Preview */}
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
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
