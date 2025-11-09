'use client';

import { twMerge } from 'tailwind-merge';

interface HeaderProps {
  className?: string;
}

const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <header
      className={twMerge(
        'sticky top-0 w-full h-16 bg-white border-b border-[#e4e4e7] z-10',
        className
      )}
      {...props}
    >
      <div className="flex justify-between items-center w-full py-3 px-4 md:px-7">
        {/* Left Section */}
        <div className="flex items-center justify-center gap-2">
          <img
            src="/images/img_icons20_panel_left.svg"
            alt="Panel"
            className="hidden lg:block w-5 h-5"
          />
          <span className="text-sm ml-12 mb-1 lg:ml-0 text-center justify-center flex font-medium text-[#1b1b1b]">Dashboard</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <img
            src="/images/img_rectangle_1.svg"
            alt="User Avatar"
            className="w-9 h-9 rounded-lg object-cover"
          />
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-medium text-[#1b1b1b]">Amit Jadhav</span>
            <span className="text-xs text-[#64748b]">Admin</span>
          </div>
          <img
            src="/images/img_vector.svg"
            alt="Dropdown"
            className=" h-3.5"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
