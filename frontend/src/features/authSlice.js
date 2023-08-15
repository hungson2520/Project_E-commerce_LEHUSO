/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";

import jwtDecode from "jwt-decode";

const initialState = {
  token: localStorage.getItem("token") || "",
  name: "",
  email: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  // userloaded: kiểm tra xem người dùng có đang đăng nhập hay không , nếu đang đăng nhập thì không cho vô /login hay /register
  userLoaded: false,
  isAdmin: false,
};
/**
 * rejectWithValue là một tham số được truyền vào trong function của bạn, cho phép bạn từ chối promise
 * và trả về giá trị tùy chỉnh. Khi bạn sử dụng rejectWithValue, bạn có thể trả về một giá trị bất kỳ,
 *  thông thường là một đối tượng chứa thông tin về lỗi hoặc thông tin gì đó liên quan đến lỗi xảy ra trong quá trình
 *  xử lý bất đồng bộ. Giá trị trả về này sẽ được gửi kèm với action rejected (bị từ chối) mà Redux Toolkit tự động tạo ra.
 */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (value, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/register`, {
        name: value.name,
        email: value.email,
        password: value.password,
      });

      localStorage.setItem("token", token.data);
      return token.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (value, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/login`, {
        email: value.email,
        password: value.password,
      });

      localStorage.setItem("token", token.data);
      return token.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;
      // nếu có token thì chứng tỏ đã đăng nhập thành công
      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,

          name: user.name,
          email: user.email,
          _id: user._id,
          isAdmin: user.isAdmin,
          token,
          userLoaded: true,
        };
      }
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");
      return {
        ...state,
        name: "",
        token: "",
        email: "",
        _id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        // userloaded: kiểm tra xem người dùng có đang đăng nhập hay không , nếu đang đăng nhập thì không cho vô /login hay /register
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          registerStatus: "success",
          isAdmin: user.isAdmin,
        };
      }
      return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });

    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          loginStatus: "success",
          isAdmin: user.isAdmin,
        };
      }
      return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
