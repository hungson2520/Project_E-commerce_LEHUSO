import { url } from "./api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setHeaders } from "./api";
const initialState = {
  ListUser: [],
  status: null,
  error: null,
  createStatus: null,
  deleteStatus: null,
  editStatus: null,
};

export const userFetch = createAsyncThunk("users/userFetch", async () => {
  // response này chính là payload data

  const response = await axios.get(`${url}/user`, setHeaders());
  return response?.data;
});

export const userDelete = createAsyncThunk("users/userDelete", async (id) => {
  try {
    const response = await axios.delete(`${url}/user/${id}`, setHeaders());
    toast.success("Xoá 1 người dùng thành công");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data);
    return error.response.data;
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    // ĐANG LẤY DỮ LIỆU TỪ BACK END
    [userFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    // LẤY DỮ LIỆU TỪ BACK END thành công
    [userFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.ListUser = action.payload;
    },
    //  LẤY DỮ LIỆU TỪ BACK END THẤT BẠI
    [userFetch.rejected]: (state, action) => {
      state.status = "rejected";
      //   state.error = action.payload;
    },

    [userDelete.pending]: (state, action) => {
      state.status = "pending";
    },
    // LẤY DỮ LIỆU TỪ BACK END thành công
    [userDelete.fulfilled]: (state, action) => {
      state.status = "success";
      const newList = state.ListUser.filter((i) => i._id != action.payload.id);
      state.ListUser = newList;
    },
    //  LẤY DỮ LIỆU TỪ BACK END THẤT BẠI
    [userDelete.rejected]: (state, action) => {
      state.status = "rejected";
      //   state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
