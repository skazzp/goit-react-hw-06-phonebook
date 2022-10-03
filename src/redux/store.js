import { current, configureStore, createSlice } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsInitial = {
  data: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitial,
  reducers: {
    addContact(state, action) {
      state.data.push(action.payload);
    },
    removeContact(state, action) {
      console.log(current(state));
      state.data = state.data.filter(elem => elem.id !== action.payload);
      // return state.data.filter(elem => elem.id !== action.payload); ???
    },
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    getFilter(state, action) {
      return action.payload;
    },
  },
});
export const { addContact, removeContact } = contactsSlice.actions;
export const { getFilter } = filterSlice.actions;

const persistConfig = {
  key: 'contacts',
  storage,
};

const persistedReducer = persistReducer(persistConfig, contactsSlice.reducer);

export const store = configureStore({
  reducer: {
    contacts: persistedReducer,
    filter: filterSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     contacts: contactsSlice.reducer,
//     filter: filterSlice.reducer,
//   },
// });
