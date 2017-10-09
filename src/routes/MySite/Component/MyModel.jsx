import React from 'react'
import { Modal, Input, Row, Col, Radio, DatePicker } from 'antd'
import './MyModel.scss'
import moment from 'moment'
import { POST } from '../../Componentes/NetApi'

const RadioGroup = Radio.Group

class MyModel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data:props.data
    }
  }
  onchangeInput (type, e) {
    var v = e.target.value
    var data = this.state.data
    console.log('cv', type)
    data[type] = v
    this.setState({ data : data })
  }
  putData () {
    POST('/user/updateInfo', { ...this.state.data }, (re) => {
      if (re.state == 1) {
        this.props.onColse()
      } else {
        console.log('error')
      }
    })
  }
  onchanegDate (v) {
    var data = this.state.data
    data.birthday = v
    console.log("v",v);
    console.log("data",data);
    this.setState({ data:data })
  }
  render () {
    var data = this.state.data
    console.log(data)
    return (
      <Modal
        title='Modal'
        visible={this.props.visiable}
        onCancel={this.props.onColse}
        onOk={this.putData.bind(this)}
        okText='修改'
        cancelText='取消'
      >
        <Row>
          <Col className='mymodel_col'>
            <Input addonBefore='真实姓名' size='large' placeholder='真实姓名' onChange={this.onchangeInput.bind(this, 'name')} defaultValue={data.name} />
          </Col>
          <Col className='mymodel_col' style={{ marginLeft:'20%' }}>
            <RadioGroup onChange={this.onchangeInput.bind(this, 'sex')} defaultValue={data.sex}>
              <Radio value={0}>保密</Radio>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </RadioGroup>
          </Col>
          <Col className='mymodel_col'>
            <span style={{ fontSize: 12, fontWeight: 400 }}>生日：</span><DatePicker onChange={this.onchanegDate.bind(this)} defaultValue={moment(data.birthday)} />
          </Col>
          <Col className='mymodel_col'>
            <Input addonBefore='邮箱' size='large' type='email' placeholder='邮箱' onChange={this.onchangeInput.bind(this, 'emil')} defaultValue={data.emil} />
          </Col>
          <Col className='mymodel_col'>
            <Input addonBefore='手机号' size='large' placeholder='手机号' onChange={this.onchangeInput.bind(this, 'phone')} defaultValue={data.phone} />
          </Col>
          <Col className='mymodel_col'>
            <Input addonBefore='个性签名' size='large' placeholder='个性签名' onChange={this.onchangeInput.bind(this, 'sigin')} defaultValue={data.sigin} />
          </Col>
          <Col className='mymodel_col'>
            <Input addonBefore='个人说明' size='large' type='textarea' onChange={this.onchangeInput.bind(this, 'text')} placeholder='个人说明'defaultValue={data.text} />
          </Col>
        </Row>
      </Modal>
    )
  }
}
export default MyModel
