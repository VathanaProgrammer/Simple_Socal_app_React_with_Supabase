import { useModal } from "./useModel";

function UserStories() {
  const { setShowCreateStory } = useModal();
  return (
    <section className="px-6 py-4">
      <div className="w-full flex gap-3 overflow-x-auto flex-wrap scrollbar-hide py-2">
        <div
          onClick={() => setShowCreateStory(true)}
          className="group h-[154px] w-[100px] border border-gray-300 rounded-[10px] flex-shrink-0 flex flex-col justify-center items-center p-2 bg-[#D2EEF5] relative overflow-hidden cursor-pointer"
        >
          <button className=" text-white text-[50px] font-normal px-4 py-1 rounded-[10px] mb-1">
            +
          </button>
        </div>

        {Array.from({ length: 18 }).map((_, index) => (
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
              <p className="text-white text-xs font-medium">User {index + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UserStories;
