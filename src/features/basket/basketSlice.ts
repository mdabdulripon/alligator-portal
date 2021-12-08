import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";

// Interface
export interface BasketState {
  basket: Basket | null;
}

// Initial State
const initialState: BasketState = {
  basket: null,
};

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
});

export const { setBasket, removeItem } = basketSlice.actions;
