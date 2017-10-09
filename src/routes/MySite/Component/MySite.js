import React, { Component } from 'react'
import './MySite.scss'

import { Row, Col, Card, Tabs } from 'antd'
import User from '../../Componentes/User'
import MyMessage from './MyMessage'
import ForMe from './ForMe'
import MyInfo from './MyInfo'
import { POST } from '../../Componentes/NetApi'
import Manager from './Manager'

const TabPane = Tabs.TabPane
class MySite extends Component {

  componentDidMount () {
    POST('/getState', {}, () => {}) // 登录校验
  }

  render () {
    return (
      <Card style={{ width: '80%', marginLeft: '10%' }}>
        <Row gutter={20}>
          <Col span={4}>
            <User uid={0} showInfo />
          </Col>
          <Col span={20}>
            <Tabs defaultActiveKey='2' >
              <TabPane tab='系统消息' key='1'><MyMessage /></TabPane>
              <TabPane tab='与我有关' key='2'><ForMe /></TabPane>
              <TabPane tab='个人资料' key='3'><MyInfo /></TabPane>
              <TabPane tab='管理' key='4'><Manager /></TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default MySite
