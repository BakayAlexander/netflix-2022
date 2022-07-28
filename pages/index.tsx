import Head from 'next/head';
import { useEffect } from 'react';
import { Movie } from '../typings';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsUserLoggedIn } from '../redux/actionFunctions';
import { auth } from '../firebase';
import { isLoadingSelector, showModalSelector, userSelector } from '../redux/selectors';
import requests from '../utils/requests';
import Banner from '../components/Banner';
import Header from '../components/Header';
import MovieModal from '../components/MovieModal';
import MoviesRow from '../components/MoviesRow';
import Plans from '../components/Plans';
import { getProducts, Product } from '@stripe/firestore-stripe-payments';
import payments from '../lib/stripe';
import useSubscription from '../hooks/useSubscription';
import useList from '../hooks/useList';
import { useRouter } from 'next/router';

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

  const products = await getProducts(payments, { includePrices: true, activeOnly: true })
    .then(res => res)
    .catch(err => console.log(err.message));

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
      products,
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
  products: Product[];
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
  products,
}: MoviesProps) => {
  const dispatch = useDispatch<any>();
  const isModalShown = useSelector(showModalSelector);
  const user = useSelector(userSelector);
  const subscription = useSubscription(user);
  const myListMovies = useList(user?.uid);
  const isLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    dispatch(checkIsUserLoggedIn());
  }, [auth]);

  // if (isLoading || subscription === null) return null;
  if (!subscription) return <Plans products={products} />;

  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
        isModalShown && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md: space-y-24">
          <MoviesRow title="Trending Now" movies={trendingNow} />
          {myListMovies.length > 0 && <MoviesRow title="My List" movies={myListMovies} />}
          <MoviesRow title="Top Rated" movies={topRated} />
          <MoviesRow title="Action Thrillers" movies={actionMovies} />
          <MoviesRow title="Comedies" movies={comedyMovies} />
          <MoviesRow title="Scary Movies" movies={horrorMovies} />
          <MoviesRow title="Romance Movies" movies={romanceMovies} />
          <MoviesRow title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {isModalShown && <MovieModal />}
    </div>
  );
};

export default Home;
