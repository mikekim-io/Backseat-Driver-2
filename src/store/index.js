import { configureStore } from '@reduxjs/toolkit';
import gameState from './gameState';
import leaderboard from './leaderboard';
import position from './position';
import time from './time';

const store = configureStore({
  reducer: {
    gameState,
    leaderboard,
    position,
    time,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
