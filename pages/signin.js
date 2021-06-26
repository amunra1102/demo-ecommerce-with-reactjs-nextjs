import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';
import Cookie from 'js-cookie';

import { DataContext } from '../store/global-state';
import { postData } from '../utils/fetch-data';

const initialState = { email: '', password: '' };

const SignIn = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;


  const router = useRouter();

  const handleChange = event => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: 'NOTIFY', payload: {} });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch({ type: 'NOTIFY', payload: { loading: true } });
    const res = await postData('auth/login', userData);

    if (res.err) {
      return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
    }

    dispatch({ type: 'NOTIFY', payload: { success: res.msg } });

    dispatch({
      type: 'AUTH', payload: {
        token: res.access_token,
        user: res.user
      }
    });

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7
    });

    localStorage.setItem('firstLogin', true);
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      router.push('/');
    }
  }, [auth]);

  return (
    <div>
      <Head>
        <title>Sign in Page</title>
      </Head>

      <form className="mx-auto my-4" style={{ maxWidth: 500 }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100">Login</button>

        <p className="my-2">
          You don't have an account?
          <Link href="/register">
            <a style={{ color: 'crimson' }}> Register</a>
          </Link>
        </p>
      </form>

    </div>
  );
};

export default SignIn;
