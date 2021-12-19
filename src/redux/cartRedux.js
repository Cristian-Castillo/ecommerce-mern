import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    img:"",
    id:"",
    purchasedOrders:[]
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total = action.payload.total;
    },
    deleteProduct: (state,action) => {
      state.quantity = action.payload.quantity > 0 ? state.quantity -= 1 : 0
      state.products = state.products.filter(item => item.id !== action.payload.id)
      state.total = state.quantity === 0 ? 0 : state.total.toFixed(2)
    },
    purchasedOrders:(state,action) => {
        state.purchasedOrders.push(action.payload)
        return
    }

  },
});

export const { addProduct,deleteProduct, purchasedOrders } = cartSlice.actions;
export default cartSlice.reducer;