import { filterProducts } from '@/store/productsSlice'
import { useAppDispatch } from '@/store/store'
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'
import { debounce } from 'lodash'

const ToolsBar = ({ setOpenProductForm }) => {
  const dispatch = useAppDispatch()

  const onSearch = debounce((keyword) => {
    dispatch(filterProducts(keyword))
  }, 300)

  const onKeywordChange = (e) => {
    const keyword = e.target.value
    onSearch(keyword)
  }

  return (
    <Space size="middle">
      <Input
        allowClear
        placeholder="Search product"
        className="!w-60 md:!w-72"
        prefix={<SearchOutlined />}
        onChange={onKeywordChange}
      />
      <Button
        icon={<PlusCircleOutlined />}
        type="primary"
        onClick={() => setOpenProductForm(true)}
      >
        Add Product
      </Button>
    </Space>
  )
}

export default ToolsBar
