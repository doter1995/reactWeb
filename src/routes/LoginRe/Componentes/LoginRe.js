import React, { Component } from 'react'
import { Button, Row, Col } from 'antd'
import { GetKey, POST } from '../../Componentes/NetApi'
import NodeRSA from 'node-rsa'
import { withRouter } from 'react-router'
import './LoginRe.scss'
const tipSuccess = '../tip_success.png'
const tipError = '../error.png'
const tipCuowu = '../tip_error.png'

const getTip = (i) => i === 1 ? tipSuccess : i === 3 ? tipError : tipCuowu

class LoginRe extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      islogin: true,
      tip: '',
      login: {
        name: {
          value: '',
          state: 0
        },
        pass: {
          value: '',
          state: 0
        }
      },
      res: {
        name: {
          value: '',
          state: 0
        },
        emil: {
          value: '',
          state: 0
        },
        pass: {
          value: '',
          state: 0
        }
      }
    }
  }
  changeLogin (i) {
    this.setState({ islogin: i })
  }
  changeValue (i, type, t) {
    let v = t.target.value
    console.log('object', i, type, v)
    var state
    if (!v || v.length < 1) {
      state = 0
    } else {
      console.log('pass1')
      if (type === 'pass') {
        console.log('pass')
        state = v.length > 5 && v.length < 16 ? 1 : 2
      }
    }

    if (i === 0) {
      var login = this.state.login
      login[type].value = v
      login[type].state = state
      this.setState({ login: login })
      console.log('login', login.pass.state)
    } else {
      var res = this.state.res
      res[type].value = v
      res[type].state = state
      this.setState({ res: res })
    }
  }
  onQueryName (i, type) {
    var name = ''
    if (i === 0) {
      name = this.state.login.name.value
    } else {
      if (type === 'emil') {
        name = this.state.res.emil.value
      } else {
        name = this.state.res.name.value
      }
    }
    var login = this.state.login
    var res = this.state.res
    POST('/logintest', { name: name }, (re) => {
      if (re.state === 1) { // 存在
        if (i === 0) { // 登录处理
          login.name.state = 1
          this.setState({ login: login })
        } else { // 注册
          type == 'emil' ? res.emil.state = 3 : res.name.state = 3
          this.setState({ res:res })
        }
      } else { // 不存在
        if (i === 0) { // 登录处理
          login.name.state = 3
          this.setState({ login: login })
        } else { // 注册
          type == 'emil' ? res.emil.state = 1 : res.name.state = 1
          this.setState({ res:res })
        }
      }
    })
  }
  onLogin () {
    var pass = this.state.login.pass
    var name = this.state.login.name
    POST('/login', { name: name.value, pass: pass.value }, (re) => {
      console.log('get reult', re)
      if (re.state === 1) {
        sessionStorage.setItem('isLogin', true)
        this.props.router.push('/')
        // 跳转路由
        
        // 修改头像
      } else { // 密码错误
        console.log('mimacuowu')
        pass.state = 3
        this.setState({ pass: pass })
      }
    }, (e) => {
      console.log('参数错误')
    }, 3000)
  }

  onRegister () {
    var res = this.state.res
    POST('/register', { emil: res.emil.value, pass: res.pass.value, name: res.name.value }, (re) => {
      if (re.state === 1) {
        // 注册成功
        this.setState({ islogin: true })
        console.log('注册成功')
      } if (re.state === -1) {
        // 参数错误
        console.log('参数错误')
      } else if (re.state === 2) {
        // 账号 邮箱被占用
        console.log('邮箱被占用')
      }
    }, (error) => {
      // 服务器错误
      console.log('服务器错误')
    })
  }
  render () {
    var login = this.state.login
    var res = this.state.res
    var tip = this.state.tip

    return (
      <div className='home_login'>
        <div className='Htitle'>西安文理学院校园论坛系统</div>

        <div className='Hlogin_res'>
          <span className={this.state.islogin ? 'Hlogin_res_active' : 'Hlogin_res_'} onClick={this.changeLogin.bind(this, true)}>登录</span>
          <span className={this.state.islogin ? 'Hlogin_res_' : 'Hlogin_res_active'} onClick={this.changeLogin.bind(this, false)}>注册</span>
        </div>
        <div style={{ width: '100%', textAlign: 'center', marginTop: 20, height: 20 }}>{tip}</div>
        {this.state.islogin
          ? <Row className='HloginDialog-login'>
            <Col span={24}><input onChange={this.changeValue.bind(this, 0, 'name')} onBlur={this.onQueryName.bind(this, 0)} placeholder='账号/邮箱/手机号' value={login.name.value} /> <div className={login.name.state == 0 ? 'Hlogin_tip hidden' : 'Hlogin_tip'}><img src={getTip(login.name.state)} /></div></Col>
            <Col span={24}><input type='password' placeholder='密码' onChange={this.changeValue.bind(this, 0, 'pass')} value={login.pass.value} /> <div className={login.pass.state == 0 ? 'Hlogin_tip hidden' : 'Hlogin_tip'}><img src={getTip(login.pass.state)} /></div></Col>

            <Col><Button type='primary' style={{ width: 100 }} size='large' onClick={this.onLogin.bind(this)}>登录</Button></Col>
            <Col span={24} style={{ marginTop: 30 }}> <a href='#'>忘记密码？</a></Col>
          </Row>
          : <Row className='HloginDialog-res'>
            <Col span={24}><input onChange={this.changeValue.bind(this, 1, 'name')} onBlur={this.onQueryName.bind(this, 1, 'name')} placeholder='账号' value={res.name.value} /><div className={res.name.state == 0 ? 'Hlogin_tip hidden' : 'Hlogin_tip'}><img src={getTip(res.name.state)} /></div></Col>
            <Col span={24}><input onChange={this.changeValue.bind(this, 1, 'emil')} onBlur={this.onQueryName.bind(this, 1, 'emil')} placeholder='邮箱' value={res.emil.value} /><div className={res.emil.state == 0 ? 'Hlogin_tip hidden' : 'Hlogin_tip'}><img src={getTip(res.emil.state)} /></div></Col>
            <Col span={24}><input onChange={this.changeValue.bind(this, 1, 'pass')} type='password' placeholder='密码' value={res.pass.value} /><div className={res.pass.state == 0 ? 'Hlogin_tip hidden' : 'Hlogin_tip'} ><img src={getTip(res.pass.state)} /></div></Col>
            <Col> <Button style={{ width: 100 }} type='primary' size='large' onClick={this.onRegister.bind(this)}>注册</Button></Col>
          </Row>
        }
      </div>
    )
  }
}
export default withRouter(LoginRe)
