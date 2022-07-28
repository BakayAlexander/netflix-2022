import React, { useEffect, useState } from 'react';
import { BellIcon, SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import MobileMenu from './MobileMenu';
import { Toaster } from 'react-hot-toast';
import currentlyNotWorking from '../utils/currentlyNotWorking';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch<any>();

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
        <MobileMenu />
        <ul className="hidden space-x-4 md:flex">
          <li className="header__link" onClick={currentlyNotWorking}>
            Home
          </li>
          <li className="header__link" onClick={currentlyNotWorking}>
            TV shows
          </li>
          <li className="header__link" onClick={currentlyNotWorking}>
            Movies
          </li>
          <li className="header__link" onClick={currentlyNotWorking}>
            New & Polupar
          </li>
          <li className="header__link" onClick={currentlyNotWorking}>
            My list
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden sm:inline h-6 w-6" onClick={currentlyNotWorking} />
        <p className="hidden lg:inline" onClick={currentlyNotWorking}>
          Kids
        </p>
        <BellIcon className="h-6 w-6" onClick={currentlyNotWorking} />
        <Link href="/account">
          <img src="https://rb.gy/g1pwyx" alt="Profile icon" className="cursor-pointer rounded" />
        </Link>
      </div>
      <Toaster position="bottom-center" />
    </header>
  );
};

export default Header;
