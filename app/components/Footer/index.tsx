import React from 'react';

const Footer = () => {
    return (
      <footer className="bg-gray-700 text-white p-4">
        <div className="container mx-auto text-center">
          <p>Timestamp.im</p>
          <div className="flex justify-center space-x-4">
            <a href="/contact" className="hover:text-gray-300">Contact</a>
            <a href="/about" className="hover:text-gray-300">About</a>
          </div>
          <p className="text-sm mt-2">© 2014 - 2023 Timestamp Tools</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;