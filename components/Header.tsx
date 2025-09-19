
import React from 'react';
import { ThreadsLogo } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="py-4 flex justify-center items-center">
      <ThreadsLogo className="h-8 w-8 text-white" />
    </header>
  );
};

export default Header;
