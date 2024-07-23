import { configureStore,  combineReducers } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authApi } from '../api/auth.api';
import { commonPlatformApi } from '../api/platform.api';
import { serverScriptApi } from '../api/script-library.api';


const preloadedState = {};

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [commonPlatformApi.reducerPath]: commonPlatformApi.reducer,
    [serverScriptApi.reducerPath]: serverScriptApi.reducer
})
//configuration store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleWare)=> 
        getDefaultMiddleWare().concat(
            authApi.middleware,
            commonPlatformApi.middleware,
            serverScriptApi.middleware
        ),
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
//export dispatch
export const useAppDispatch = ()=> useDispatch<AppDispatch>();
export const useAppSelector:  TypedUseSelectorHook<RootState> = useSelector;