import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './redux/authSlice'
import chatReducer from './redux/chatSlice';
import uiReducer from './redux/uiSlice';

const chatPersistConfig = {
  key: 'chat',
  storage,
  whitelist: ['chatRooms', 'messages']
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: persistReducer(chatPersistConfig, chatReducer),
    ui: uiReducer
  }
});

export const persistor = persistStore(store);
export default store;