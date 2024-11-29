import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UserIcon,
  ChatBubbleLeftIcon,
  PlusIcon,
  BriefcaseIcon,
  XMarkIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const BottomNavigation = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Jobs", icon: <HomeIcon className="h-6 w-6" /> },
    {
      href: "/community",
      label: "Community",
      icon: <ChatBubbleLeftIcon className="h-6 w-6" />,
    },
    {
      href: "/job/my",
      label: "My Jobs",
      icon: <BriefcaseIcon className="h-6 w-6" />,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <UserIcon className="h-6 w-6" />,
    },
  ];

  return (
    <nav className="max-w-[450px] mx-auto fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-2 flex justify-between items-center">
      <ul className="flex justify-around flex-1">
        {navItems.slice(0, navItems.length / 2).map((item) => (
          <li key={item.href} className="flex flex-col items-center">
            <Link href={item.href}>
              <span
                className={`flex flex-col items-center text-sm ${
                  pathname === item.href ? "text-primary" : "text-gray-600"
                } hover:text-primary`}
              >
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </span>
            </Link>
          </li>
        ))}
        <div className="relative flex justify-center items-center">
          <div className="absolute -translate-y-1/2">
            {!isOpen ? (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-500 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
              >
                <PlusIcon className="h-6 w-6" />
              </button>
            ) : (
              <button
                onClick={() => setIsOpen(false)}
                className="bg-red-500 text-white rounded-full p-4 shadow-lg"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            )}
            {isOpen && (
              <div className="absolute w-48 left-1/2 -translate-x-1/2 bottom-12 flex justify-around items-center">
                <Link
                  href="/job/post"
                  className="bg-blue-500 text-white rounded-full p-4 shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <BriefcaseIcon className="h-6 w-6" />
                </Link>
                <Link
                  href="/community/post"
                  className="bg-blue-500 text-white rounded-full p-4 shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
                </Link>
              </div>
            )}
          </div>
        </div>
        {navItems.slice(navItems.length / 2).map((item) => (
          <li key={item.href} className="flex flex-col items-center">
            <Link href={item.href}>
              <span
                className={`flex flex-col items-center text-sm ${
                  pathname === item.href ? "text-primary" : "text-gray-600"
                } hover:text-primary`}
              >
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavigation;
