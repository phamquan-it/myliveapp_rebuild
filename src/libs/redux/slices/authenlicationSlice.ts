import { Platform } from "@/@type"
import { AsyncThunkAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from "../store";
import axiosClient from "@/apiClient/axiosClient";
import { Image } from "antd";
import { loginAsync } from "../asyncthunkfunc/authenlicateAsyncThunk";
interface LoginState {
    error?: any,
    user: any,
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
}
export const initialState: LoginState = {
    user: null,
    isPending: false,
    isError: false,
    isSuccess: false,
};

export interface ThunkApiConfig {
    state: { login: LoginState };
    dispatch: AppDispatch;
    extra: { apiBaseUrl: string };
}

// Create the slice
const authSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        resetState(state) {
            state.user = null;
            state.isPending = false;
            state.isError = false;
            state.isSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.isPending = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(loginAsync.fulfilled, (state, action: PayloadAction<any>) => {
                state.user = action.payload;
                state.isPending = false;
                state.isError = false;
                state.isSuccess = true;
            })
            .addCase(loginAsync.rejected, (state, action: PayloadAction<any>) => {
                state.user = null
                state.error = action.payload
                state.isPending = false;
                state.isError = true;
                state.isSuccess = false;
            })
            .addDefaultCase((state) => {
                state = initialState;
            })
    },
});
export const {resetState} = authSlice.actions
export default authSlice.reducer;
