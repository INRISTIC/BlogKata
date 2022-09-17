import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createArticle } from '../../redux/slices/listArticle';
import { ArticleForm } from '../../components/ArticleForm';

import classes from './new-article.module.scss';

const NewArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (date) => {
    const { tagList } = date;
    const data = { article: { ...date, tagList: tagList.map((el) => el.tag) } };
    dispatch(createArticle(data));
    navigate('/', { replace: true });
  };
  return (
    <div className={classes.editArticleContainer}>
      <h2 className={classes.title}>Create new article</h2>
      <ArticleForm onSubmit={onSubmit} />
    </div>
  );
};

export default NewArticle;
