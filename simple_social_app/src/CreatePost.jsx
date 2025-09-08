import { useState } from "react";

function CreatePost({ onClose }) {
  const [selectedImage, setSelectImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectImage(URL.createObjectURL(file));
    }
  };
  return (
    <section className="bg-white border border-gray-300 w-[700px] h-[750px] flex flex-col rounded-[10px]">
      {/* Header */}
      <header className="flex justify-between px-5 py-3 border-b border-gray-300">
        <h1 className="text-[22px] font-semibold text-[#3f3f3f]">
          Create Post
        </h1>
        <iconify-icon
          icon="proicons:cancel"
          width="28"
          height="28"
          onClick={onClose}
          style={{ color: "#777777" }}
        ></iconify-icon>
      </header>

      {/* Content */}

      <div className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
        <textarea
          className="text-[#777777] text-[15px] font-medium w-full focus:outline-none resize-none"
          placeholder="Write your description ..."
          rows={5}
        />
        {!selectedImage ? (
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                onChange={handleImageChange}
                type="file"
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div className="flex justify-center">
            <img
              src={selectedImage}
              alt={selectedImage}
              className="w-full max-h-64 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Footer - Button always at the bottom */}
      <div className="w-full flex justify-end p-4 border-t border-gray-300">
        <button className="px-4 py-2 text-[17px] font-medium text-white bg-[#4153EF] rounded-md">
          Post
        </button>
      </div>
    </section>
  );
}

export default CreatePost;
