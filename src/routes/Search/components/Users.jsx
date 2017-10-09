import React, { Component } from 'react'
import { Row, Col, Card } from 'antd'
import User from '../../Componentes/User'

class Users extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data:props.data
    }
  }
  componentWillReceiveProps (props) {
    this.setState({ data:props.data })
  }
  render () {
    var data = this.state.data
    console.log('dadada   USers', data)
    return (
      <Row style={{ marginTop: 26 }} gutter={26}>
        { data ? data.rows.map((item, i) => (
          <Col span={6} key={i} style={{ margin:10 }}>
            <Card >
              <User uid={item.id} />
            </Card>
          </Col>
        )) : ''}
      </Row>
    )
  }
}

export default Users
