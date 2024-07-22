import { configureStore,  combineReducers } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authApi } from '../api/auth.api';


const preloadedState = {};

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer
})
//configuration store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleWare)=> 
        getDefaultMiddleWare().concat(
            authApi.middleware
        ),
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
//export dispatch
export const useAppDispatch = ()=> useDispatch<AppDispatch>();
export const useAppSelector:  TypedUseSelectorHook<RootState> = useSelector;