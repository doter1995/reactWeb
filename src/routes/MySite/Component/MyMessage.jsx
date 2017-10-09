import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Message from '../../Componentes/Message'
import { POST } from '../../Componentes/NetApi'
class MyMessage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data:null,
      idex:1,
      length:5
    }
  }
  componentDidMount () {
    this.getData(this.state.idex, this.state.length)
  }

  getData (idex, length) {
    POST('/user/getMessage', { idex:idex, length:length }, (re) => {
      if (re.state === 1) {
        this.setState({ data:re.data })
      }
    })
  }
  render () {
    var data = this.state.data
    return (
      <Row>
        <Col span={24}>
          {data ? data.rows.map((item, i) =>{
            return (<Message data={item} key={i} />)
          }) : ''}
        </Col>
      </Row>
    )
  }
}

export default MyMessage
