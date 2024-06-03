import { Platform } from "@/@type";
import axiosClient from "@/apiClient/axiosClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "../slices/platformSlice";
// async thunk
const createPlatform = createAsyncThunk<Platform, Platform, ThunkApiConfig>(
    "platforms/createPlatform",
    async (platform, thunkAPI) => {
      try {
        const response = await axiosClient.post('/platform/create', platform);
        if (response.status !== 201) {
          throw new Error("Failed to create platform");
        }
        return response.data;
      } catch (error:any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
//async thunk update
const updatePlatform = createAsyncThunk<Platform, Platform, ThunkApiConfig>(
"platforms/updatePlatform",
async (platform, thunkAPI) => {
    try {
    const response = await axiosClient.put(`/platform/update/${platform.id}`, platform);
    if (response.status !== 200) {
        throw new Error("Failed to update platform");
    }
    return response.data;
    } catch (error:any) {
    return thunkAPI.rejectWithValue(error.message);
    }
}
);
//async thunk delete 
const deletePlatform = createAsyncThunk<string, string, ThunkApiConfig>(
"platforms/deletePlatform",
async (platformId, thunkAPI) => {
    try {
    const response = await axiosClient.delete(`/platform/delete/${platformId}`);
    if (response.status !== 200) {
        throw new Error("Failed to delete platform");
    }
    return platformId;
    } catch (error:any) {
    return thunkAPI.rejectWithValue(error.message);
    }
}
);
export {
    createPlatform,  
    updatePlatform,
    deletePlatform
}