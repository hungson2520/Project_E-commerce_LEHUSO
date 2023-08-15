import { url } from "./api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setHeaders } from "./api";
const initialState = {
  ListOrder: [],
  status: null,
  error: null,
  createStatus: null,
  deleteStatus: null,
  editStatus: null,
};

export const orderFetch = createAsyncThunk("orders/orderFetch", async () => {
  // response này chính là payload data

  const response = await axios.get(`${url}/order`, setHeaders());
  return response?.data;
});

export const orderCreate = createAsyncThunk(
  "orders/orderCreate",
  async (value) => {
    try {
      const response = await axios.post(`${url}/order`, value, setHeaders());
      toast.success("thêm mới 1 Đơn hàng thành công");
      return response?.data;
    } catch (error) {
      toast.error(error.response.data);
      return error.response.data;
    }
  }
);

export const orderDelete = createAsyncThunk(
  "orders/orderDelete",
  async (id) => {
    try {
      const response = await axios.delete(`${url}/order/${id}`, setHeaders());
      toast.success("Xoá 1 đơn hàng thành công");
      return response?.data;
    } catch (error) {
      toast.error(error.response.data);
      return error.response.data;
    }
  }
);
// Khi Update 1 đơn hàng , chúng ta chỉ có thể update được trạng thái giao hàng
// KHÔNG THỂ EDIT NAME , GIÁ , SHIPPING ĐƯỢC
export const orderEdit = createAsyncThunk(
  "products/productEdit",
  async (value, { getState }) => {
    const state = getState();
    // Bằng Id tìm ra Order nào cần Edit
    const TargetOrder = state.orders.ListOrder.find(
      (order) => order._id == value.id
    );
    // Khi Update 1 đơn hàng , chúng ta chỉ có thể update được trạng thái giao hàng (DUY NHẤT )
    // KHÔNG THỂ EDIT NAME , GIÁ , SHIPPING ĐƯỢC
    const newOrder = {
      ...TargetOrder,
      delivery_status: value.delivery_status,
    };
    try {
      const response = await axios.put(
        `${url}/order/${value.id}`,
        newOrder,
        setHeaders()
      );
      toast.success("Cập nhật trạng thái đơn hàng thành công");
      return response?.data;
    } catch (error) {
      toast.error(error.response.data);
      return error.response.data;
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    // ĐANG LẤY DỮ LIỆU TỪ BACK END
    [orderFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    // LẤY DỮ LIỆU TỪ BACK END thành công
    [orderFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.ListOrder = action.payload;
    },
    //  LẤY DỮ LIỆU TỪ BACK END THẤT BẠI
    [orderFetch.rejected]: (state, action) => {
      state.status = "rejected";
      //   state.error = action.payload;
    },

    //
    [orderCreate.pending]: (state, action) => {
      state.status = "pending";
    },
    // LẤY DỮ LIỆU TỪ BACK END thành công
    [orderCreate.fulfilled]: (state, action) => {
      state.status = "success";
      state.ListOrder.push(action.payload);
    },
    //  LẤY DỮ LIỆU TỪ BACK END THẤT BẠI
    [orderCreate.rejected]: (state, action) => {
      state.status = "rejected";
      //   state.error = action.payload;
    },

    // DELETE SẢN PHẨM
    [orderDelete.pending]: (state, action) => {
      state.status = "pending";
    },
    // LẤY DỮ LIỆU TỪ BACK END thành công
    [orderDelete.fulfilled]: (state, action) => {
      state.status = "success";
      const newList = state.ListOrder.filter((i) => i._id != action.payload.id);
      state.ListOrder = newList;
      // toast.success("Xoá 1 sản phẩm thành công");
    },
    //  LẤY DỮ LIỆU TỪ BACK END THẤT BẠI
    [orderDelete.rejected]: (state, action) => {
      state.status = "rejected";
    },

    // EDIT SẢN PHẨM
    [orderEdit.pending]: (state, action) => {
      state.status = "pending";
    },
    // LẤY DỮ LIỆU TỪ BACK END thành công
    [orderEdit.fulfilled]: (state, action) => {
      state.status = "success";
      const updateProduct = state.ListOrder.map((prod) =>
        prod._id == action.payload._id ? action.payload : prod
      );
      state.ListOrder = updateProduct;
    },
    //  LẤY DỮ LIỆU TỪ BACK END THẤT BẠI
    [orderEdit.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default orderSlice.reducer;
