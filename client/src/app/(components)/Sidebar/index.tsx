'use client';

import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/state';
import { Archive, CircleDollarSign, Clipboard, Layout, LucideIcon, Menu, SlidersHorizontal, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === '/' && href === '/dashboard');

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? 'justify-center py-4' : 'justify-start px-8 py-4'
        }
      hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colores ${
        isActive ? 'bg-blue-200 text-white' : ''
      }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            isCollapsed ? 'hidden' : 'block'
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapesed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapesed));
  };

  const sidebareClassNames = ` fixed flex flex-col ${
    isSidebarCollapesed ? 'w-0 md:w-16' : 'w-72 md:w-64'
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebareClassNames}>
      {/* top logo */}

      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapesed ? 'px-5' : 'px-8'
        }`}
      >
        <div>logo</div>
        <h1
          className={`${
            isSidebarCollapesed ? 'hidden' : 'block'
          } font-extrabold text-2xl `}
        >
          2bfutur
        </h1>

        <button
          className="md:hidden px-3 py-3 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* links */}

      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapesed}
        />
        <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSidebarCollapesed}
        />
        <SidebarLink
          href="/pieces"
          icon={Clipboard}
          label="pieces"
          isCollapsed={isSidebarCollapesed}
        />
        {/* <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollapesed}
        />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapesed}
        />
        <SidebarLink
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSidebarCollapesed}
        /> */}
      </div>

      {/* footer */}

      <div className={`${isSidebarCollapesed ? "hidden" : "block" } mb-10`}>
        <p className="text-center text-xs text-gray-500">&copy; 2bfutur 2022</p>
      </div>
    </div>
  );
};

export default Sidebar;
