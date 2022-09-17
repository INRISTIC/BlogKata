import React, { useEffect } from 'react';
import { Alert, Pagination, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { setPageNumber, getArticles } from '../../redux/slices/listArticle';
import { ArticlesCard } from '../../components/ArticlesCard';

import HomeStyles from './home.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { pageNumber, articles, articlesCount, artCreate, isLoading, isError } = useSelector(
    (state) => state.listArticle
  );
  const { username } = useSelector((state) => state.saveUser.user);
  const handleChangePage = (page) => {
    dispatch(setPageNumber(page));
  };
  useEffect(() => {
    dispatch(getArticles(pageNumber * 5 - 5));
  }, [pageNumber, dispatch, username, artCreate]);
  if (isLoading === 'getArticles') {
    return (
      <Spin tip="Loading...">
        <Alert message="Идет загрузка" type="info" />
      </Spin>
    );
  }
  if (isError) {
    return <Alert message="Не удалось загрузить посты" type="error" />;
  }
  return (
    <ul>
      {articles.map((post) => (
        <ArticlesCard key={`${post.createdAt}${post.slug}`} {...post} />
      ))}
      <Pagination
        current={pageNumber}
        size="small"
        total={articlesCount}
        pageSize={5}
        onChange={handleChangePage}
        showSizeChanger={false}
        className={HomeStyles.paginate}
      />
    </ul>
  );
};

export default Home;
