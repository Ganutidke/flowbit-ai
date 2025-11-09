"use client";
import { Bot, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  className?: string;
  isActive?: boolean;
}

const menuItems = [
  { name: "Dashboard", icon: "/images/img_home_2.svg", isActive: true },
  { name: "Invoice", icon: "/images/img_bill.svg" },
  { name: "Other files", icon: "/images/img_vuesax_linear_document_copy.svg" },
  { name: "Departments", icon: "/images/img_lucide_layers_2.svg" },
  { name: "Users", icon: "/images/img_user_square.svg" },
  { name: "Settings", icon: "/images/img_setting.svg" },
  { name: "Chat with Data", link: "/chat-with-data", isActive: true },
];

const Sidebar = ({ className, isActive, ...props }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {/* Sidebar (Desktop + Mobile) */}
      <aside
        className={twMerge(
          "fixed top-0 left-0 h-screen w-[250px] bg-white border-r border-[#e4e4e7] flex flex-col justify-between transform transition-transform duration-300 z-40",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:w-[15%] lg:flex",
          className
        )}
        {...props}
      >
        {/* 🔹 Top Section */}
        <div className="flex flex-col h-full ">
          {/* Logo */}
          <div className=" flex border-b h-16 justify-center items-center  border-[#e4e4e7]">
            <div className="h-12 hover:bg-gray-400 px-3 rounded-lg cursor-pointer w-52 flex justify-between mx-auto items-center ">
              <div className="flex gap-3">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={32}
                  height={132}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Buchhaltung</span>
                  <span className="text-xs font-normal text-[#64748B]">12 members</span>
                </div>
              </div>
              <div>
                <ChevronsUpDown className="w-4 h-4"/>
              </div>
            </div>
          </div>

          {/* Label */}
          <div className="px-5 mt-3">
            <span className="text-[10px] font-medium tracking-[1px] text-black">
              GENERAL
            </span>
          </div>

          {/* Menu */}
          <nav className="flex flex-col mt-2 px-2">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                className={twMerge(
                  "flex items-center w-full rounded-md px-4 py-[10px] text-sm font-medium text-[#64748b] hover:bg-[#f6f6f7] hover:text-[#1b1464] transition-all",
                  item.isActive &&
                    activeIndex === idx &&
                    "bg-[#f0f4ff] text-[#1b1464] hover:bg-[#b6c5ee]"
                )}
                onClick={() => setActiveIndex(idx)}
              >
                {item.icon ? (
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-[18px] h-[18px] mr-3"
                  />
                ) : (
                  <Bot className="w-[18px] h-[18px] mr-3" />
                )}

                <Link href={item.link || "/"}>{item.name}</Link>
              </button>
            ))}
          </nav>
        </div>

        {/* 🔹 Bottom Brand */}
        <div className="flex items-center justify-center gap-2 border-t border-[#e4e4e7] py-5">
          <img
            src="/images/img_flowbit_logo_svg_flowbit.svg"
            alt="Flowbit Logo"
            className="w-[18px] h-[18px]"
          />
          <img
            src="/images/img_flowbit_ai_vector.svg"
            alt="Flowbit AI"
            className="w-[80px] h-auto"
          />
        </div>
      </aside>

      {/* Mobile Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/20 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } lg:hidden`}
      ></div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md border border-gray-200 shadow-sm"
      >
        <img
          src="/images/img_icons20_panel_left.svg"
          alt="Menu"
          className="w-5 h-5"
        />
      </button>
      
    </>
  );
};

export default Sidebar;
