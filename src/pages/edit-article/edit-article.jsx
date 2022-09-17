import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert } from 'antd';
import { useDispatch } from 'react-redux';

import { editArticle } from '../../redux/slices/listArticle';
import { ArticleForm } from '../../components/ArticleForm';
import { useGetFullPostQuery } from '../../redux/getApi';
import classes from '../new-article/new-article.module.scss';

const EditArticle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, isError } = useGetFullPostQuery(id);
  const onSubmit = async (date) => {
    const { tagList } = date;
    const article = { article: { ...date, tagList: tagList.map((el) => el.tag) } };
    if (id) {
      dispatch(editArticle({ id, article }));
    }
    navigate('/', { replace: true });
  };
  if (data) {
    return (
      <div className={classes.editArticleContainer}>
        <h2 className={classes.title}>Edit article</h2>
        <ArticleForm onSubmit={onSubmit} article={data.article} />
      </div>
    );
  }
  return <div>{isError && <Alert message="Не удалось изменить пост" type="error" />}</div>;
};

export default EditArticle;
