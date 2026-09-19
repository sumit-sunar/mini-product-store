import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fallbackProducts from "../data/fallbackProducts";

const PRODUCTS_URL = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await fetch(PRODUCTS_URL);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return { items: await response.json(), isFallback: false };
    } catch (error) {
      console.warn("Product API unavailable; using fallback products.", error);
      return { items: fallbackProducts, isFallback: true };
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${PRODUCTS_URL}/${id}`);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      const fallbackProduct = fallbackProducts.find(
        (product) => String(product.id) === String(id),
      );

      if (fallbackProduct) {
        return fallbackProduct;
      }

      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
  isFallback: false,
  selectedProduct: null,
  selectedStatus: "idle",
  selectedError: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
      state.selectedStatus = "idle";
      state.selectedError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.isFallback = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.isFallback = action.payload.isFallback;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        state.isFallback = false;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.selectedStatus = "loading";
        state.selectedProduct = null;
        state.selectedError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedStatus = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedStatus = "failed";
        state.selectedError = action.payload || action.error.message;
      });
  },
});

export const { clearSelectedProduct } = productsSlice.actions;

export const selectProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectProductsIsFallback = (state) => state.products.isFallback;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectSelectedStatus = (state) => state.products.selectedStatus;
export const selectSelectedError = (state) => state.products.selectedError;

export default productsSlice.reducer;
