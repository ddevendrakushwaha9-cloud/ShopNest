import {configureStore} from '@reduxjs/toolkit';
import cartResucer from './cartSlice';

const store = configureStore({
    reducer: {
        cart: cartResucer,
    },
});

export default store;