import React from 'react'
import { Table } from 'antd'
import { POST } from '../../../Componentes/NetApi'
class MyPassages extends React.Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      data:null
    }
  }
  componentDidMount () {
    this.getData()
  }
  getData () {
    POST('/user/getMyPassage', {}, (re) => {
      if (re.state === 1) {
        this.setState({ data:re.data })
      }
    })
  }

  render () {
    const columns = [{
      title: '标题',
      dataIndex: 'title'
    }, {
      title: 'id',
      dataIndex: 'id'
    }, {
      title: '时间',
      dataIndex: 'createdAt'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href='#'>删除</a>
          <span className='ant-divider' />
          <a href='#'>置顶</a>
        </span>
      ) }
    ]
    var data = this.state.data
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}
export default MyPassages
