import React, { Component } from 'react'
import './Info.scss'
import { Row, Col, Icon, Button } from 'antd'
import moment from 'moment'
import { POST } from '../../Componentes/NetApi'
import MyModel from './MyModel'

class Info extends Component {
  constructor (props) {
    super(props)
    this.state = {
      edit: false,
      data: null
    }
  }
  componentDidMount () {
    this.getData(null)
  }

  getData (uid) {
    POST('/user/getInfo', { id:uid },
    (re) => {
      if (re.state == 1) {
        this.setState({ data : re.data })
      }
    })
  }

  static defaultProps = { number: '140101200', name: 'Super', className: '14级计科二班' }
  render () {
    var data = this.state.data
    return (
      <div className='myInfo_pane'>
        <div className='myInfo_rb'>&nbsp;<Button onClick={() => { this.setState({ edit:!this.state.edit }) }}><Icon type='edit' />{this.state.edit ? "保存" : "修改"}</Button></div>
        <Row className='marginDiv'>
          <Col span={4}><div className='myInfo_pane_title'>账号</div></Col>
          <Col span={20}><input className='input_true' disabled value={data ? data.account : ''} /></Col>
        </Row>
        <Row className='marginDiv'>
          <Col span={4}><div className='myInfo_pane_title'>姓名</div></Col>
          <Col span={20}><input className='input_true' disabled value={data ? data.name : ''} /></Col>
        </Row>
        <Row className='marginDiv'>
          <Col span={4}><div className='myInfo_pane_title'>性别</div></Col>
          <Col span={20}><input className='input_true' disabled value={data ? data.sex == 1 ? '男' : data.sex == 2 ? '女':'未知' : '未知'} /></Col>
        </Row>
        <Row className='marginDiv'>
          <Col span={4}><div className='myInfo_pane_title'>生日</div></Col>
          <Col span={20}><input className='input_true' disabled value={data ? moment(data.birthday).format("YYYY年MM月DD日") : ''} /></Col>
        </Row>
        <Row className='marginDiv'>
          <Col span={4}><div className='myInfo_pane_title'>邮箱</div></Col>
          <Col span={20}><input className='input_true' disabled value={data ? data.emil : ''} /></Col>
        </Row>
        <Row className='marginDiv'>
          <Col span={4}><div className='myInfo_pane_title'>手机号</div></Col>
          <Col span={20}><input className='input_true' disabled value={data ? data.phone : ''} /></Col>
        </Row>
        <Row className='marginDiv'>
          <Col span={4}><div className='myInfo_pane_title'>签名</div></Col>
          <Col span={20}><input className='input_true' disabled value={data ? data.sigin : ''} /></Col>
        </Row>
        <Row className='marginDiv'>
          <Col span={4}><div className='myInfo_pane_title'>个人说明</div></Col>
          <Col span={20}><input className='input_true' disabled value={data ? data.text : ''} /></Col>
        </Row>{this.state.edit?
        <MyModel visiable={this.state.edit} onColse={()=>{this.setState({edit:false})}} data={data?data:null} />
        :""}
      </div>
    )
  }
}

export default Info
