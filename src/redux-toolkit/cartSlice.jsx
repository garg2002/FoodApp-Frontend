import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Async thunk action to add an item to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.post(
        `${backendUrl}/user/add-to-cart/`,
        { product_id: productId, quantity },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to fetch the current cart items
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.get(`${backendUrl}/user/cart/`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to remove an item from the cart
// export const removeFromCart = createAsyncThunk(
//   "cart/removeFromCart",
//   async (productId, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("No token available");
//       }

//       const response = await axios.delete(
//         `${backendUrl}/user/cart/${productId}/`,
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       return productId;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token available");
      }

      await axios.delete(`${backendUrl}/user/cart/${productId}/`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      return productId; // Return the itemId directly
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice with initial state and reducers
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Array to hold cart items
    status: "idle", // Status for async operations
    error: null, // Error message holder
  },
  reducers: {
    clearCart: (state) => {
      // Clear all items from cart
      state.items = [];
    },
    incrementQuantity: (state, action) => {
      // Increment quantity of a specific item in the cart
      const { productId } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      // Decrement quantity of a specific item in the cart (minimum quantity is 1)
      const { productId } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload); // Assuming payload contains added item data
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Assuming payload contains cart items
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove the item from the cart based on productId
        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
