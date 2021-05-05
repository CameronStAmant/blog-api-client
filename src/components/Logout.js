import { Redirect } from 'react-router-dom';

const Logout = () => {
  window.localStorage.removeItem('user');

  return <Redirect to={'/'} />;
};

export default Logout;
