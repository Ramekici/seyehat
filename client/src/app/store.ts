import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import verilerReducer from '../features/veriler/verilerSlice';
import tarihReducer from '../features/veriler/tarihSlice';
import kategorilerReducer from '../features/veriler/kategorilerSlice';
import gazetelerReducer from '../features/veriler/gazetelerSlice';
import modalReducer from '../features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    veriler: verilerReducer,
    tarih: tarihReducer,
    kategoriler: kategorilerReducer,
    gazeteler: gazetelerReducer,
    modal: modalReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
