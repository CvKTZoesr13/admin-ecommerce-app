import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import BlogList from "./pages/BlogList";
import BlogCatList from "./pages/BlogCatList";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import CategoryList from "./pages/CategoryList";
import ColorList from "./pages/ColorList";
import BrandList from "./pages/BrandList";
import ProductList from "./pages/ProductList";
import AddBlog from "./pages/AddBlog";
import AddBlogCategory from "./pages/AddBlogCategory";
import AddColor from "./pages/AddColor";
import AddCategory from "./pages/AddCategory";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import AddCoupon from "./pages/AddCoupon";
import CouponList from "./pages/CouponList";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="blog-list" element={<BlogList />} />
          <Route path="blog" element={<AddBlog />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon-list" element={<CouponList />} />
          <Route path="blog-category-list" element={<BlogCatList />} />
          <Route path="blog-category" element={<AddBlogCategory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="list-category" element={<CategoryList />} />
          <Route path="category" element={<AddCategory />} />
          <Route path="list-color" element={<ColorList />} />
          <Route path="color" element={<AddColor />} />
          <Route path="list-brand" element={<BrandList />} />
          <Route path="brand" element={<AddBrand />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="product" element={<AddProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
