import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../../axios';

const initialState = {
  articles: [],
  articlesCount: 0,
  artCreate: false,
  pageNumber: 1,
  isLoading: '',
  isError: false,
  article: null,
  favorited: false,
  favoritesCount: 0,
};
export const getArticles = createAsyncThunk('articles/fetchArticles', async (pageNumber) => {
  const { data } = await axios.get(`/articles?offset=${pageNumber}&limit=5`);
  return data;
});
export const getOneArticle = createAsyncThunk('oneArticle/fetchArticles', async (id) => {
  const { data } = await axios.get(`articles/${id}`);
  return data;
});
export const createArticle = createAsyncThunk('createArticle/fetchCreateArticles', async (props) => {
  const { article } = props;
  const { data } = await axios.post('/articles', {
    article,
  });
  return data;
});
export const deleteArticle = createAsyncThunk('deleteArticle/fetchDeleteArticle', async (id) => {
  await axios.delete(`https://blog.kata.academy/api/articles/${id}`);
});
export const editArticle = createAsyncThunk('editArticle/fetchDeleteArticle', async ({ id, article }) => {
  await axios.put(`/articles/${id}`, article);
});
export const favorite = createAsyncThunk('favoriteArticle/fetchFavoriteArticle', async (id) => {
  const { data } = await axios.post(`/articles/${id}/favorite`);
  return data;
});
export const unFavorite = createAsyncThunk('unFavoriteArticle/fetchUnFavoriteArticle', async (slug) => {
  const { data } = await axios.delete(`/articles/${slug}/favorite`);
  return data;
});
export const listArticle = createSlice({
  name: 'listArticle',
  initialState,
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArticles.pending, (state) => {
      state.isLoading = 'getArticles';
      state.isError = false;
      state.articlesCount = 0;
      state.articles = [];
      state.article = null;
    });
    builder.addCase(getArticles.fulfilled, (state, action) => {
      state.isLoading = '';
      state.isError = false;
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    });
    builder.addCase(getArticles.rejected, (state) => {
      state.isError = true;
      state.isLoading = '';
      state.articlesCount = 0;
      state.articles = [];
    });
    builder.addCase(getOneArticle.pending, (state) => {
      state.isLoading = 'getOneArticle';
      state.articles = [];
      state.article = null;
      state.isError = false;
    });
    builder.addCase(getOneArticle.fulfilled, (state, action) => {
      state.isLoading = '';
      state.isError = false;
      state.article = action.payload.article;
      state.favorited = action.payload.article.favorited;
      state.favoritesCount = action.payload.article.favoritesCount;
    });
    builder.addCase(getOneArticle.rejected, (state) => {
      state.isError = true;
      state.isLoading = '';
      state.articles = [];
    });
    builder.addCase(createArticle.pending, (state) => {
      state.isError = false;
      state.artCreate = false;
      state.isLoading = 'createArticle';
      state.articles = [];
    });
    builder.addCase(createArticle.fulfilled, (state, action) => {
      state.isLoading = '';
      state.isError = false;
      state.artCreate = true;
      state.articles = [action.payload.article, ...state.articles];
    });
    builder.addCase(createArticle.rejected, (state) => {
      state.isLoading = '';
      state.isError = true;
    });
    builder.addCase(editArticle.pending, (state) => {
      state.artCreate = false;
      state.isError = false;
      state.isLoading = 'Edit';
    });
    builder.addCase(editArticle.fulfilled, (state) => {
      state.isLoading = '';
      state.isError = false;
      state.artCreate = true;
    });
    builder.addCase(editArticle.rejected, (state) => {
      state.isLoading = '';
      state.isError = true;
    });
    builder.addCase(deleteArticle.pending, (state) => {
      state.isError = false;
    });
    builder.addCase(deleteArticle.rejected, (state) => {
      state.isLoading = '';
      state.isError = true;
    });
    builder.addCase(favorite.fulfilled, (state, action) => {
      state.isError = false;
      state.articles = [...state.articles].map((article) =>
        article.slug === action.payload.article.slug ? action.payload.article : article
      );
      state.favorited = action.payload.article.favorited;
      state.favoritesCount = action.payload.article.favoritesCount;
    });
    builder.addCase(favorite.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(unFavorite.fulfilled, (state, action) => {
      state.articles = [...state.articles].map((article) =>
        article.slug === action.payload.article.slug ? action.payload.article : article
      );
      state.favorited = action.payload.article.favorited;
      state.favoritesCount = action.payload.article.favoritesCount;
    });
  },
});

export const { setPageNumber } = listArticle.actions;
export default listArticle.reducer;
