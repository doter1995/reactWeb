import React from 'react'
import { IndexLink, Link, withRouter } from 'react-router'
import './Header.scss'
import { Button, Dropdown, Menu } from 'antd'
import linkes from './links_cfg'
import { POST } from '../../routes/Componentes/NetApi'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLogin: false,
      data: null
    }
    this.changeState.bind(this)
  }
  componentDidMount () {
    this.changeState()
  }
  componentWillReceiveProps (nextProps) {
    this.changeState()
  }
  changeState () {
    POST('/getUState', {},
      (re) => {
        if (re.state == 1) {
          if (!this.state.isLogin) {
            this.setState({ isLogin: true, data: re.data })
          }
        } else {
          if (this.state.isLogin) {
            this.setState({ isLogin: false })
          }
        }
      }
    )
    console.log("changeData")
  }
  exit () {
    POST('/user/exit', {}, () => { })
  }

  render () {
    var isLogin = this.state.isLogin
    var data = this.state.data
    console.log('isLogin', isLogin)
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to='/mysite'>个人中心</Link>
        </Menu.Item>
        <Menu.Item>
          <a href='#' onClick={this.exit.bind(this)}>退出登录</a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className='header head'>
        <div className='links'>
          <h1 className='nav'>西安文理学院校园论坛系统</h1>
          {linkes.map((item, i) =>
            item.to === '/'
              ? <IndexLink key={i} to={item.to} activeClassName='link_active' className='link'>
                {item.title}
              </IndexLink>
              : <Link key={i} to={item.to} activeClassName='link_active' className='link'>
                {item.title}
              </Link>
          )}
          <div className='User'>
            {isLogin
              ? (<div className='header'><img src={data.header} /><Dropdown overlay={menu}>
                <Button className='btn'>{data.account}</Button>
              </Dropdown></div>) : console.log("isLogin false")}
            {isLogin ? console.log("isLogin true") : (<Link to='/login' >
              <Button className='btn'>登录&注册</Button>
            </Link>)
            }
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
