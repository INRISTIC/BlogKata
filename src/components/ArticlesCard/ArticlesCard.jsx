import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import vector from '../../assets/images/Vector.svg';
import heart from '../../assets/images/Heart.svg';
import { favorite, unFavorite } from '../../redux/slices/listArticle';

import CardStyles from './ArticlesCard.module.scss';

const ArticlesCard = ({ author, slug, body, title, updatedAt, favorited, favoritesCount, tagList }) => {
  const { isError } = useSelector((state) => state.listArticle);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const favoriteClick = async () => {
    if (token) {
      dispatch(favorite(slug));
    } else {
      alert('Необходимо авторизоваться');
    }
  };
  const unFavoriteClick = async () => {
    if (token) {
      dispatch(unFavorite(slug));
    }
  };
  const { image, username } = author;
  return (
    <li className={CardStyles.list}>
      <div className={CardStyles.block}>
        <div className={CardStyles.title}>
          <Link to={`/articles/${slug}`}>
            <h3 className={CardStyles.text}>{title}</h3>
          </Link>
          <button onClick={favorited ? unFavoriteClick : favoriteClick} className={CardStyles.btn} type="button">
            <img src={favorited ? heart : vector} alt="like" />
          </button>
          {isError && <Alert message="Ошибка" type="error" />}
          {favoritesCount}
        </div>
        <div className={CardStyles.tags}>
          {tagList.map((tag, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={index} className={CardStyles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <p className={CardStyles.par}>{body}</p>
      </div>
      <div className={CardStyles.auth}>
        <div className={CardStyles.userInfo}>
          <span className={CardStyles.userInfoText}>{username}</span>
          <span>{format(new Date(updatedAt), 'd MMMM, Y')} </span>
        </div>
        <img className={CardStyles.authImage} src={image} alt="avatar" />
      </div>
    </li>
  );
};

export default ArticlesCard;
