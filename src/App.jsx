import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getUserInfo } from './redux/slices/user';
import { Layout } from './components/Layout';
import { Home } from './pages/home';
import { FullArticles } from './pages/full-articles';
import { SignUp } from './pages/sign-up';
import { SignIn } from './pages/sign-in';
import { NewArticle } from './pages/new-article';
import { EditProfile } from './pages/edit-profile';
import { EditArticle } from './pages/edit-article';
import UserAuthorized from './hoc/UserAuthorized';
import RequireAuth from './hoc/RequireAuth';

import 'antd/dist/antd.min.css';
import './App.module.scss';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      dispatch(getUserInfo());
    }
  }, [token]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Home />} />
        <Route path="/articles/:slug" element={<FullArticles />} />
        <Route
          path="/sign-up"
          element={
            <UserAuthorized>
              <SignUp />
            </UserAuthorized>
          }
        />
        <Route
          path="/sign-in"
          element={
            <UserAuthorized>
              <SignIn />
            </UserAuthorized>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <EditProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/new-article"
          element={
            <RequireAuth>
              <NewArticle />
            </RequireAuth>
          }
        />
        <Route
          path="/articles/:id/edit"
          element={
            <RequireAuth>
              <EditArticle />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
