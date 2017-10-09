import React, { Component } from 'react'
import { Col, Row } from 'antd'

import Info from './Info'
class MyInfo extends Component {
  render () {
    return (
      <div>
        <Row>
          <Col>
            <Info />
          </Col>
        </Row>
      </div>
    )
  }
}

export default MyInfo
