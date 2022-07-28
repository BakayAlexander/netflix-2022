import { onCurrentUserSubscriptionUpdate, Subscription } from '@stripe/firestore-stripe-payments';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import payments from '../lib/stripe';
import { loadingActionCreator } from '../redux/reducer';

const useSubscription = (user: User | null) => {
  const [subscription, setSubscription] = useState<Subscription | null>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingActionCreator(true));
    if (!user) return;
    try {
      onCurrentUserSubscriptionUpdate(payments, snapshot => {
        setSubscription(
          snapshot.subscriptions.filter(
            subscription => subscription.status === 'active' || subscription.status === 'trialing'
          )[0]
        );
      });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(loadingActionCreator(false));
    }
  }, [user]);
  //Bad method need to be changed
  // if (subscription) {
  //   dispatch(loadingActionCreator(false));
  // } else {
  //   setTimeout(() => dispatch(loadingActionCreator(false)), 1000);
  // }
  return subscription;
};

export default useSubscription;
