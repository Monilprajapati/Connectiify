import React, { useEffect, useState } from "react";
import {
  AlignLeft,
  ComputerIcon,
  Cpu,
  Dices,
  FileMinus,
  Gamepad2,
  Laptop,
  Podcast,
  SearchIcon,
} from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [mobile, setMobile] = useState(window.innerWidth < 768 ? true : false);

  const channels = [
    { name: "Tech", link: "/channel", icon: Laptop },
    { name: "Fun", link: "/channel", icon: Dices },
    { name: "Games", link: "/channel", icon: Gamepad2 },
  ];

  const suggestedChannels = [
    { name: "CE", link: "/channel", icon: ComputerIcon },
    { name: "EC", link: "/channel", icon: FileMinus },
    { name: "IT", link: "/channel", icon: Cpu},
  ];

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth < 700 ? setMobile(true) : setMobile(false);
    });
  }, [mobile]);

  return (
    <div
      className={`bg-gray-600/90 opacity-0 z-50 fixed md:opacity-100 md:block md:relative md:min-h-screen ${
        open
          ? "opacity-100 w-[85%] md:w-[30%] lg:w-[23%] xl:w-[18%]"
          : `${mobile ? "hidden" : "w-20"}`
      } duration-500 px-4`}
    >
      <AlignLeft
        size={30}
        className={`cursor-pointer hidden  md:block  text-black absolute top-3
        ${open ? "right-3" : "left-5"}
        `}
        onClick={() => setOpen(!open)}
      />
      <hr className="hidden md:block md:relative top-14 text-black" />

      <div className="mt-8 md:mt-16 flex flex-col gap-3 relative text-black">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (mobile) setOpen(!open);
            // navigate("/")
          }}
          className="group flex items-center text-sm border-b md:border-0 border-black gap-3.5 font-medium p-3 hover:bg-white rounded-md rounded-l-none rounded-r-none border-opacity-25 "
        >
          <div>{React.createElement(Podcast, { size: 20 })}</div>

          <h2
            style={{ transitionDelay: `200ms` }}
            className={`whitespace-pre mt-1 duration-500 ${
              !open && "overflow-hidden opacity-0 translate-x-28"
            }`}
          >
            All Posts
          </h2>

          <h2
            className={`${
              open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre text-dark-grey rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
          >
            All Posts
          </h2>
        </button>

        {channels.map((channel, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              if (mobile) setOpen(!open);
              // navigate(channel.link)
            }}
            className="group flex items-center text-sm border-b md:border-0 border-black gap-3.5 font-medium p-3 hover:bg-white rounded-md rounded-l-none rounded-r-none border-opacity-25 "
          >
            <div>{React.createElement(channel.icon, { size: 20 })}</div>

            <h2
              style={{ transitionDelay: `${200 + index * 100}ms` }}
              className={`whitespace-pre mt-1 duration-500 ${
                !open && "overflow-hidden opacity-0 translate-x-28"
              }`}
            >
              {channel.name}
            </h2>

            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-dark-grey rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              {channel.name}
            </h2>
          </button>
        ))}

        <div
          className={`whitespace-pre bg-white rounded-md border-dark-grey border duration-500 mt-11 ${
            !open && "opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex relative items-center h-12 hover:transition">
            <input
              type="text"
              className={`text-black w-full px-3 pr-12 bg-transparent outline-none h-full`}
              placeholder="Search Channels..."
            />
            <button className="bg-transparent absolute right-4 text-black rounded-r-md">
              <SearchIcon size={22} />
            </button>
          </div>
        </div>

        <hr className="mt-5" />

        <div className="mt-4">
          <h2
            style={{
              transitionDelay: `400ms`,
            }}
            className={`whitespace-pre font-semibold text-sm md:text-lg duration-500 ${
              !open && "opacity-0 overflow-hidden  "
            }`}
          >
            Suggested Channels
          </h2>
        </div>

        <div className="mt-4 md:border-b-0 border-b border-dark-grey opacity-90 pb-2 flex flex-col gap-4 relative">
          {/* {suggestedChannels.map(rednerNewChannels)} */}
        </div>

        {suggestedChannels.map((channel, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              if (mobile) setOpen(!open);
              // navigate(channel.link)
            }}
            className="group flex items-center text-sm border-b md:border-0 border-black gap-3.5 font-medium p-3 hover:bg-white rounded-md rounded-l-none rounded-r-none border-opacity-25 "
          >
            <div>{React.createElement(channel.icon, { size: 20 })}</div>

            <h2
              style={{ transitionDelay: `${200 + index * 100}ms` }}
              className={`whitespace-pre mt-1 duration-500 ${
                !open && "overflow-hidden opacity-0 translate-x-28"
              }`}
            >
              {channel.name}
            </h2>

            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-dark-grey rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              {channel.name}
            </h2>
          </button>
        ))}

        {/* --- */}
      </div>

      {/* toggle button */}
    </div>
  );
};

export default Sidebar;
