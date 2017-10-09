import React from 'react'
import { Table } from 'antd'
import { POST } from '../../../Componentes/NetApi'
class Users extends React.Component {

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
    POST('/sys/getUsers', {}, (re) => {
      if (re.state === 1) {
        this.setState({ data:re.data })
      }
    })
  }
  del (id) {
    POST('/sys/DelUser', {id:id}, (re) => {
      if (re.state === 1) {
        this.getData()
      }
    })
  }
  render () {
    const columns = [{
      title: '账号',
      dataIndex: 'account'
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
          <a href='#' onClick={this.del.bind(this, record.id)}>删除</a>
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
export default Users
