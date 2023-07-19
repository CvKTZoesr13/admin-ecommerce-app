import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import colorReducer from "../features/color/colorSlice";
import blogReducer from "../features/blogs/blogSlice";
import pCategoryReducer from "../features/pcategory/pcategorySlice";
import bCategoryReducer from "../features/bcategory/bcategorySlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "auth/login-admin/rejected",
          "auth/login-admin/fulfilled",
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.stack", "message.error"],
        // Ignore these paths in the state
        ignoredPaths: ["authReducer.user"],
      },
    }),
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    products: productReducer,
    brands: brandReducer,
    pCategories: pCategoryReducer,
    bCategories: bCategoryReducer,
    colors: colorReducer,
    blogs: blogReducer,
    enquiries: enquiryReducer,
  },
});
