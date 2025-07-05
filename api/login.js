import { store } from '@auth';
import { axios, router, toaster } from '@lib';
import { decode } from 'jsonwebtoken';

const login = async (ref, data) => {
  try {
    // execute google recaptcha
    data['g-recaptcha-response'] = await ref.current.executeAsync();

    const { token } = await axios.post('login', data);
    const decoded = decode(token);
    if (!decoded) {
      throw new Error('Error! We cannot log you in at the moment');
    }
    store.dispatch({ type: 'SET', jwt: token });
    const { role } = decoded;

    // notify user and other actions
    toaster.success('Login successful');

    switch (role) {
      case 'user':
        router.push('/');
        break;
      default:
        router.push(`/${role}`);
    }
  } catch (err) {
    toaster.error(err.message);

    // reset google recaptcha on invalid login
    ref.current.reset();
  }
};

export default login;
