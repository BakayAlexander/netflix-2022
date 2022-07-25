import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { baseUrlBanner } from '../../constants/movie';
import { Movie } from '../../typings';
import { FaPlay } from 'react-icons/fa';
import styles from './banner.module.css';
import { InformationCircleIcon } from '@heroicons/react/solid';

type Props = {
  netflixOriginals: Movie[];
};

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 ">
      <div className="absolute top-0 left-0 h-[95vh] w-screen  -z-10">
        <Image src={`${baseUrlBanner}${movie?.backdrop_path || movie?.poster_path}`} layout="fill" objectFit="cover" />
      </div>
      <h1 className="text-2xl lg:text-7xl md:text-4xl font-bold">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl text-shadow-md">
        {movie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className={`${styles.banner__button} bg-white text-black`}>
          <FaPlay className="h-3 w-3 text-black md:h-5 md:w-5" /> Play
        </button>
        <button className={`${styles.banner__button} bg-[gray]/70`}>
          <InformationCircleIcon className="h-4 w-4 md:h-6 md:w-6" /> More Info
        </button>
      </div>
    </div>
  );
};

export default Banner;
