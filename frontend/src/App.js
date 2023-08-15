/* eslint-disable no-unused-vars */
import "./App.css";

/**
 * Thư viện react-toastify cung cấp các thông báo tạm thời (toasts) để hiển thị các thông báo, cảnh báo,
 *  hoặc trạng thái thành công (success) trên giao diện người dùng của ứng dụng React.
 * Để hiển thị các thông báo này một cách đẹp và phù hợp với giao diện của ứng dụng,
 * thư viện cung cấp một tệp CSS để tùy chỉnh giao diện cho các toasts.
 */
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CheckoutSuccess from "./components/CheckoutSuccess";
import Dashboard from "./components/admin/Dashboard";
import Product from "./components/admin/Product";
import Summary from "./components/admin/Summary";
import CreateProduct from "./components/admin/CreateProduct";
import ProductList from "./components/admin/list/ProductList";
import Order from "./components/admin/Order";
import User from "./components/admin/User";
import ProductDetail from "./components/Details/ProductDetail";
import OrderDetail from "./components/Details/OrderDetail";
import UserProfile from "./components/Details/UserProfile";
import AllOrder1User from "./components/AllOrder1User";
import { useLocation } from "react-router-dom";
import OTPInput from "./components/auth/ForgetAndResetPassword/OTPInput";
import { ResetPassWordContext } from "./components/auth/Login";
import NavigateHeader from "./components/NavigateHeader";
import CategorySmartphone from "./components/CategoryProduct/CategorySmartPhone";
import CategoryLapTop from "./components/CategoryProduct/CategoryLapTop";
import CategoryTablet from "./components/CategoryProduct/CategoryTablet";
import CategorySmartwarch from "./components/CategoryProduct/CategorySmartwatch";
import FilterProducts from "./components/FilterProduct";
import CategoryCommon from "./components/CategoryProduct/CategoryCommon";
import CommentProduct from "./components/CommentProduct";
/**
 *
 * Thư viện này được sử dụng để hiển thị các thông báo tạm thời (toasts) trên giao diện người dùng của ứng dụng React.
 */

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />

        <Routes>
          <Route path="/filter" exact element={<FilterProducts />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/comment" element={<CommentProduct />} />
          <Route path="/product/:type/:id" element={<ProductDetail />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/order/:id" element={<OrderDetail />} />
          <Route
            path="/product/smartphone"
            element={<CategoryCommon TYPEPRODUCT="Smartphone" />}
          />
          <Route
            path="/product/laptop"
            element={<CategoryCommon TYPEPRODUCT="Laptop" />}
          />
          <Route
            path="/product/tablet"
            element={<CategoryCommon TYPEPRODUCT="Tablet" />}
          />
          <Route
            path="/product/smartwatch"
            element={<CategoryCommon TYPEPRODUCT="Smartwatch" />}
          />
          <Route path="/order/findAllOrder/:id" element={<AllOrder1User />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/admin" element={<Dashboard />}>
            <Route path="product" element={<Product />}>
              <Route index element={<ProductList />} />
              <Route path="create" element={<CreateProduct />} />
            </Route>
            <Route path="summary" element={<Summary />} />
            <Route path="order" element={<Order />} />
            <Route path="user" element={<User />} />
          </Route>
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/forgetPassword/otp" element={<OTPInput />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
