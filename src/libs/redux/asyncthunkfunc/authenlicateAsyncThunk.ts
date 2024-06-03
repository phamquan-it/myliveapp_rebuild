import axiosClient from "@/apiClient/axiosClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "../slices/authenlicationSlice";

interface Login{
    email: string,
    password: string
}
interface Register{
    email: string,
    name: string,
    password: string
}
export type{
    Login, Register
}


const loginAsync:any = createAsyncThunk<
  any, // Change 'any' to the type of your user object if possible
  { email: string; password: string }, // Change 'username' to 'email'
  ThunkApiConfig
>("login/loginAsync", async ({ email, password }, thunkAPI) => {
  try {
    const response = await axiosClient.post("/auth/login?language=en", { email, password }); // Change 'username' to 'email'
    if(response.status != 200){
        return thunkAPI.rejectWithValue("")
    }
    console.log(response);
    
    return response.data; // Assuming the response contains a 'user' object
  } catch (error) {
    return rejectWithValue(error);
  }
});




const registerAsync = createAsyncThunk<
  any, // Change 'any' to the type of your user object if possible
  { username: string; password: string },
  ThunkApiConfig
>("login/registerAsync", async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await axiosClient.post("/register", { username, password });
    return response.data.user; // Assuming the response contains a 'user' object
  } catch (error:any) {
    return rejectWithValue(error);
  }
});

export {
    loginAsync,
    registerAsync
}

function rejectWithValue(error: unknown): any {
    throw new Error("Function not implemented.");
}
