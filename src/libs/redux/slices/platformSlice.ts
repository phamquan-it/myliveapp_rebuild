import { Platform } from "@/@type"
import { AsyncThunkAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from "../store";
import axiosClient from "@/apiClient/axiosClient";
import { Image } from "antd";
interface PlatformsState {
    platforms: Platform[],
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
}
export const initialState: PlatformsState = {
    platforms: [],
    isPending: false,
    isError: false,
    isSuccess: false,
};

export interface ThunkApiConfig {
    state: { platforms: PlatformsState };
    dispatch: AppDispatch;
    extra: { apiBaseUrl: string };
}
  
// Define the async thunk
export const fetchPlatform:any = createAsyncThunk<Platform[], string, ThunkApiConfig>(
    "platform/fetchPlatform",
    async () => {
      const response =  await axiosClient.get('/platform/list?language=en');
      if(response.status != 200) {
        console.log(response);
        throw new Error("Next work response was not ok");
      }
      const data =  response.data.data;
      const updatedData = data.map((item:Platform, index:number) => ({
        ...item,
        key: index + 1
      }));
      return  updatedData
    }
  );
  

// Create the slice
const platformsSlice = createSlice({
    name: "platforms",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPlatform.pending, (state) => {
          state.isPending = true;
          state.isError = false;
          state.isSuccess = false;
        })
        .addCase(fetchPlatform.fulfilled, (state, action: PayloadAction<Platform[]>) => {
          state.platforms = action.payload;
          state.isPending = false;
          state.isError = false;
          state.isSuccess = true;
        })
        .addCase(fetchPlatform.rejected, (state) => {
          state.isPending = false;
          state.isError = true;
          state.isSuccess = false;
        });
    },
  });
  
  export default platformsSlice.reducer;
  