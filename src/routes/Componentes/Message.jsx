import React, { Component } from 'react'
import { Row, Col, Card } from 'antd'
import './Message.scss'
import moment from 'moment'
class Message extends Component {

  render () {
    var data = this.props.data
    console.log('data', data)
    return (
      <Card style={{ width: '90%', marginLeft: '5%', marginTop: 20, backgroundColor: '#eee' }}>
        <Row gutter={16}>
          <Col span={24}>
            <div className='Message_title'>{data.title}<span className='Message_time'>
              时间：{moment(data.createdAt).format('YYYY-MM--DD HH:mm')}</span></div>
            <div className='Message_text'>
              {data.text}
            </div>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default Message
