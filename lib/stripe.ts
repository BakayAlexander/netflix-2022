import { createCheckoutSession, getStripePayments } from '@stripe/firestore-stripe-payments';
import { getFunctions, httpsCallable } from '@firebase/functions';
import app from '../firebase';

const payments = getStripePayments(app, {
  productsCollection: 'products',
  customersCollection: 'customers',
});

const loadCheckout = async (priceId: string) => {
  await createCheckoutSession(payments, {
    price: priceId,
    //window.location.origin gives us opprtunity to go to main page, also we can wright custom page url, for example 'https://bakay.com'
    success_url: window.location.origin,
    cancel_url: window.location.origin,
    //if succeffull we riderect to Stripe payment portal
  })
    .then(snapshot => window.location.assign(snapshot.url))
    .catch(err => console.log(err.message));
};

const goToBillingPortal = async () => {
  const instance = getFunctions(app, 'us-central1');
  const functionRef = httpsCallable(instance, 'ext-firestore-stripe-payments-createPortalLink');

  await functionRef({
    returnUrl: `${window.location.origin}/account`,
  })
    .then(({ data }: any) => window.location.assign(data.url))
    .catch(err => console.log(err.message));
};

export { loadCheckout, goToBillingPortal };
export default payments;
