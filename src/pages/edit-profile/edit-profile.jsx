import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { saveUserInfo } from '../../redux/slices/user';

import EditStyles from './edit-profile.module.scss';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = async (user) => {
    if (user) {
      try {
        const { data } = await axios.put(
          'https://blog.kata.academy/api/user',
          {
            user,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        reset();
        dispatch(saveUserInfo(data.user.username));
        navigate('/', { replace: true });
        return data;
      } catch (err) {
        if (err?.response?.data?.errors)
          setError('username', {
            type: 'server',
            message: 'username is already taken.',
          });
      }
    }
  };
  return (
    <div className={EditStyles.wrapform}>
      <form className={EditStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={EditStyles.titleEdit}>Edit Profile</h2>
        <label className={EditStyles.labelEdit}>
          Username
          <input
            className={errors.username && EditStyles.errorInput}
            type="text"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username needs to be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username must not exceed 20 characters',
              },
            })}
            placeholder="Username"
          />
        </label>
        {errors.username && (
          <span className={EditStyles.errorEdit}>{errors.username?.message || 'Errors, please reconnect page'}</span>
        )}
        <label className={EditStyles.labelEdit}>
          Email address
          <input
            className={errors.email && EditStyles.errorInput}
            type="text"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email',
              },
            })}
            placeholder="Email address"
          />
        </label>
        {errors.email && (
          <span className={EditStyles.errorEdit}>{errors.email?.message || 'Errors, please reconnect page'}</span>
        )}
        <label className={EditStyles.labelEdit}>
          New password
          <input
            className={errors.password && EditStyles.errorInput}
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password needs to be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Password must not exceed 40 characters',
              },
            })}
            placeholder="New password"
          />
        </label>
        {errors.password && (
          <span className={EditStyles.errorEdit}>{errors.password?.message || 'Errors, please reconnect page'}</span>
        )}
        <label className={EditStyles.labelEdit}>
          Avatar image (url)
          <input
            className={errors.avatar && EditStyles.errorInput}
            type="text"
            {...register('avatar', {
              required: 'Confirm password is required',
              pattern: {
                value: /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi,
                message: 'Invalid url',
              },
            })}
            placeholder="Avatar image"
          />
        </label>
        {errors.avatar && (
          <span className={EditStyles.errorEdit}>{errors.avatar?.message || 'Errors, please reconnect page'}</span>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
export default EditProfile;
