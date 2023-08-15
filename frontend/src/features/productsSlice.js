/* eslint-disable no-unused-vars */
import { url } from "./api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setHeaders } from "./api";
const initialState = {
  items: [],
  status: null,
  error: null,
  createStatus: null,
  deleteStatus: null,
  editStatus: null,
};

/**
 *  Đây là việc sử dụng createAsyncThunk để tạo một async action có tên là productFetch.
 *  Async action này sẽ tự động sinh ra các actions tương ứng khi nó đang thực hiện (pending), khi thành công (fulfilled) hoặc khi thất bại (rejected).
 * Cụ thể, productFetch.pending, productFetch.fulfilled và productFetch.rejected là các actions tạo tự động cho async action productFetch.
 *
 *
 * Trong Redux Toolkit, createAsyncThunk hỗ trợ một hàm rejectedWithValue để xử lý các trường hợp khi một async action bị từ chối (rejected).
 * Điều này cho phép bạn trả về một giá trị từ hàm xử lý lỗi và gửi giá trị đó như một payload trong action bị từ chối, thay vì phải trả về một Error object.
 *
 *
 * Sử dụng rejectedWithValue là một cách tiện lợi để xử lý lỗi trong Redux Toolkit
 *  và giúp viết code linh hoạt hơn khi làm việc với các trường hợp bị từ chối của các async action.
 */
export const productFetch = createAsyncThunk(
  "products/productFetch",
  async () => {
    const response = await axios.get(`${url}/product`);
    return response?.data;
  }
);

export const productCreate = createAsyncThunk(
  "products/productCreate",
  async (value) => {
    // response này chính là payload data
    //async(id = null, { rejectWithValue })
    try {
      const response = await axios.post(`${url}/product`, value, setHeaders());
      toast.success("thêm mới 1 sản phẩm thành công");
      return response?.data;
    } catch (error) {
      toast.error(error.response.data);
      return error.response.data;
    }
  }
);

export const productDelete = createAsyncThunk(
  "products/productDelete",
  async (id) => {
    // response này chính là payload data
    //async(id = null, { rejectWithValue })
    try {
      const response = await axios.delete(`${url}/product/${id}`, setHeaders());
      toast.success("Xoá 1 sản phẩm thành công");
      return response?.data;
    } catch (error) {
      toast.error(error.response.data);
      return error.response.data;
    }
  }
);

export const productEdit = createAsyncThunk(
  "products/productEdit",
  async (value) => {
    // response này chính là payload data
    //async(id = null, { rejectWithValue })
    try {
      const response = await axios.put(
        `${url}/product/${value.product._id}`,
        value,
        setHeaders()
      );
      toast.success("Xoá 1 sản phẩm thành công");
      return response?.data;
    } catch (error) {
      toast.error(error.response.data);
      return error.response.data;
    }
  }
);

/**
 * extraReducers: { [productFetch.pending]: (state, action) => { ... } }: 
 * Trong phần extraReducers của slice, bạn định nghĩa reducers để xử lý các actions được tạo tự động bởi async action productFetch. 
 * Trong trường hợp này, bạn chỉ định reducer cho productFetch.pending (được gọi khi async action đang thực hiện, tức là đang lấy dữ liệu).

Trong reducer này, bạn có thể thực hiện các thay đổi trạng thái của state để hiển thị trạng thái đang thực hiện (loading) 
cho người dùng khi dữ liệu đang được lấy từ server.

Chú ý rằng bạn có thể thêm thêm reducers cho productFetch.fulfilled và productFetch.rejected để xử lý trạng thái sau khi 
async action đã hoàn thành thành công hoặc thất bại.
 */
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    // ĐANG LẤY DỮ LIỆU TỪ BACK END
    [productFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    // LẤY DỮ LIỆU TỪ BACK END thành công
    [productFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    //  LẤY DỮ LIỆU TỪ BACK END THẤT BẠI
    [productFetch.rejected]: (state, action) => {
      state.status = "rejected";
      //   state.error = action.payload;
    },

    //
    [productCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    // LẤY DỮ LIỆU TỪ BACK END thành công
    [productCreate.fulfilled]: (state, action) => {
      state.createStatus = "success";
      state.items.push(action.payload);
    },
    //  LẤY DỮ LIỆU TỪ BACK END THẤT BẠI
    [productCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
      //   state.error = action.payload;
    },

    // DELETE SẢN PHẨM
    [productDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    // LẤY DỮ LIỆU TỪ BACK END thành công
    [productDelete.fulfilled]: (state, action) => {
      state.deleteStatus = "success";
      const newList = state.items.filter((i) => i._id != action.payload._id);
      state.items = newList;
      // toast.success("Xoá 1 sản phẩm thành công");
    },
    //  LẤY DỮ LIỆU TỪ BACK END THẤT BẠI
    [productDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },

    // EDIT SẢN PHẨM
    [productEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    // LẤY DỮ LIỆU TỪ BACK END thành công
    [productEdit.fulfilled]: (state, action) => {
      state.editStatus = "success";
      const updateProduct = state.items.map((prod) =>
        prod._id == action.payload._id ? action.payload : prod
      );
      state.items = updateProduct;
      toast.info("Edit sản phẩm thành công!");
    },
    //  LẤY DỮ LIỆU TỪ BACK END THẤT BẠI
    [productEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },
  },
});

export default productsSlice.reducer;
