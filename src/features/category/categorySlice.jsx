import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  category: [],
  isLoading: false,
  error: null,
};

export const fetchCategory = createAsyncThunk(
  "categories/fetchCategory",
  async () => {
    const res = await axios.get("https://dummyjson.com/products/categories");
    return res.data;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.category = [];
        state.error = action.error;
      });
  },
});

export default categorySlice.reducer;
