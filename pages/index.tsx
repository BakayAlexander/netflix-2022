import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header/Header';

const Home: NextPage = () => {
  return (
    <div
    // className="flex min-h-screen flex-col items-center justify-center py-2"
    >
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        {/* Main Banner */}
        <section>
          {/* Row films */}
          {/* Row films */}
          {/* Row films */}
          {/* Row films */}
          {/* Row films */}
        </section>
      </main>
      {/* Modal */}
    </div>
  );
};

export default Home;
