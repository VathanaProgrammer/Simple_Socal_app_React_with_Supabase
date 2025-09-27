import Layout from "./Layout";
import { useModal } from "./useModel";
import Message from "./Message";
import CreatePost from "./CreatePost";
import CreateStory from "./CreateStory";
import { supabase } from "./SupabaseClient";
import { useEffect, useState } from "react";
import { defaultProfileUrl } from "./defaultImage";
import dayjs from "dayjs";
import { useUser } from "./useUser";
import StoryViewer from "./StoryViewer";

export default function Home() {
  const { showPost, setShowPost, showCreateStory, setShowCreateStory } =
    useModal();
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  const { user } = useUser();

  // Fetch stories
  const fetchStories = async () => {
    const { data: storiesData, error: storiesError } = await supabase
      .from("stories")
      .select("*")
      .order("created_at", { ascending: false });

    if (storiesError) {
      console.error("Error fetching stories:", storiesError);
      return;
    }

    const userIds = [...new Set(storiesData.map((s) => s.user_id))];

    const { data: usersData, error: usersError } = await supabase
      .from("profiles")
      .select("id, username, avatar_url")
      .in("id", userIds);

    if (usersError) {
      console.error("Error fetching users:", usersError);
      return;
    }

    const combined = storiesData.map((s) => ({
      ...s,
      user: usersData.find((u) => u.id === s.user_id) || {
        username: "Someone",
        avatar_url: defaultProfileUrl,
      },
    }));

    setStories(combined);
  };

  // Fetch posts
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(
        "id, content, image_url, created_at, user:profiles!user_id(username, avatar_url)"
      )
      .order("created_at", { ascending: false });

    if (!error) setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
    fetchStories();
  }, [user]);

  // Group stories by user_id
  const groupedStories = stories.reduce((acc, story) => {
    if (!acc[story.user_id])
      acc[story.user_id] = { user: story.user, stories: [] };
    acc[story.user_id].stories.push(story);
    return acc;
  }, {});

  return (
    <Layout>
      {showPost && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <CreatePost
            onClose={() => setShowPost(false)}
            onPostSuccess={(newPost) => setPosts([newPost, ...posts])}
          />
        </div>
      )}

      {showCreateStory && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <CreateStory
            onClose={() => setShowCreateStory(false)}
            onStoriesSuccess={(newStories) =>
              setStories([newStories, ...stories])
            }
          />
        </div>
      )}

      {selectedStory && (
        <StoryViewer
          story={selectedStory.stories}
          user={selectedStory.user}
          onClose={() => setSelectedStory(null)}
        />
      )}

      {/* Main Flex Container */}
      <section className="flex w-full gap-4 flex-1 min-h-0">
        {/* Left Column */}
        <section className="md:w-1/2 flex flex-col min-h-0 w-full">
          {/* Stories */}
          <div className="w-full flex gap-3 overflow-x-auto flex-nowrap py-2">
            {/* Create Story */}
            <div className="group h-[154px] w-[100px] border border-gray-300 rounded-[10px] flex-shrink-0 flex flex-col justify-end p-2 bg-[#D2EEF5] relative overflow-hidden cursor-pointer">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover rounded-[10px] brightness-90"
                src={user?.avatar_url || defaultProfileUrl}
                alt="Create Story"
              />
              <div className="relative z-10 flex flex-col items-center justify-center text-white">
                <button
                  onClick={() => setShowCreateStory(true)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-600 text-white text-[15px] font-normal px-4 py-1 rounded-[10px] mb-1"
                >
                  + Add
                </button>
                <p className="text-xs text-center">Create Story</p>
              </div>
            </div>

            {/* User Stories */}
            {Object.entries(groupedStories).length === 0 ? (
              <p className="text-sm text-gray-500">No stories yet</p>
            ) : (
              Object.entries(groupedStories).map(([userId, userStories]) => (
                <div
                  key={userId}
                  className="h-[154px] w-[100px] relative cursor-pointer flex-shrink-0 rounded overflow-hidden border border-gray-300"
                  onClick={() =>
                    setSelectedStory({
                      stories: userStories.stories,
                      user: userStories.user || {
                        username: "Someone",
                        avatar_url: defaultProfileUrl,
                      },
                      index: 0,
                    })
                  }
                >
                  <img
                    className="w-full h-full object-cover"
                    src={userStories.stories[0].image_url}
                    alt="Story"
                  />
                  <img
                    className="absolute top-2 left-2 w-8 h-8 rounded-full border border-blue-600"
                    src={userStories.user?.avatar_url || defaultProfileUrl}
                    alt="User"
                  />
                  <div className="absolute bottom-2 left-2 text-white text-xs">
                    {user?.id === userId
                      ? "Your Story"
                      : userStories.user?.username || "Someone"}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="overflow-y-auto pr-2 max-h-[650px] scrollbar-hide">
            {posts.map((p) => (
              <div
                key={p.id}
                className="w-full rounded-[10px] flex flex-col md:flex-row bg-white shadow-md overflow-hidden cursor-pointer mb-4"
              >
                {/* Text Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-between p-3">
                  <div>
                    <div className="flex gap-2 mb-2">
                      <img
                        className="h-11 w-11 rounded-full object-cover"
                        src={p?.user?.avatar_url || defaultProfileUrl}
                        alt=""
                      />
                      <div className="flex flex-col">
                        <h2 className="text-sm font-medium text-[#373737]">
                          {p?.user?.username || "Unknown user"}
                        </h2>
                        <p className="text-[10px] font-normal text-[#575757]">
                          {dayjs(p?.created_at).format("YYYY-MM-DD HH:mm A")}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-[#575757]">
                      {p?.content}
                    </p>
                  </div>

                  {/* bottom: icons */}
                  <div className="flex justify-start gap-2 mt-3">
                    <button className="flex items-center gap-1 ">
                      <iconify-icon
                        icon="icon-park-outline:like"
                        width="18"
                        height="18"
                        style={{ color: "#353535" }}
                      />
                      <span className="text-[#575757] font-medium">12</span>
                    </button>
                    <button className="flex items-center gap-1">
                      <iconify-icon
                        icon="iconamoon:comment"
                        width="18"
                        height="18"
                        style={{ color: "#353535" }}
                      />
                      <span className="text-[#575757] font-medium">5</span>
                    </button>
                  </div>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-1/2 p-2">
                  <img
                    className="w-full aspect-[4/3] md:aspect-auto md:h-full object-cover rounded-[10px]"
                    src={p?.image_url}
                    alt={p?.image_url}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column (Chat) */}
        <div className="hidden md:w-1/2 md:flex flex-col flex-1 min-h-0">
          <Message />
        </div>
      </section>
    </Layout>
  );
}
