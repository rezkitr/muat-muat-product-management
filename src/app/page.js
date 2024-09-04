'use client'

import { ProductForm, ProductList, ToolsBar } from '@/components'
import StoreProvider from '@/store/StoreProvider'
import { Divider } from 'antd'
import { useState } from 'react'

const HomePage = () => {
  const [openProductForm, setOpenProductForm] = useState(false)

  return (
    <StoreProvider>
      <div className="container min-h-screen py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-y-4">
          <h1 className="text-xl md:text-2xl font-semibold inline-block">
            Product Management
          </h1>
          <ToolsBar setOpenProductForm={setOpenProductForm} />
        </div>
        <Divider />
        <ProductList setOpenProductForm={setOpenProductForm} />
      </div>
      <ProductForm
        open={openProductForm}
        product={null}
        setOpen={setOpenProductForm}
      />
    </StoreProvider>
  )
}

export default HomePage
