import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["auth/login-admin/rejected"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.stack"],
        // Ignore these paths in the state
        ignoredPaths: ["authReducer.user"],
      },
    }),
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    products: productReducer,
  },
});
