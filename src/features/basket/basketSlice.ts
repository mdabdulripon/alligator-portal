import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Basket } from "../../app/models/basket";

// Interface
export interface BasketState {
  basket: Basket | null;
  status: string;
}

// Initial State
const initialState: BasketState = {
  basket: null,
  status: "idle",
};

export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number; quantity?: number }
>("basket/addBasketItemAsync", async ({ productId, quantity = 1 }) => {
  try {
    return await agent.basket.addItem(productId, quantity);
  } catch (error) {
    console.log(error);
  }
});

// Create Slice
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    removeItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const idx = state.basket?.items.findIndex(
        (i) => i.productId === productId
      );
      if (idx === -1 || idx === undefined) return;
      state.basket!.items[idx].quantity -= quantity;
      if (state.basket!.items[idx].quantity === 0) {
        state.basket?.items.splice(idx, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      console.log(action);
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = "Idle";
    });
    builder.addCase(addBasketItemAsync.rejected, (state, action) => {
      state.status = "Idle";
    });
  },
});

export const { setBasket, removeItem } = basketSlice.actions;
