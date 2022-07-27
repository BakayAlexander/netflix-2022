import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import netflixLoginImg from '../public/netflix-login.jpeg';
import { checkIsUserLoggedIn, signIn, signUp } from '../redux/actionFunctions';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { auth } from '../firebase';

type FormValues = {
  email: string;
  password: string;
};

const login = () => {
  const initialValues: FormValues = { email: '', password: '' };
  const [loginButton, setLoginButton] = useState(false);
  const dispatch = useDispatch<any>();
  const router = useRouter();

  useEffect(() => {
    dispatch(checkIsUserLoggedIn());
  }, [auth]);

  return (
    <div
      className="relative flex h-screen w-screen flex-col bg-black md:items-center justify-center
     md:bg-transparent"
    >
      <Head>
        <title>Login - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image src={netflixLoginImg} layout="fill" className="-z-10 !hidden opacity-60 sm:!inline" objectFit="cover" />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />
      <Formik
        initialValues={initialValues}
        validate={values => {
          const errors: FormikErrors<FormValues> = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          if (loginButton) {
            const res = dispatch(signIn(values.email, values.password));
            if (res) router.push('/');
          } else {
            const res = dispatch(signUp(values.email, values.password));
            if (res) router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 md:min-w-[450px]">
            <h1 className="text-4xl font-semibold">Sign in</h1>
            <div className="space-y-4">
              <label className="inline-block w-full">
                <Field type="email" name="email" placeholder="Email" className="input" />
              </label>
              <ErrorMessage name="email" component="div" className="p-1 text-[13px] font-light  text-orange-500" />
              <label className="inline-block w-full">
                <Field type="password" name="password" placeholder="Password" className="input" />
              </label>
              <ErrorMessage name="password" component="div" className="p-1 text-[13px] font-light  text-orange-500" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full roundede bg-[#e50914] py-3 font-semibold"
              onClick={() => setLoginButton(true)}
            >
              Sign in
            </button>
            <div className="text-[gray]">
              New to Netflix?
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-white hover:underline ml-1"
                onClick={() => setLoginButton(false)}
              >
                Sign up now
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default login;
