import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import netflixLoginImg from '../public/netflix-login.jpeg';
import { signIn, signUp } from '../redux/actionFunctions';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCheckIsUserLoggedIn } from '../hooks/useCheckUserLogin';
import { useSelector } from 'react-redux';
import { loginErrorSelector } from '../redux/selectors';

type FormValues = {
  email: string;
  password: string;
};

const register = () => {
  const initialValues: FormValues = { email: '', password: '' };
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const loginError = useSelector(loginErrorSelector);

  return (
    <div
      className="relative flex h-screen w-screen flex-col bg-black md:items-center justify-center
     md:bg-transparent"
    >
      <Head>
        <title>Register - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src={netflixLoginImg}
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <Link href="/">
        <img
          src="https://rb.gy/ulxxee"
          alt="Netflix logo"
          className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
          width={100}
          height={100}
        />
      </Link>
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
          const res = await dispatch(signUp(values.email, values.password));
          if (res) router.push('/');
        }}
      >
        {({ isSubmitting }) => (
          <Form className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 md:min-w-[450px]">
            <h1 className="text-4xl font-semibold">Register</h1>
            <div className="space-y-4">
              <label className="inline-block w-full">
                <Field type="email" name="email" placeholder="Email" className="input" />
              </label>
              <ErrorMessage
                name="email"
                component="div"
                className="p-1 text-[13px] font-light  text-orange-500"
              />
              <label className="inline-block w-full">
                <Field type="password" name="password" placeholder="Password" className="input" />
              </label>
              <ErrorMessage
                name="password"
                component="div"
                className="p-1 text-[13px] font-light  text-orange-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full roundede bg-[#414141] py-3 font-semibold"
            >
              Register
            </button>
            {loginError && (
              <p className="p-1 text-[18px] font-light  text-orange-500 text-center">
                {loginError}
              </p>
            )}
            <div className="text-[gray] flex flex-row">
              Already a member?
              <Link href="/login">
                <p className="text-white hover:underline ml-1 cursor-pointer">Sign in</p>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default register;
