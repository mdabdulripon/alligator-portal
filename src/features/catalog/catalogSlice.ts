import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

const productAdapter = createEntityAdapter<Product>();

// ? product array
export const fetchProductsAsync = createAsyncThunk<Product[]>(
  "catalog/fetchProductsAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.catalog.list();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

// ? Single Product
export const fetchProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchProductAsync",
  async (productId, thunkAPI) => {
    try {
      return await agent.catalog.details(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

// ? Get Categories and types
export const fetchProductFilters = createAsyncThunk(
  "catalog/fetchProductFilters",
  async (_, thunkAPI) => {
    try {
      return await agent.catalog.filters();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productAdapter.getInitialState({
    productLoaded: false,
    filtersLoaded: false,
    status: "idle",
    categories: [],
    types: [],
  }),
  reducers: {},
  extraReducers: (builder) => {
    // ? All Products Boilerplate
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state) => {
      state.status = "idle";
    });

    // ? Single Product Boilerplate
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      state.status = "idle";
    });

    // ? Filters Boilerplate
    builder.addCase(fetchProductFilters.pending, (state, action) => {
      state.status = "pendingFetchFilters";
    });
    builder.addCase(fetchProductFilters.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
      state.types = action.payload.types;
      state.status = "idle";
    });
    builder.addCase(fetchProductFilters.rejected, (state, action) => {
      state.status = "idle";
    });
  },
});

export const productSelectors = productAdapter.getSelectors(
  (state: RootState) => state.catalog
);
