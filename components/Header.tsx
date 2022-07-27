import React, { useEffect, useState } from 'react';
import { BellIcon, SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            alt="Netflix logo"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
        </Link>
        <ul className="hidden space-x-4 md:flex">
          <li className="header__link">Home</li>
          <li className="header__link">TV shows</li>
          <li className="header__link">Movies</li>
          <li className="header__link">New & Polupar</li>
          <li className="header__link">My list</li>
        </ul>
      </div>
      <div className="flex items-center justify-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden sm:inline h-6 w-6" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <Link href="/account">
          <img src="https://rb.gy/g1pwyx" alt="Profile icon" className="cursor-pointer rounded" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
