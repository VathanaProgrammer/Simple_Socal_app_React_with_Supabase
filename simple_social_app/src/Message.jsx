function Message() {
  return (
    <section className="w-1/2 mt-2 border shadow bg-white border-gray-300 rounded-[10px] flex flex-col">
      <header className="flex justify-between w-full gap-2 p-4">
        <div className="flex flex-col w-1/2">
          <h1 className="font-medium text-[24px] text-[#373737]">Message</h1>
          <p className="text-[13px] font-normal text-[#373737]">
            Quick, clear, and concise communication
          </p>
        </div>

        <div className="w-1/2">
          <div className="relative w-full h-[50px] bg-[#E8E8E8] rounded-[10px] flex items-center">
            <input
              type="text"
              className="focus:outline-none px-4 w-full text-[13px] font-medium"
              placeholder="Search who you want to talk to here..."
            />
            <iconify-icon
              className="absolute right-3"
              icon="famicons:search"
              width="25"
              height="25"
              style={{ color: "#353535" }}
            ></iconify-icon>
          </div>
        </div>
      </header>

      <hr className="border-[#D2D2D2]" />

      <section className="flex flex-row gap-2 overflow-x-auto overflow-y-hidden p-4 scrollbar-hide">
        {Array.from({ length: 15 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative h-[45px] w-[45px] cursor-pointer">
              <img
                className="w-full h-full object-cover rounded-full"
                src={`https://i.pinimg.com/736x/01/25/c6/0125c6e9029cec950ede8376227feb5d.jpg`}
                alt=""
              />
              {/* online status */}
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#38CC0B] border-2 border-white rounded-full z-30"></span>
            </div>
            <p className="text-[#373737] text-[14px] font-medium -mt-1 text-center">
              Mew
            </p>
          </div>
        ))}
      </section>

      <hr className="border-[#D2D2D2]" />

      <section className="flex flex-col flex-1">
        {/* Chat header */}
        <header className="p-4 py-2 flex justify-start items-center gap-2">
          <img
            className="h-[45px] w-[45px] object-cover rounded-full"
            src={`https://i.pinimg.com/736x/01/25/c6/0125c6e9029cec950ede8376227feb5d.jpg`}
            alt=""
          />
          <div className="flex flex-col">
            <p className="text-[#373737] text-[16px] font-medium">Mew</p>
            <p className="text-[#03bb0c] text-[13px] font-normal">Online</p>
          </div>
        </header>

        <hr className="border-[#D2D2D2]" />

        {/* Chat messages + input */}
        <div className="flex flex-col flex-1 bg-[#F4F4F4] rounded-b-[10px]">
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {/* Receiver message */}
            <div className="flex items-start gap-2">
              <img
                className="h-[35px] w-[35px] rounded-full object-cover"
                src="https://i.pravatar.cc/35?img=3"
                alt=""
              />
              <div className="bg-white px-3 py-2 rounded-lg max-w-[60%] shadow">
                <p className="text-[14px] text-[#373737]">
                  Hey! How are you doing today?
                </p>
                <p className="text-[10px] text-gray-400 mt-1">12:30 PM</p>
              </div>
            </div>

            {/* Sender message */}
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white px-3 py-2 rounded-lg max-w-[60%] shadow">
                <p className="text-[14px]">
                  I'm good! Working on my project right now.
                </p>
                <p className="text-[10px] text-gray-200 mt-1 text-right">
                  12:32 PM
                </p>
              </div>
            </div>

            {/* Receiver message */}
            <div className="flex items-start gap-2">
              <img
                className="h-[35px] w-[35px] rounded-full object-cover"
                src="https://i.pravatar.cc/35?img=3"
                alt=""
              />
              <div className="bg-white px-3 py-2 rounded-lg max-w-[60%] shadow">
                <p className="text-[14px] text-[#373737]">
                  That’s great! Need any help?
                </p>
                <p className="text-[10px] text-gray-400 mt-1">12:33 PM</p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          {/* Input Area */}
          <div className="p-4">
            <div className="flex flex-row bg-white rounded-[10px] shadow min-h-[45px] h-[45px] items-center px-2">
              <input
                type="text"
                placeholder="Write a message..."
                className="flex-1 rounded-full px-4 py-2 focus:outline-none text-[14px]"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-9 h-9 flex items-center justify-center ml-">
                <iconify-icon
                  className="ms-1"
                  icon="wpf:sent"
                  width="20"
                  height="20"
                  style={{ color: "#fff" }}
                ></iconify-icon>
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Message;
