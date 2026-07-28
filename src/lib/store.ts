import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { cvApi } from "./features/cv/cvApi";
import { playerSlice } from "./features/player/playerSlice";
import { coachSlice } from "./features/coach/coachSlice";
import authReducer from "@/redux/features/auth";
import evaluationReducer from "./features/evaluation/evaluationSlice";
import reportsReducer from "./features/reports/reportsSlice";
import { parentSlice } from "./features/parent/parentSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Use localStorage for persistence — guard against SSR (window is undefined on server)
const getStorage = () => {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("redux-persist/lib/storage").default;
  }
  // Minimal no-op storage for SSR (values are never actually stored server-side)
  return {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
  };
};

const evaluationPersistConfig = {
  key: "k10-evaluation-v1",
  storage: getStorage(),
  version: 1,
};

const persistedEvaluationReducer = persistReducer(
  evaluationPersistConfig,
  evaluationReducer
);

const reportsPersistConfig = {
  key: "k10-reports-v1",
  storage: getStorage(),
  version: 1,
};

const persistedReportsReducer = persistReducer(
  reportsPersistConfig,
  reportsReducer
);

const parentPersistConfig = {
  key: "k10-parent-v1",
  storage: getStorage(),
  version: 1,
};

const persistedParentReducer = persistReducer(
  parentPersistConfig,
  parentSlice.reducer
);

const rootReducer = combineReducers({
  [cvApi.reducerPath]: cvApi.reducer,
  player: playerSlice.reducer,
  coach: coachSlice.reducer,
  auth: authReducer,
  evaluation: persistedEvaluationReducer,
  reports: persistedReportsReducer,
  parent: persistedParentReducer,
});

// Single store instance — shared across the entire app
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(cvApi.middleware),
});

// Single persistor bound to the single store
export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
