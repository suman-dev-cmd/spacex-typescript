import {configureStore} from '@reduxjs/toolkit';
import spaceReducer from './slice/spaceSlice';
export const store = configureStore({
    reducer:{
      spacex:spaceReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;