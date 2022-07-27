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

export { loadCheckout };
export default payments;
