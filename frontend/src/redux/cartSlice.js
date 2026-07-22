import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
};

const cartSlice = createSlice({
    name: "cart",

    initialState,

    reducers: {

        addToCart: (state, action) => {

            const item = action.payload;

            const existItem = state.cartItems.find(
                (x) => x._id === item._id
            );

            if (existItem) {

                existItem.qty = item.qty;

            } else {

                state.cartItems.push({
                    ...item,
                    qty: item.qty || 1
                });

            }

            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.cartItems)
            );
        },


        removeFromCart: (state, action) => {

            state.cartItems = state.cartItems.filter(
                (item) => item._id !== action.payload
            );

            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.cartItems)
            );
        },


        clearCart: (state) => {

            state.cartItems = [];

            localStorage.removeItem("cartItems");

        },

    },
});


export const {
    addToCart,
    removeFromCart,
    clearCart
} = cartSlice.actions;


export default cartSlice.reducer;