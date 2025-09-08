function UserPost() {
  return (
    <section className="px-6 py-4">
      {/* post section */}
      <div className=" overflow-y-auto">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="w-full lg:max-w-[800px] h-[260px] rounded-[10px] flex flex-col shadow md:flex-row bg-white  overflow-hidden cursor-pointer mb-4"
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
  );
}

export default UserPost;
