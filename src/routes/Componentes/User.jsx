import React, { Component } from 'react'
import { Icon } from 'antd'
import './User.scss'
import { POST } from '../Componentes/NetApi/'
import moment from 'moment'
class User extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uid:props.uid,
      user:null
    }
    this.getData.bind(this)
  }
  componentDidMount () {
    this.getData(this.props.uid)
  }
  componentWillReceiveProps (props) {
    this.setState({ uid:props.uid })
    this.getData(props.uid)
  }
  getData (uid) {
    POST('/getUser', { id: this.props.uid, type:0 },
    (re) => {
      console.log('re', re)
      if (re.state == 1) {
        this.setState({ user : re.data })
      }
    })
  }
  heartTo (uid) {
    POST('/user/heartTo', { id:uid, type:0 },
    (re) => {
      console.log('re', re)
      if (re.state == 1) {
        let user = this.state.user
        user.isHearTO = true
        this.setState({ user : user })
      } else {
        let user = this.state.user
        user.isHearTO = false
        this.setState({ user : user })
      }
    })
  }
  render () {
    var showInfo = this.props.showInfo
    var data = this.state.user
    return (
      <div className='U'>
        <img className='U_img' src={data ? data.header : 'a.jpg'} />
        <div className='U_name'>{data ? data.account : 'Doter'}</div>
        <div className='U_name' onClick={this.heartTo.bind(this, this.state.uid)}>
          <Icon type={data && data.isHearTO ? 'heart' : 'heart-o'} />
          {data && data.isHearTO ? '已关注' : '关注'}</div>
        <div className='U_sigin'>{data && data.sigin ? data.sigin : '这家伙很懒！'}</div>
        {showInfo ? <div className='U_info'>
          <div className='U_info_title'>个人信息</div>
          <div>性别：{data ? data.sex == 1 ? '男' : data.sex == 2 ? '女' : '未知' : '未知'}</div>
          <div>生日：{data && data.birthday ? moment(data.birthday).format('YYYY-MM-DD') : '未知'}</div>
          <div>邮箱：<br />{data && data.emil ? data.emil : '未知'}</div>
          <div>个人说明：<br />{data && data.text ? data.text : '这个家伙很懒'}</div>
        </div> : ''}
      </div>
    )
  }
}
export default User
