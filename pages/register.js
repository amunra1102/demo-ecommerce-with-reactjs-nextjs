import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import valid from '../utils/valid';
import { DataContext } from '../store/global-state';
import { postData } from '../utils/fetch-data';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const Register = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const [userData, setUserData] = useState(initialState);

  const { name, email, password, confirmPassword } = userData;

  const { auth } = state;

  const onChange = async event => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: 'NOTIFY', payload: {} });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const errMsg = valid(name, email, password, confirmPassword);
    if (errMsg) {
      return dispatch({ type: 'NOTIFY', payload: { error: errMsg } });
    }

    dispatch({ type: 'NOTIFY', payload: { loading: true } });

    const res = await postData('auth/register', userData);

    if (res.err) {
      return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
    }

    return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
  };

  console.log(99990, auth);
  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      router.push('/');
    }
  }, [auth]);

  return (
    <div>
      <Head>
        <title>Register Page</title>
      </Head>

      <form className="mx-auto my-4" style={{ maxWidth: 500 }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword2">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100">Register</button>
        <p className="my-2">
          Already have an account?
          <Link href="/signin">
            <a style={{ color: 'crimson' }}> Login</a>
          </Link>
        </p>
      </form>

    </div>
  );
};

export default Register;
