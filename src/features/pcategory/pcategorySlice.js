import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pCategoryService from "./pcategoryService";

const initialState = {
  pCategories: [],
  createdCategory: "",
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

export const createProductCategory = createAsyncThunk(
  "productCategories/create-product-category",
  async (pCategoryData, thunkAPI) => {
    try {
      return await pCategoryService.createProductCategory(pCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// reset state when creating process finished
export const resetState = createAction("reset_all");
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
      })
      .addCase(createProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCategory = action.payload;
      })
      .addCase(createProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default pCategorySlice.reducer;
