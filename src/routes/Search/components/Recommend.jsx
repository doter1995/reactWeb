import React, { Component } from 'react'
import { Card, Row, Col } from 'antd'
import User from '../../Componentes/User'
import Passage from '../../Componentes/Passage'
import './Recommend.scss'
class Recommend extends Component {
  render () {
    return (
      <Card>
        <div className='recommend_u'>为您推荐的用户：</div>
        <Row style={{ marginTop: 26, width:'80%', marginLeft:'10%' }} gutter={36}>
          <Col span={6}>
            <Card >
              <User uid={3} />
            </Card>
          </Col>
          <Col span={6}>
            <Card >
              <User uid={4} />
            </Card>
          </Col>
          <Col span={6}>
            <Card >
              <User uid={1} />
            </Card>
          </Col>
          <Col span={6}>
            <Card >
              <User uid={9} />
            </Card>
          </Col>
        </Row>
        <div className='recommend_p'>为您推荐的帖子：</div>
        <Row>
          <Col span={24}>
            <Passage pid={50} uid={1} />
          </Col>
          <Col span={24}>
            <Passage pid={51} uid={1} />
          </Col>
          <Col span={24}>
            <Passage pid={52} uid={1} />
          </Col>
          <Col span={24}>
            <Passage pid={49} uid={1} />
          </Col>
        </Row>
      </Card>
    )
  }
}

export default Recommend
