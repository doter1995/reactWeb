import React, { Component } from 'react'
import { Tabs } from 'antd'
import MyPassages from './Manager/MyPassages'
import Users from './Manager/Users'
import SysMess from './Manager/SysMess'
const TabPane = Tabs.TabPane
class Manager extends Component {
  render () {
    return (
      <Tabs defaultActiveKey='2' >
        <TabPane tab='我的帖子' key='1'><MyPassages /></TabPane>
        <TabPane tab='用户管理' key='2'><Users /></TabPane>
        <TabPane tab='系统管理' key='4'><SysMess /></TabPane>
      </Tabs>
    )
  }
}
export default Manager
