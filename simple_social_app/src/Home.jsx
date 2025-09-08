import Layout from "./Layout";
import { useModal } from "./useModel";
import Message from "./Message";
import CreatePost from "./CreatePost";

function Home() {
  const { showPost, setShowPost, showCreateStory, setShowCreateStory } =
    useModal();
  return (
    <Layout>
      {/* Modals */}
      {showPost && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <CreatePost onClose={() => setShowPost(false)} />
        </div>
      )}

      {showCreateStory && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <CreateStory onClose={() => setShowCreateStory(false)} />
        </div>
      )}

      <section className="flex w-full justify-between gap-4 h-[calc(100vh-100px)]">
        {/* stories section */}
        <section className="w-1/2 overflow-y-auto scrollbar-hide">
          <div className="w-full flex gap-3 overflow-x-auto flex-nowrap scrollbar-hide py-2">
            <div className="group h-[154px] w-[100px] border border-gray-300 rounded-[10px] flex-shrink-0 flex flex-col justify-end p-2 bg-[#D2EEF5] relative overflow-hidden cursor-pointer">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover rounded-[10px] brightness-90"
                src="https://i.pinimg.com/736x/6d/ab/df/6dabdf20c6729e83a4e7ef332daf86de.jpg"
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

            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[154px] w-[100px] flex-shrink-0 border border-gray-300 rounded-[10px] flex flex-col justify-end p-2 bg-[#D2EEF5] relative overflow-hidden cursor-pointer"
              >
                <img
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-[10px]"
                  src={`https://picsum.photos/110/154?random=${index}`}
                  alt={`Story ${index + 1}`}
                />
                <img
                  className="absolute top-2 left-2 w-8 h-8 rounded-full border-[1px] border-[#4000FF]"
                  src={`https://i.pravatar.cc/50?img=${index + 1}`}
                  alt={`User ${index + 1}`}
                />
                <div className="relative z-10 p-1 mt-auto">
                  <p className="text-white text-xs font-medium">
                    User {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* post section */}
          <div>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-[260px] rounded-[10px] flex flex-col md:flex-row bg-white shadow-md overflow-hidden cursor-pointer mb-4"
              >
                {/* left column: profile + text + icons */}
                <div className="w-1/2 flex flex-col justify-between p-3">
                  {/* top: profile + post content */}
                  <div>
                    <div className="flex gap-2 mb-2">
                      <img
                        className="h-[45px] w-[45px] rounded-full"
                        src="https://i.pinimg.com/736x/01/25/c6/0125c6e9029cec950ede8376227feb5d.jpg"
                        alt=""
                      />
                      <div className="flex flex-col">
                        <h2 className="text-[14px] font-medium text-[#373737]">
                          Mew Mew
                        </h2>
                        <p className="text-[10px] font-normal text-[#575757]">
                          At 12-08-2025 12:30 PM
                        </p>
                      </div>
                    </div>
                    <p className="text-[13px] font-medium text-[#575757]">
                      This is a sample post content. It can be a text, image, or
                      video.
                    </p>
                  </div>

                  {/* bottom: icons */}
                  <div className="flex justify-start gap-2">
                    <button className="flex items-center gap-1 ">
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

                {/* right column: image */}
                <div className="w-1/2 h-full p-2">
                  <img
                    className="w-full h-full object-cover rounded-[10px]"
                    src="https://i.pinimg.com/736x/01/25/c6/0125c6e9029cec950ede8376227feb5d.jpg"
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        <Message />
      </section>
    </Layout>
  );
}

export default Home;
