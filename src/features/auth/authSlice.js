import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const initialState = {
  user: getUserFromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: { message: "", error: { response: { status: null } } },
};

export const login = createAsyncThunk(
  "auth/login-admin",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/get-orders",
  async (thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      // console.log(error, thunkAPI); - access denied -> thunkAPI changes to undefined
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrdersByUser = createAsyncThunk(
  "order/get-orders-of-an-user",
  async (id, thunkAPI) => {
    try {
      return await authService.getOrder(id);
    } catch (error) {
      // console.log(error, thunkAPI); - access denied -> thunkAPI changes to undefined
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = { message: "Rejected", error: action.payload };
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = { message: "Rejected", error: action.payload };
      })
      .addCase(getOrdersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ordersByUser = action.payload;
        state.message = { message: "Success", error: null };
      })
      .addCase(getOrdersByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = { message: "Rejected", error: action.payload };
      });
  },
});

export default authSlice.reducer;
