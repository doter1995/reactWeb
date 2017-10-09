import React from 'react'
import { Table, Input, Button, Card } from 'antd'
import { POST } from '../../../Componentes/NetApi'

class SysMess extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      data:null,
      input:null,
      title:''
    }
  }
  componentDidMount () {
    this.getData()
  }
  getData () {
    POST('/Sys/getSysMess', {}, (re) => {
      if (re.state == 1) {
        this.setState({ data:re.data })
      }
    })
  }
  postData () {
    POST('/Sys/addMessage', { title:this.state.title, text:this.state.input },
    (re) => {
      if (re.state == 1) {
        alert('添加成功！')
        this.setState({ title:'', input:'' })
        this.getData()
      } else {
        alert('发送失败，请重试')
      }
    })
  }
  delData (id) {
    console.log('id', id)
    POST('/Sys/delMessage', { id:id },
    (re) => {
      if (re.state == 1) {
        alert('删除成功！')
        this.getData()
      } else {
        alert('发送失败，请重试')
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
          <a href='#' onClick={this.delData.bind(this, record.id)}>删除</a>
          <span className='ant-divider' />
          <a href='#'>置顶</a>
        </span>
      ) }
    ]
    console.log('title', this.state.title, this.state.input)
    return (
      <div>
        <Card>
          <div style={{ fontSize:'1.4em', marginBottom:20 }}>添加系统消息</div>
          <div>标题：<Input value={this.state.title} onChange={(re) => { this.setState({ title:re.target.value }) }} /></div>
          <div>内容：<Input value={this.state.input} type='textarea'onChange={(re) => { this.setState({ input:re.target.value }) }} /></div>
          <div><Button onClick={this.postData.bind(this)}>发布</Button></div>
        </Card>
        <Table columns={columns} dataSource={this.state.data} />
      </div>
    )
  }
}

export default SysMess
