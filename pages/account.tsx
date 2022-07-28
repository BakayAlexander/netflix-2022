import { getProducts, Product } from '@stripe/firestore-stripe-payments';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Membership from '../components/Membership';
import useSubscription from '../hooks/useSubscription';
import payments from '../lib/stripe';
import { logout } from '../redux/actionFunctions';
import { userSelector } from '../redux/selectors';
import { goToBillingPortal } from '../lib/stripe';
import { useCheckIsUserLoggedIn } from '../hooks/useCheckUserLogin';

type AccountProps = {
  products: Product[];
};

const account = ({ products }: AccountProps) => {
  const user = useSelector(userSelector);
  const subscription = useSubscription(user);
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const date = new Date(subscription?.created!).toLocaleString();

  dispatch(useCheckIsUserLoggedIn());

  return (
    <div>
      <Head>
        <title>Account - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-[#141414]">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
        </Link>
        <Link href="/account">
          <img src="https://rb.gy/g1pwyx" alt="" className="cursor-pointer rounded" />
        </Link>
      </header>
      <main className="pt-24 mx-auto max-w-6xl px-5 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3-xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="icon" className="h-7 w-7" />
            <p className="text-sm font-semibold text-[#555]">Member since: {date}</p>
          </div>
        </div>
        <Membership />
        <div className="mt-6 grid grid-cols-1 gap-x4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4>Plan details</h4>
          {/* Find the current plan */}
          <div className="col-span-2 font-medium">
            {products.filter(product => product.id === subscription?.product)[0]?.name}
          </div>
          <p
            className="cursor-pointer text-blue-500 hover:underline md:text-right"
            onClick={goToBillingPortal}
          >
            Change plan
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={() => {
              dispatch(logout()).then((res: boolean) => {
                if (res) {
                  router.push('/login');
                }
              });
            }}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  );
};

export default account;

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then(res => res)
    .catch(error => console.log(error.message));

  return {
    props: {
      products,
    },
  };
};
