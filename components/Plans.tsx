import { CheckIcon } from '@heroicons/react/solid';
import { Product } from '@stripe/firestore-stripe-payments';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loadCheckout } from '../lib/stripe';
import { logout } from '../redux/actionFunctions';
import { userSelector } from '../redux/selectors';
import Loader from './Loader';
import Table from './Table';

type PlansProps = {
  products: Product[];
};

const Plans = ({ products }: PlansProps) => {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[0]);
  const [isBillingLoading, setIsBillingLoading] = useState<boolean>(false);
  const user = useSelector(userSelector);

  const sortedProducts = products.sort(
    (a, b) => a.prices[0].unit_amount! - b.prices[0].unit_amount!
  );

  const subscripeToPlan = () => {
    console.log(user);
    if (!user) return;
    loadCheckout(selectedPlan?.prices[0].id!);
    setIsBillingLoading(true);
  };

  return (
    <div>
      <Head>
        <title>Plans - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="border-b border-white/10 bg-[#141414]">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            alt="Netflix logo"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
        </Link>
        <button
          className="text-lg font-medium hover:underline"
          onClick={async () => {
            dispatch(logout()).then((res: boolean) => {
              if (res) {
                router.push('/login');
              }
            });
          }}
        >
          Sign out
        </button>
      </header>
      <main className="pt-28 mx-auto max-w-5xl px-5 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium">Choose your plan</h1>
        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want. Ad-free.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations just for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel your plan anytime.
          </li>
        </ul>
        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center self-end justify-center md:w-3/5">
            {sortedProducts.map(product => (
              <div
                className={`plan__box ${
                  selectedPlan?.id === product.id ? 'opacity-100' : 'opacity-60'
                }`}
                key={product.id}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>
          <Table products={sortedProducts} selectedPlan={selectedPlan} />
          <button
            className="mx-auto w-11/12 rounded bg-[#e50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px]"
            disabled={!selectedPlan || isBillingLoading}
            onClick={subscripeToPlan}
          >
            {isBillingLoading ? <Loader color="dark:fill-gray-300" /> : 'Subscribe'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Plans;
