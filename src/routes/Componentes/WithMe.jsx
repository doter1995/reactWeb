import React, { Component } from 'react'
import { Card } from 'antd'
import './WithMe.scss'
import { POST } from '../Componentes/NetApi'
import moment from 'moment'
class WithMe extends Component {
  constructor (props) {
    super(props)
    this.state = {
      User:null,
      Reply:null,
      P:null
    }
  }
  componentDidMount () {
    var data = this.props.data
    this.getData(data.uid, data.pid, data.rid)
  }
  getData (uid, pid, rid) {
    POST('/getUser', { id:uid }, (re) => {
      re.state === 1 ? this.setState({ User:re.data }) : ''
    })
    POST('/getPassageTitle', { id:pid }, (re) => {
      re.state === 1 ? this.setState({ P:re.data }) : ''
    })
    POST('/getReply', { id:rid }, (re) => {
      re.state === 1 ? this.setState({ Reply:re.data }) : ''
    })
  }

  render () {
    var User = this.state.User
    var P = this.state.P
    var Reply = this.state.Reply
    return (
      <Card style={{ width:'90%', marginLeft:'5%', marginBottom:20 }}>
        <div className='withme_title'><a>{User ? User.account : '匿名'}</a>评论：<span>{P ? moment(Reply.createdAt).format('YYYY-MM--DD HH:mm') : ''}</span></div>
        <br />
        <div className='withme_text'>&nbsp;&nbsp;{Reply ? Reply.text : ''}</div>
        <div className='withme_pass'>原贴标题：<a>《{P ? P.title : ''}》</a><span>发表时间:{P ? moment(P.createdAt).format('YYYY-MM--DD HH:mm') : ''}</span></div>
      </Card>
    )
  }
}

export default WithMe
