import React, { Component } from 'react'
import { Card } from 'antd'
import { POST } from './NetApi/'
class ReplyShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data:null,
      User:null
    }
  }
  componentDidMount () {
    this.getData(this.props.id)
    this.getUser(this.props.uid)
  }

  getData (id) {
    POST('/getReply', { id:id }, (re) => {
      this.setState({ data:re.data })
    })
  }
  getUser (id) {
    POST('/getUser', { id:id }, (re) => {
      this.setState({ User:re.data })
    })
  }
  render () {
    var data = this.state.data
    var User = this.state.User
    console.log('id', this.props.id, 'uid', this.props.uid)
    return (
      <Card className='P_reply_item'>
        <div className='P_reply_u'>{User ? User.account : '加载中。。。'}<span >{data ? data.createdAt : '加载中。。。'}</span></div>
        <div>{data ? data.text : '加载中。。。'}</div>
      </Card>
    )
  }
}

export default ReplyShow
