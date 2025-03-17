"use client";

import { usePathname } from "next/navigation";

const tabs = [
  {
    name: "Task Table",
    link: "/",
  },
  {
    name: "Project Card",
    link: "/projectcard",
  },
];

const Header = () => {
  const pathName = usePathname();

  return (
    <div className="flex justify-center w-[400px] mx-auto h-10 text-black text-xl font-semibold">
      {tabs.map((t, i) => (
        <a
          href={t.link}
          key={i}
          className={`flex items-center justify-center size-full ${
            pathName === t.link ? "text-white bg-blue-500" : "bg-white"
          }`}
        >
          {t.name}
        </a>
      ))}
    </div>
  );
};

export default Header;
