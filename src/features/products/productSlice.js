// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios"; // Import axios

// // Define your API base URL here for convenience
// const baseURL = "https://localhost:7065/api/Product";

// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async () => {
//     const response = await axios.get(`${baseURL}`);
//     return response.data;
//   }
// );

// export const addProduct = createAsyncThunk(
//   "products/addProduct",
//   async (product) => {
//     const response = await axios.post(`${baseURL}`, product);
//     return response.data;
//   }
// );

// export const updateProduct = createAsyncThunk(
//   "products/updateProduct",
//   async ({ id, product }) => {
//     const response = await axios.put(`${baseURL}/${id}`, product);
//     return response.data;
//   }
// );

// export const deleteProduct = createAsyncThunk(
//   "products/deleteProduct",
//   async (id) => {
//     await axios.delete(`${baseURL}/${id}`);
//     return id;
//   }
// );

// export const productsSlice = createSlice({
//   name: "products",
//   initialState: {
//     items: [],
//     status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         // Optionally, you might want to sort or process data here
//         state.items = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       .addCase(addProduct.fulfilled, (state, action) => {
//         state.items.push(action.payload);
//       })
//       .addCase(updateProduct.fulfilled, (state, action) => {
//         const index = state.items.findIndex(
//           (item) => item.id === action.payload.id
//         );
//         if (index !== -1) {
//           state.items[index] = action.payload;
//         }
//       })
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.items = state.items.filter((item) => item.id !== action.payload);
//       });
//   },
// });

// export default productsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Import axios

// Define your API base URL here for convenience
const baseURL = "https://localhost:7065/api/Product";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}`, product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, product }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/${id}`, product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch products.";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload || "Failed to add product.";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload || "Failed to update product.";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete product.";
      });
  },
});

export default productsSlice.reducer;
