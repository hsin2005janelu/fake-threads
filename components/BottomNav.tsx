
import React from 'react';
import { HomeIcon, SearchIcon, CreateIcon, HeartIcon, ProfileIcon } from './Icons';

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16">
        <button className="p-2 text-white">
          <HomeIcon className="h-7 w-7" />
        </button>
        <button className="p-2 text-gray-500 hover:text-white transition-colors">
          <SearchIcon className="h-7 w-7" />
        </button>
        <button className="p-2 text-gray-500 hover:text-white transition-colors">
          <CreateIcon className="h-7 w-7" />
        </button>
        <button className="p-2 text-gray-500 hover:text-white transition-colors">
          <HeartIcon className="h-7 w-7" />
        </button>
        <button className="p-2 text-gray-500 hover:text-white transition-colors">
          <ProfileIcon className="h-7 w-7" />
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
