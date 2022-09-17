import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Alert, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getOneArticle, favorite, unFavorite } from '../../redux/slices/listArticle';
import vector from '../../assets/images/Vector.svg';
import heart from '../../assets/images/Heart.svg';
import { ModalBtn } from '../../components/ModalBtn';

import FullArticlesStyles from './full-articles.module.scss';

const FullArticles = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const token = localStorage.getItem('token');
  const { article, favorited, favoritesCount, isLoading, isError } = useSelector((state) => state.listArticle);
  const { user } = useSelector((state) => state.saveUser);
  useEffect(() => {
    if (slug) {
      dispatch(getOneArticle(slug));
    }
  }, [slug]);
  const favoriteClick = async () => {
    if (token && slug) {
      dispatch(favorite(slug));
    }
  };
  const unFavoriteClick = async () => {
    if (token && slug) {
      dispatch(unFavorite(slug));
    }
  };
  if (isLoading === 'getOneArticle') {
    return (
      <Spin tip="Loading...">
        <Alert message="Идет загрузка" type="info" />
      </Spin>
    );
  }
  if (article) {
    const { author, title, body, createdAt, description, tagList } = article;
    const isOwnArticle = author.username === user?.username;
    return (
      <div className={FullArticlesStyles.list}>
        <div className={FullArticlesStyles.block}>
          <div className={FullArticlesStyles.title}>
            <h3 className={FullArticlesStyles.text}>{title}</h3>
            <button
              onClick={favorited ? unFavoriteClick : favoriteClick}
              className={FullArticlesStyles.btnFull}
              type="button"
            >
              <img src={favorited && token ? heart : vector} alt="like" />
            </button>
            {favoritesCount}
          </div>
          <div className={FullArticlesStyles.tags}>
            {tagList.map((tag, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={index} className={FullArticlesStyles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <ReactMarkdown children={body} />
          <ReactMarkdown children={description} />
        </div>
        <div className={FullArticlesStyles.authFull}>
          <div className={FullArticlesStyles.auth}>
            <div className={FullArticlesStyles.userInfo}>
              <span className={FullArticlesStyles.userInfoText}>{author.username}</span>
              <span className={FullArticlesStyles.userInfoText}>{format(new Date(createdAt), 'd MMMM, Y')} </span>
            </div>
            <img className={FullArticlesStyles.imageFull} src={author.image} alt="avatar" />
          </div>
          <div>
            {user && isOwnArticle && (
              <div className={FullArticlesStyles.btns}>
                <ModalBtn />
                <Link to={`/articles/${slug}/edit`}>
                  <button type="button" className={FullArticlesStyles.edit}>
                    Edit
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return <div>{isError && <Alert message="Не удалось загрузить пост" type="error" />}</div>;
};

export default FullArticles;
