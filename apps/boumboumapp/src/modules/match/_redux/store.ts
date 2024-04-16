import { configureStore } from "@reduxjs/toolkit";

import { matchReducer } from "#modules/match/_redux/matchSlide";

export const store = configureStore({
  reducer: {
    match: matchReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
