import { useModal } from "./useModel";
import { supabase } from "./SupabaseClient";
import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import StoryViewer from "./StoryViewer";

function UserStories() {
  const { setShowCreateStory } = useModal();
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const { user } = useUser();

  const fetchStories = async () => {
    if (!user) return;
    const { data: storiesData, error } = await supabase
      .from("stories")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && storiesData) setStories(storiesData);
  };

  useEffect(() => {
    fetchStories();
  }, [user]);

  return (
    <section className="px-6 py-4">
      <div className="w-full flex gap-3 overflow-x-auto flex-wrap scrollbar-hide py-2">
        {/* Create Story */}
        <div
          onClick={() => setShowCreateStory(true)}
          className="group h-[154px] w-[100px] border border-gray-300 rounded-[10px] flex-shrink-0 flex flex-col justify-center items-center p-2 bg-[#D2EEF5] relative overflow-hidden cursor-pointer"
        >
          <button className="text-white text-[50px] font-normal px-4 py-1 rounded-[10px] mb-1">
            +
          </button>
        </div>

        {/* User Stories */}
        {stories.map((s, i) => (
          <div
            key={s.id}
            className="h-[154px] w-[100px] flex-shrink-0 border border-gray-300 rounded-[10px] flex flex-col justify-end p-2 bg-[#D2EEF5] relative overflow-hidden cursor-pointer"
            onClick={() =>
              setSelectedStory({
                stories: [stories[i]], // <-- only the clicked story
                user: { username: "Your story", avatar_url: user.avatar_url },
                index: 0, // start from this single story
              })
            }
          >
            <img
              className="absolute top-0 left-0 w-full h-full object-cover rounded-[10px]"
              src={s.image_url}
              alt={`Story ${i + 1}`}
            />
            
          </div>
        ))}
      </div>

      {/* Story Viewer */}
      {selectedStory && (
        <StoryViewer
          story={selectedStory} // pass the full object: { stories, user, index }
          user={selectedStory.user}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </section>
  );
}

export default UserStories;
