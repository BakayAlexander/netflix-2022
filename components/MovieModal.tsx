import React, { useEffect, useState } from 'react';
import MuiModal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { currentMovieSelector, showModalSelector } from '../redux/selectors';
import { showModal } from '../redux/actionFunctions';
import { PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon } from '@heroicons/react/solid';
import ReactPlayer from 'react-player';
import { Element, Genre } from '../typings';
import { FaPlay } from 'react-icons/fa';
import { baseUrlMovieVideo, baseUrlYouTubeVideo, defaultUrlYouTubeVideo } from '../utils/requests';

const MovieModal = () => {
  const dispatch = useDispatch<any>();
  const isModalShown = useSelector(showModalSelector);
  const currentMovie = useSelector(currentMovieSelector);
  const [trailer, setTrailer] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!currentMovie) return;
    async function fetchMovie() {
      const data = await fetch(
        `${baseUrlMovieVideo}${currentMovie?.media_type === 'tv' ? 'tv' : 'movie'}/${
          currentMovie?.id
        }?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
      ).then(response => response.json());
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }
    fetchMovie();
  }, [currentMovie]);

  useEffect(() => {
    if (!isModalShown) return;
    function closeByEscape(event: any) {
      if (event.key === 'Escape') {
        dispatch(showModal(false));
      }
    }
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isModalShown]);

  const handleClose = () => {
    dispatch(showModal(false));
  };

  return (
    <MuiModal
      open={isModalShown}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modal__button absolute right-5 top-5 z-40 h-9 w-9 border-none bg-[#181818]"
        >
          <XIcon className="w-6 h-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`${baseUrlYouTubeVideo}${trailer || defaultUrlYouTubeVideo}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center px-10 justify-between">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black " />
                Play
              </button>
              <button className="modal__button">
                <PlusIcon className="h-7 w-7" />
              </button>
              <button className="modal__button">
                <ThumbUpIcon className="h-7 w-7" />
              </button>
            </div>
            <button onClick={() => setMuted(!muted)} className="modal__button">
              {muted ? <VolumeOffIcon className="h-6 w-6" /> : <VolumeUpIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {currentMovie && (
          <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
            <div className="space-y-6 text-lg">
              <div className="flex ite space-x-2 text-sm items-center">
                <p className="font-semibold text-green-400">
                  {Math.floor(currentMovie.vote_average * 10)}% Match
                </p>
                <p className="font-light">
                  {currentMovie.release_date || currentMovie.first_air_date}
                </p>
                <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-sm">
                  HD
                </div>
              </div>
              <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                <p className="w-5/6">{currentMovie.overview}</p>
                <div className="flex flex-col space-y-3 text-sm">
                  <div>
                    <span className="text-[gray]">Genres: </span>
                    {genres.map(genre => genre.name).join(', ')}
                  </div>
                  <div>
                    <span className="text-[gray]">Original language: </span>
                    {currentMovie.original_language}
                  </div>
                  <div>
                    <span className="text-[gray]">Total votes: </span>
                    {currentMovie.vote_count}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </MuiModal>
  );
};

export default MovieModal;
