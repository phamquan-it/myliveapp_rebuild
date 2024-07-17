// src/features/logSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from "@/apiClient/axiosClient";

interface LogState {
  data: any[];
  total: number;
  isFetching: boolean;
  isError: boolean;
  keyword: string;
  pageSize: number;
  pageIndex: number;
}

const initialState: LogState = {
  data: [],
  total: 0,
  isFetching: false,
  isError: false,
  keyword: '',
  pageSize: 10,
  pageIndex: 1,
};

export const fetchLogs = createAsyncThunk(
  'logs/fetchLogs',
  async ({ keyword, pageIndex, pageSize, token }: any) => {
    const response = await axiosClient.get("/log/list?language=" + navigator.language, {
      params: {
        keyword: keyword,
        offset: (pageIndex - 1) * pageSize,
        limit: pageSize,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const logSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setPageIndex(state, action) {
      state.pageIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchLogs.rejected, (state) => {
        state.isFetching = false;
        state.isError = true;
      });
  },
});

export const { setKeyword, setPageSize, setPageIndex } = logSlice.actions;
export default logSlice.reducer;
