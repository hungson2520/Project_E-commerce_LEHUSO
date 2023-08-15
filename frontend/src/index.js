import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

/**
 * import hàm configureStore từ Redux Toolkit, một bộ công cụ được cung cấp bởi Redux để giúp đơn giản hóa việc sử dụng Redux trong ứng dụng React.
 *  Hàm configureStore được sử dụng để tạo ra một Redux store, nơi dữ liệu trạng thái của ứng dụng được lưu trữ và quản lý.
 * Redux store là một đối tượng JavaScript chứa toàn bộ trạng thái của ứng dụng và cung cấp các phương thức để truy cập và cập nhật trạng thái này.
 *
 *  Đoạn mã này import component Provider từ thư viện react-redux. Provider là một component được cung cấp bởi react-redux
 * để cung cấp Redux store cho toàn bộ ứng dụng React. Bằng cách bọc toàn bộ ứng dụng trong Provider,
 *  chúng ta có thể đảm bảo rằng mọi thành phần con trong ứng dụng đều có thể truy cập và sử dụng Redux store một cách
 * dễ dàng thông qua cơ chế "context" của React.
 *
 */
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productsReducer from "./features/productsSlice";
import orderReducer from "./features/orderSlice";
import { productFetch } from "./features/productsSlice";
import { productsApi } from "./features/productsApi";
import cartReducer from "./features/cartSlice";
import authReducer, { loadUser } from "./features/authSlice";
import Register from "./components/auth/Register";
import userReducer from "./features/userSlice";
import { ResetPassWordContext } from "./components/auth/Login";
import filterProductReducer from "./features/filterProductSlice";
const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: orderReducer,
    users: userReducer,
    filter: filterProductReducer,
    // Tương tự như ta lấy "productsApi"
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  },
});
store.dispatch(productFetch());
store.dispatch(loadUser());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
