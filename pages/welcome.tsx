import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import netflixLoginImg from '../public/netflix-login.jpeg';

const welcome = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col bg-[black] md:items-center justify-center md:bg-transparent">
      <Head>
        <title>Register - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src={netflixLoginImg}
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <Link href="/">
        <img
          src="https://rb.gy/ulxxee"
          alt="Netflix logo"
          className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
          width={100}
          height={100}
        />
      </Link>
      <div className="relative mt-24 space-y-8 rounded py-10 px-6 md:mt-0 md:max-w-[800px] md:px-14 md:min-w-[450px] text-center">
        <h1 className="text-2xl font-bold md:text-4xl">Unlimited movies, TV shows, and more.</h1>
        <h4 className="text-1xl font-semibold md:text-2xl">Watch anywhere. Cancel anytime.</h4>
        <p className="text-1xl font-light md:text-2xl">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
      </div>
      <div className="relative flex flex-row gap-10 py-10 px-6 md:mt-0 md:max-w-[800px] md:px-14 md:min-w-[450px]">
        <Link href="/login">
          <button className="w-[calc(100%/2.5)] roundede bg-[#e50914] py-3 font-semibold">
            Sign in
          </button>
        </Link>
        <Link href="/register">
          <button className="w-[calc(100%/2.5)] roundede bg-[#000000] py-3 font-semibold">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default welcome;
