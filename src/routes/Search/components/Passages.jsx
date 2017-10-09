import React, { Component } from 'react'
import Passage from '../../Componentes/Passage'
import { Row, Col } from 'antd'
class Passages extends Component {

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
          <Col span={24} key={i} style={{ margin:10 }}>
            <Passage pid={item.id} />
          </Col>
        )) : ''}
      </Row>
    )
  }
}

export default Passages
