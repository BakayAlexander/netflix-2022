import Image from 'next/image';
import React from 'react';
import { baseUrlCardImage } from '../../constants/movie';
import { Movie } from '../../typings';

type Props = {
  movie: Movie;
  // when using firebase
  // movie: Movie | DocumentData[]
};

const MovieCard = ({ movie }: Props) => {
  return (
    <div className="relative h-28 min-w-[100px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
      <Image
        src={`${baseUrlCardImage}${movie.backdrop_path || movie.poster_path}`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />
    </div>
  );
};

export default MovieCard;
