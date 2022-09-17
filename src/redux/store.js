import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { getApi } from './getApi';
import saveUser from './slices/user';
import listArticle from './slices/listArticle';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [getApi.reducerPath]: getApi.reducer,
    saveUser,
    listArticle,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getApi.middleware),
});

setupListeners(store.dispatch);
