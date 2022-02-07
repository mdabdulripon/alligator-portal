import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { IPagination } from "../../app/models/pagination";
import { IProductParams, Product } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

interface ICatalogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  categories: string[];
  types: string[];
  productParams: IProductParams;
  pagination: IPagination | null;
}

const productAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: IProductParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("pageSize", productParams.pageSize.toString());
  params.append("orderBy", productParams.orderBy.toString());

  if (productParams.searchTerm) {
    params.append("searchTerm", productParams.searchTerm);
  }
  if (productParams.categories.length > 0) {
    params.append("categories", productParams.categories.toString());
  }
  if (productParams.types.length > 0) {
    params.append("types", productParams.types.toString());
  }
  return params;
}

// ? products array
export const fetchProductsAsync = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("catalog/fetchProductsAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
  try {
    const response = await agent.catalog.list(params);
    thunkAPI.dispatch(setPagination(response.pagination));
    return response.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

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

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 10,
    orderBy: "name",
    categories: [],
    types: [],
    items: [],
  };
}

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productAdapter.getInitialState<ICatalogState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: "idle",
    categories: [],
    types: [],
    productParams: initParams(),
    pagination: null,
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.productsLoaded = false;
      state.productParams = { ...state.productParams, ...action.payload };
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    resetProductParams: (state) => {
      state.productParams = initParams();
    },
  },
  extraReducers: (builder) => {
    // ? All Products Boilerplate
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
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
      state.filtersLoaded = true;
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

export const {
  setProductParams,
  resetProductParams,
  setPagination,
  setPageNumber,
} = catalogSlice.actions;
