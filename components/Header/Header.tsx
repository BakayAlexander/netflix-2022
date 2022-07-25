import React from 'react';
import { BellIcon, SearchIcon } from '@heroicons/react/solid';
import styles from './header.module.css';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img src="https://rb.gy/ulxxee" width={100} height={100} className="cursor-pointer object-contain" />
        <ul className="hidden space-x-4 md:flex">
          <li className={styles.headerLink}>Home</li>
          <li className={styles.headerLink}>TV shows</li>
          <li className={styles.headerLink}>Movies</li>
          <li className={styles.headerLink}>New & Polupar</li>
          <li className={styles.headerLink}>My list</li>
        </ul>
      </div>
      <div className="flex item-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden sm:inline h-6 w-6" />
        <p className="hidden lg:inline">Kids s</p>
        <BellIcon className="h-6 w-6" />
        <Link href="/account">
          <img src="https://rb.gy/g1pwyx" alt="" className="cursor-pointer rounded" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
