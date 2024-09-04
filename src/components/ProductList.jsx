'use client'

import { formatToPrice } from '@/lib/utils'
import { deleteProduct, setCurrentSelectedProduct } from '@/store/productsSlice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { Button, Popconfirm, Space, Table, Tag } from 'antd'

const ProductList = ({ setOpenProductForm }) => {
  const dispatch = useAppDispatch()
  const currentProducts = useAppSelector(
    (state) => state.products.currentProducts
  )
  const filteredProducts = useAppSelector(
    (state) => state.products.filteredProducts
  )

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price,
      render: (value) => formatToPrice(value),
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.stock - b.stock,
      render: (value) => (
        <Tag color={value <= 5 ? 'error' : 'processing'}>{value}</Tag>
      ),
    },
    {
      key: 'action',
      align: 'right',
      render: (product) => (
        <Space>
          <Button
            icon={<EditFilled />}
            onClick={() => {
              dispatch(setCurrentSelectedProduct(product))
              setOpenProductForm(true)
            }}
          />
          <Popconfirm
            title="Delete Product"
            description="Are you sure to delete this product?"
            placement="left"
            onConfirm={() => {
              dispatch(deleteProduct(product.id))
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteFilled />} type="primary" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Table
      dataSource={filteredProducts ?? currentProducts}
      columns={columns}
      pagination={false}
    />
  )
}

export default ProductList
