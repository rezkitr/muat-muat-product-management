import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { productReducer } from './productsSlice'

export const store = configureStore({
  reducer: { products: productReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector
