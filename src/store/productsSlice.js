import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentProducts: [
    {
      id: 'prd-1',
      name: 'Samsung Galaxy S21 2020',
      price: 8000000,
      stock: 8,
    },
    {
      id: 'prd-2',
      name: 'Macbook Air M2 Pro',
      price: 23500000,
      stock: 3,
    },
  ],
  currentSelectedProduct: null,
  filteredProducts: null,
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.currentProducts.push(action.payload)
    },
    deleteProduct: (state, action) => {
      const newProducts = state.currentProducts.filter(
        (product) => product.id !== action.payload
      )
      state.currentProducts = newProducts
    },
    updateProduct: (state, action) => {
      const newProducts = state.currentProducts.map((product) =>
        product.id === action.payload.id ? action.payload : product
      )
      state.currentProducts = newProducts
    },
    filterProducts: (state, action) => {
      if (action.payload) {
        const result = state.currentProducts.filter((product) =>
          product.name.toLowerCase().includes(action.payload.toLowerCase())
        )
        state.filteredProducts = result
      } else {
        state.filteredProducts = null
      }
    },
    setCurrentSelectedProduct: (state, action) => {
      state.currentSelectedProduct = action.payload
    },
  },
})

export const {
  addProduct,
  deleteProduct,
  updateProduct,
  filterProducts,
  setCurrentSelectedProduct,
} = productSlice.actions
export const productReducer = productSlice.reducer
