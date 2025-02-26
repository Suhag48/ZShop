import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  singleProduct: [],
  isError: null,
};

export const fetchingSingleProduct = createAsyncThunk(
  "products/fetchingSingleProduct",
  async (id) => {
    const res = await axios.get(`https://dummyjson.com/products/${id}`);
    return res.data;
  }
);

export const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchingSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchingSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchingSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.singleProduct = [];
        state.isError = action.error;
      });
  },
});

export default singleProductSlice.reducer;
