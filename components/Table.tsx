import { CheckIcon } from '@heroicons/react/solid';
import { Product } from '@stripe/firestore-stripe-payments';
import React from 'react';

type TableProps = {
  products: Product[];
  selectedPlan: Product | null;
};

const Table = ({ products, selectedPlan }: TableProps) => {
  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="table__row">
          <td className="table__title">Monthly price</td>
          {products.map(product => (
            <td
              key={product.id}
              className={`table__item ${
                selectedPlan?.id === product.id ? 'text-[#e5e5e5]' : 'text-[gray]'
              }`}
            >
              {product.prices[0].unit_amount! / 100} USD
            </td>
          ))}
        </tr>
        <tr className="table__row">
          <td className="table__title">Video quality</td>
          {products.map(product => (
            <td
              key={product.id}
              className={`table__item ${
                selectedPlan?.id === product.id ? 'text-[#E50914]' : 'text-[gray]'
              }`}
            >
              {product.metadata.videoQuality}
            </td>
          ))}
        </tr>
        <tr className="table__row">
          <td className="table__title">Resolution</td>
          {products.map(product => (
            <td
              className={`table__item ${
                selectedPlan?.id === product.id ? 'text-[#E50914]' : 'text-[gray]'
              }`}
              key={product.id}
            >
              {product.metadata.resolution}
            </td>
          ))}
        </tr>
        <tr className="table__row">
          <td className="table__title">Watch on your TV, computer, mobile phone and tablet</td>
          {products.map(product => (
            <td
              className={`table__item ${
                selectedPlan?.id === product.id ? 'text-[#E50914]' : 'text-[gray]'
              }`}
              key={product.id}
            >
              {product.metadata.portability === 'true' && (
                <CheckIcon className="inline-block h-8 w-8" />
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
