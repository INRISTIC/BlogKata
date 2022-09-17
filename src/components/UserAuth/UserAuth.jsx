import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import avatar from '../../assets/images/Avatar.svg';
import HeaderStyles from '../Header/Header.module.scss';
import { logOut } from '../../redux/slices/user';

const UserAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.saveUser.user);
  const token = localStorage.getItem('token');
  const handleOnClick = async () => {
    await dispatch(logOut());
    navigate('/', { replace: true });
  };
  if (token) {
    return (
      <div className={HeaderStyles.auth}>
        <Link className={HeaderStyles.authLink} to="/new-article">
          <button className={HeaderStyles.btnArticle} type="button">
            Create article
          </button>
        </Link>
        <Link to="/profile">
          <button className={HeaderStyles.btn} type="button">
            {username}
            <img className={HeaderStyles.imageAuth} src={avatar} alt="avatar" />
          </button>
        </Link>
        <Link className={HeaderStyles.authLink} to="/">
          <button onClick={handleOnClick} className={HeaderStyles.btnLogOut} type="button">
            Log Out
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div className={HeaderStyles.authLink}>
      <Link className={HeaderStyles.authLink} to="/sign-in">
        <button className={HeaderStyles.btn} type="button">
          Sign In
        </button>
      </Link>
      <Link to="/sign-up">
        <button className={HeaderStyles.btnUp} type="button">
          Sign Up
        </button>
      </Link>
    </div>
  );
};
export default UserAuth;
