import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Timestamp Tools</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/web-dev" className="hover:text-gray-300">Web Dev</a></li>
            {/* 更多导航项 */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;