'use client'

import {
  addProduct,
  setCurrentSelectedProduct,
  updateProduct,
} from '@/store/productsSlice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { Form, Input, InputNumber, Modal } from 'antd'
import { useEffect } from 'react'
import { v4 as uuidV4 } from 'uuid'

const ProductForm = ({ open, setOpen }) => {
  const dispatch = useAppDispatch()
  const currentSelectedProduct = useAppSelector(
    (state) => state.products.currentSelectedProduct
  )
  const [form] = Form.useForm()

  useEffect(() => {
    if (currentSelectedProduct) {
      form.setFieldsValue(currentSelectedProduct)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSelectedProduct])

  const onClose = () => {
    form.resetFields()
    setOpen(false)
    dispatch(setCurrentSelectedProduct(null))
  }

  const onAdd = () => {
    form.validateFields().then((values) => {
      dispatch(addProduct({ id: uuidV4(), ...values }))
      onClose()
    })
  }

  const onSave = () => {
    form.validateFields().then((values) => {
      dispatch(updateProduct({ id: currentSelectedProduct.id, ...values }))
      onClose()
    })
  }

  return (
    <Modal
      open={open}
      title={`${currentSelectedProduct ? 'Edit' : 'Add'} Product`}
      okText={currentSelectedProduct ? 'Save' : 'Add'}
      onOk={currentSelectedProduct ? onSave : onAdd}
      onCancel={onClose}
      closable={false}
    >
      <div className="py-4">
        <Form layout="vertical" form={form}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter products name" />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <InputNumber
              placeholder="Enter products price"
              className="!w-full"
            />
          </Form.Item>
          <Form.Item label="Stock" name="stock" rules={[{ required: true }]}>
            <InputNumber
              placeholder="Enter product stock"
              className="!w-full"
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default ProductForm
