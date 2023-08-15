import { url } from "./api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setHeaders } from "./api";
const initialState = {
  Selectedprice: "",
  Selectedbrand: "",
  status: null,
  error: null,
  message: null,
};
export const filterProductFetch = createAsyncThunk(
  "filter/fiterProductFetch",
  async (value) => {
    const response = await axios.get(`${url}/product`, { value });
    return response?.data;
  }
);
const filterProductSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default filterProductSlice.reducer;
