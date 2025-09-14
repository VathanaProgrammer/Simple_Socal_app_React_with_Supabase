import { useEffect, useState } from "react";
import { defaultProfileUrl } from "./defaultImage";
import { useUser } from "./useUser";

export default function StoryViewer({ story, user, onClose }) {
  const [index, setIndex] = useState(story.index || 0);
  const [progress, setProgress] = useState(0);
  const storiesArray = Array.isArray(story.stories) ? story.stories : story;
  const { user: currentUser } = useUser();

  const isCurrentUser = currentUser?.id === user.id;
  const currentStory = storiesArray[index];

  if (!currentStory) {
    onClose();
    return null;
  }

  const nextStory = () => {
    if (index + 1 >= storiesArray.length) {
      onClose();
    } else {
      setIndex(i => i + 1);
      setProgress(0);
    }
  };

  // Only animate the current story
  useEffect(() => {
    setProgress(0);
    const timeout = setTimeout(() => setProgress(100), 50); // trigger transition
    const timer = setTimeout(nextStory, 5000); // auto-advance
    return () => {
      clearTimeout(timeout);
      clearTimeout(timer);
    };
  }, [index]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative w-full max-w-md h-full max-h-[90vh] rounded-md overflow-hidden">
        {/* Story Image */}
        <img
          src={currentStory.image_url}
          alt="Story"
          className="w-full h-full object-cover cursor-pointer"
          onClick={nextStory} // click to next
        />

        {/* Progress Bar */}
        <div className="absolute top-2 left-2 right-2 flex gap-1">
          {storiesArray.map((_, i) => (
            <div key={i} className="h-1 flex-1 bg-gray-400 rounded overflow-hidden">
              <div
                className="h-full bg-white"
                style={{
                  width: i < index ? "100%" : i === index ? `${progress}%` : "0%",
                  transition: i === index ? "width 5s linear" : "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={() => onClose()}
          className="absolute top-2 right-2 text-white text-lg font-bold"
        >
          ✕
        </button>

        {/* User Info */}
        <div className="absolute top-5 left-2 flex items-center gap-2">
          <img
            src={user.avatar_url || defaultProfileUrl}
            alt="User"
            className="w-12 h-12 rounded-full border border-white"
          />
          <span className="text-white text-md">
            {isCurrentUser ? "Your Story" : user.username || "Someone"}
          </span>
        </div>
      </div>
    </div>
  );
}

