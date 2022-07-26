import type { NextPage } from 'next';
import Head from 'next/head';
import Banner from '../components/Banner/Banner';
import Header from '../components/Header/Header';
import requests from '../utils/requests';
import { Movie } from '../typings';
import MoviesRow from '../components/MoviesRow/MoviesRow';
import { useDispatch } from 'react-redux';
import { checkIsUserLoggedIn } from '../redux/actionFunctions';
import { useEffect } from 'react';
import { auth } from '../firebase';
import {
  // isLoadingSelector,
  showModalSelector,
} from '../redux/selectors';
import { useSelector } from 'react-redux';
import Modal from '../components/Modal/Modal';

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then(res => res.json()),
    fetch(requests.fetchTrending).then(res => res.json()),
    fetch(requests.fetchTopRated).then(res => res.json()),
    fetch(requests.fetchActionMovies).then(res => res.json()),
    fetch(requests.fetchComedyMovies).then(res => res.json()),
    fetch(requests.fetchHorrorMovies).then(res => res.json()),
    fetch(requests.fetchRomanceMovies).then(res => res.json()),
    fetch(requests.fetchDocumentaries).then(res => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};

type MoviesProps = {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  // products: Product[]
};

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: MoviesProps) => {
  const dispatch = useDispatch<any>();
  // const isLoading = useSelector(isLoadingSelector);
  const isModalShown = useSelector(showModalSelector);

  useEffect(() => {
    dispatch(checkIsUserLoggedIn());
  }, [auth]);

  // if (isLoading) return null;

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md: space-y-24">
          <MoviesRow title="Trending Now" movies={trendingNow} />
          <MoviesRow title="Top Rated" movies={topRated} />
          <MoviesRow title="Action Thrillers" movies={actionMovies} />
          <MoviesRow title="Comedies" movies={comedyMovies} />
          {/* my list */}
          <MoviesRow title="Scary Movies" movies={horrorMovies} />
          <MoviesRow title="Romance Movies" movies={romanceMovies} />
          <MoviesRow title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {isModalShown && <Modal />}
    </div>
  );
};

export default Home;
