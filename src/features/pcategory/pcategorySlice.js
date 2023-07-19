import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pCategoryService from "./pcategoryService";

const initialState = {
  pCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: { message: "", error: { response: { status: null } } },
};

export const getProductCategories = createAsyncThunk(
  "productCategories/get-Categories",
  async (thunkAPI) => {
    try {
      return await pCategoryService.getProductCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const pCategorySlice = createSlice({
  name: "pCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pCategories = action.payload;
      })
      .addCase(getProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default pCategorySlice.reducer;
