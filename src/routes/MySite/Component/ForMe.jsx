import React, { Component } from 'react'
import { Row, Col, Pagination } from 'antd'
import WithMe from '../../Componentes/WithMe'
import { POST } from '../../Componentes/NetApi'

class ForMe extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data:null,
      idex:1
    }
  }
  componentDidMount () {
    this.getData(1, 10)
  }

  getData (idex, lenth) {
    POST('/user/getMess', { idex:idex, lenth:lenth }, (re) => {
      re.state === 1 ? this.setState({ data:re.data }) : ''
    })
    this.setState({ idex:idex })
  }
  render () {
    var data = this.state.data
    return (
      <Row>
        <Col span={24}>
          { data ? data.rows.map((item, i) => {
            return (<WithMe data={item} key={i} />)
          }) : ''}
          <Pagination size='large' onChange={(re) => { this.getData.bind(this, re, 10) }}
            Current={this.state.idex} total={data ? data.count:0} />
        </Col>
      </Row>
    )
  }
}

export default ForMe
