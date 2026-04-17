import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../../services/api";
import { Product } from "@/interfaces/Product";



const initialState = {
    products: [] as Product[],
    loading: false,
    error: null as string | null,
}



export const getAllProducts = createAsyncThunk("product/getAllProducts", async () => {
    const products = await apiService.getProducts();
    return products
})

 
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            console.log("pending")
            state.loading = true;
        }
        )
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            console.log("fulfilled", action.payload)
            state.products = action.payload;
            state.loading = false;
        }
        )
        builder.addCase(getAllProducts.rejected, (state, action) => {
            console.log("rejected", action.error)
            state.loading = false;
            state.error = action.error.message || "Failed to fetch products";
        }
        )
    },

})



export const productReducer = productSlice.reducer;