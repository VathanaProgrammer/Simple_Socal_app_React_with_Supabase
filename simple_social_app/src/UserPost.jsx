import { useUser } from "./useUser";
import { supabase } from "./SupabaseClient";
import { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import { defaultProfileUrl } from "./defaultImage";

function UserPost() {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("posts")
      .select(
        `id, content, image_url, created_at, user:profiles!user_id(username, avatar_url)`
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) console.log("Error while fetching posts:", error);
    else setPosts(data);
  }, [user]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]); // ✅ now fetchPosts is a stable dependency

  return (
    <section className="px-6 py-4">
      <div>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((p) => (
            <div
              key={p.id}
              className="w-full lg:max-w-[800px] h-[260px] rounded-[10px] flex flex-col shadow md:flex-row bg-white overflow-hidden cursor-pointer mb-4"
            >
              {/* left column */}
              <div className="w-1/2 flex flex-col justify-between p-3">
                <div>
                  <div className="flex gap-2 mb-2">
                    <img
                      className="h-[45px] w-[45px] rounded-full"
                      src={p?.user?.avatar_url || defaultProfileUrl}
                      alt=""
                    />
                    <div className="flex flex-col">
                      <h2 className="text-[14px] font-medium text-[#373737]">
                        {p?.user?.username || "Unknown user"}
                      </h2>
                      <p className="text-[10px] font-normal text-[#575757]">
                        {dayjs(p.created_at).format("YYYY-MM-DD HH:mm A")}
                      </p>
                    </div>
                  </div>
                  <p className="text-[13px] font-medium text-[#575757]">
                    {p?.content || ""}
                  </p>
                </div>

                {/* bottom icons */}
                <div className="flex justify-start gap-2">
                  <button className="flex items-center gap-1">
                    <iconify-icon
                      icon="icon-park-outline:like"
                      width="18"
                      height="18"
                      style={{ color: "#353535" }}
                    ></iconify-icon>
                    <span className="text-[#575757] font-medium">12</span>
                  </button>
                  <button className="flex items-center gap-1">
                    <iconify-icon
                      icon="iconamoon:comment"
                      width="18"
                      height="18"
                      style={{ color: "#353535" }}
                    ></iconify-icon>
                    <span className="text-[#575757] font-medium">5</span>
                  </button>
                </div>
              </div>

              {/* right column */}
              <div className="w-1/2 h-full p-2">
                <img
                  className="w-full h-full object-cover rounded-[10px]"
                  src={p.image_url || "https://i.pinimg.com/736x/01/25/c6/0125c6e9029cec950ede8376227feb5d.jpg"}
                  alt=""
                />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default UserPost;
