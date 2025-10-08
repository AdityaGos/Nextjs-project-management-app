"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { Briefcase, ChevronDown, ChevronRight, Home, Icon, LockIcon, LucideIcon, Search, Settings, User, Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const [showProjects, setShowProjects] = useState(true);
  const sidebarClassName = `fixed flex-col h-[100%]  justify-between shadow-xl transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white ${isSidebarCollapsed ? "w-0 hidden" : "w-64"} `;
  return (
    <div className={sidebarClassName}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* TOP LOGO / */}

        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            ProjectMate
          </div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
              }}
            >
              <X className="h-6 w-6 cursor-pointer text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>

        {/* TEAM  */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:bg-gray-200">
              Aditya's Team
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Private
              </p>
            </div>
          </div>
        </div>
        {/* NavBar Link */}
        <nav>
          <SidebarLink icon={Home} href="/dashboard" label="Home" />
          <SidebarLink icon={Briefcase} href="/timeline" label="Timeline" />
          <SidebarLink icon={Search} href="/search" label="Search" />
          <SidebarLink icon={Settings} href="/settings" label="Settings" />
          <SidebarLink icon={User} href="/users" label="Users" />
          <SidebarLink icon={Users} href="/teams" label="Teams" />
        </nav>

        <button onClick={()=> setShowProjects(prev=>!prev)} className="flex w-full items-center justify-between px-8 py-3 text-gray-500">
          <span className="">Projects</span>
{
            showProjects ? <ChevronDown className="h-4 w-4"/> : <ChevronRight className="h-4 w-4"/>
}
        </button>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`cursor-pointer relative flex items-center justify-start gap-3 px-8 py-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""} `}
      >
        {isActive && (
          <div className="absolute top-0 left-0 h-[100%] w-[5px] bg-blue-200" />
        )}

        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className="font-medium text-gray-800 dark:text-gray-100">
          {label}
        </span>
      </div>
    </Link>
  );
};
export default Sidebar;
