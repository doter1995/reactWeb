import React, { Component } from 'react'
import { Row, Col, Icon, Card, Input, Button, Pagination, Menu, Dropdown } from 'antd'
import './Passage.scss'
import { POST } from '../Componentes/NetApi/'
import moment from 'moment'
import User from './User'
import { browserHistory } from 'react-router'
import ReplyShow from './ReplyShow'
class Passage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      showReply: false,
      replayData: null,
      replyState: 1,
      show: true
    }
    this.getData.bind(this)
  }
  componentDidMount () {
    this.getData(this.props.pid)
    this.getReply()
  }

  getData (pid) { // 获取消息
    POST('/getPassage', { id: pid },
      (re) => {
        console.log('re', re)
        if (re.state === 1) {
          this.setState({ data: re.data })
        }
      })
  }
  getReply (idx = this.state.replyState) { // 获取评论
    POST('/getReplys', { pid: this.props.pid, idx: idx },
      (re) => {
        console.log('re', re)
        if (re.state === 1) {
          console.log('获取评论数据', re.data)
          this.setState({ replayData: re.data })
          this.setState({ id: idx })
        }
      })
  }
  zan () { // 点赞
    POST('/user/zan', { id: this.props.pid },
      (re) => {
        if (re.state === 1) {
          var data = this.state.data
          data.zan.isZan = !data.zan.isZan
          data.zan.isZan ? data.zan.length++ : data.zan.length--
          console.log('data', data)
          this.setState({ data: data })
        }
      })
  }
  reply () { // 点击评论
    this.getReply(1)
    POST('/getState', {},
      (re) => {
        this.setState({ showReply: !this.state.showReply })
      })
  }
  onReply () { // 提交评论
    if (this.state.replyText.length < 2) {
      alert('长度过短！')
      return
    }
    POST('/user/newReply', { pid: this.props.pid, text: this.state.replyText },
      (re) => {
        if (re.state === 1) {
          var data = this.state.data
          data.reply++
          this.setState({ data: data })
          this.setState({ showReply: false, replyText: '' })
        }
      })
  }
  del () {
    POST('/user/delPassage', { pid: this.props.pid },
      (re) => {
        if (re.state === 1) {
          alert('删除成功！')
          this.setState({ show: false })
        }
      }
    )
  }
  top () {
    POST('/user/topPassage', { pid: this.props.pid },
      (re) => {
        if (re.state === 1) {
          alert('置顶成功！')
          location.reload()
        } else if (re.state === 2) {
          alert('取消置顶成功！')
          location.reload()
        } else {
          alert('没有权限！')
        }
      }
    )
  }
  render () {
    var dataSet = this.state.data
    if (!dataSet) {
      return <div />
    }
    console.log('this.state.showReply', this.state.showReply)
    var data = dataSet.passage
    var zanIcon = dataSet.zan.isZan ? 'like' : 'like-o'
    var zanTip = dataSet.zan.isZan ? '已赞' : '点赞'

    const menu = (
      <Menu>
        <Menu.Item disabled={!dataSet.del}>
          <span onClick={this.del.bind(this)}>删除</span>
        </Menu.Item>
        <Menu.Item disabled={!dataSet.del}>
          <span onClick={this.top.bind(this)}>{this.props.top ? '取消':''}置顶</span>
        </Menu.Item>
      </Menu>
    )
    if (!this.state.show) {
      return (<span />)
    } else {
      return (

        <Card style={{ width: '80%', marginLeft: '10%', marginTop: 20, backgroundColor:this.props.top ? '#e55':'#eee' }}>
          <Row gutter={16}>
            <Col span={4}>
              <User uid={this.props.uid} />
            </Col>
            <Col span={19} ><div className='P_title'>{`${data.title}`}
              <span>
                <Dropdown overlay={menu}>
                  <a className='ant-dropdown-link' href='#'>
                    管理<Icon type='down' />
                  </a>
                </Dropdown>

              </span></div>
              <div className='P_time'>&nbsp;<p>发表时间：{moment(data.createdAt).format('YYYY-MM--DD HH:mm')}</p></div>
              <div className='P_text'>
                <div dangerouslySetInnerHTML={{ __html: data.text }} />
                <br />
              </div>
              <div className='P_tool' >
                <span onClick={this.zan.bind(this)}><Icon type={zanIcon} />{`${zanTip}(${dataSet.zan.length})`}</span>
                |<span onClick={this.reply.bind(this)}><Icon type='message' />{`评论(${dataSet.reply})`}</span>
                |<span><Icon type='link' />转载</span>
              </div>
              {!this.state.showReply
                ? <div className='P_sub'>
                  <Input size='large' type='textarea' onChange={(e) => { this.setState({ replyText: e.target.value }) }}
                    placeholder='在此输入您的观点' autosize={{ minRows: 2, maxRows: 6 }} />
                  <div className='P_sub_div'><Button type='primary' onClick={this.onReply.bind(this)}>评论</Button></div>
                </div> : ''
              }
              {this.state.showReply
                ? (<div >
                  <div className='P_reply'>评论区:</div>
                  {this.state.replayData.rows.map((item, i) => {
                    return (
                      <ReplyShow id={item.id} uid={item.uid} key={i} />
                    )
                  })}
                  <div style={{ width: '80%', marginLeft: '10%', marginTop: 10 }}>
                    <Pagination size='large' onChange={this.getReply.bind(this)}
                      Current={this.state.replyState} total={this.state.replayData.count} defaultPageSize={5} /></div>
                </div >)
                : ''}
            </Col>
          </Row>
        </Card>
      )
    }
  }
}
export default Passage
