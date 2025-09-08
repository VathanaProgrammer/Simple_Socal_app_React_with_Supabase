import Layout from "./Layout";
import { useState } from "react";
import UserStories from "./UserStories";
import UserPost from "./UserPost";

function Profile() {
  const [activeTap, setActiveTap] = useState("posts");

  return (
    <Layout>
      {/* FIX: Give fixed height and flex-col */}
      <section className="w-full bg-white shadow h-[85vh] rounded-[10px] flex flex-col">
        <header className="w-full px-6 py-4">
          <h1 className="text-[#111111] text-[20px] text-start font-medium">
            My Profile
          </h1>
        </header>

        <hr className="border-gray-300" />

        <div className="w-full flex px-6 py-4 gap-4">
          <div className="relative h-[128px] w-[128px] cursor-pointer">
            <img
              className="w-full h-full object-cover rounded-full"
              src={`https://i.pinimg.com/736x/01/25/c6/0125c6e9029cec950ede8376227feb5d.jpg`}
              alt=""
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#38CC0B] border-2 border-white rounded-full z-30"></span>
          </div>

          <div className="flex flex-col items-start">
            <h1 className="text-[32px] text-[#0051FF] font-semibold">Mew Mew</h1>
            <p className="text-[15px] text-[#2C2C2C] font-normal">
              Keep going don't stop!
            </p>
          </div>
        </div>

        <hr className="border-gray-300" />

        <div className="flex px-6 py-4 gap-4">
          <button
            onClick={() => setActiveTap("posts")}
            className={`text-[17px] font-semibold ${
              activeTap === "posts"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 text-[15px]"
            }`}
          >
            Your Posts
          </button>
          <button
            onClick={() => setActiveTap("stories")}
            className={`text-[17px] font-semibold ${
              activeTap === "stories"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 text-[15px]"
            }`}
          >
            Your Stories
          </button>
        </div>

        {/* SCROLLABLE CONTAINER */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          {activeTap === "posts" && <UserPost />}
          {activeTap === "stories" && <UserStories />}
        </div>
      </section>
    </Layout>
  );
}


export default Profile;
