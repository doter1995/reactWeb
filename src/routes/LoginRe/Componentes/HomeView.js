import React from 'react'
import './HomeView.scss'
import LoginRe from './LoginRe'
import { Carousel, Row, Col } from 'antd'
class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      height: window.innerHeight,
      indexImg: 1
    }
  }
  componentDidMount () {
    window.addEventListener('resize', this.onWindowResize.bind(this))
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.onWindowResize.bind(this))
  }
  onWindowResize (e) {
    this.setState({ height: window.innerHeight })
  }
  render () {
    return (
      <div width='100%' style={{ marginTop:-60 }}>
        <Carousel effect='fade' autoplay dots={false} >
          <div className='Bg_img' ><img src='./index_1.jpg' style={{ width:window.innerWidth, height:window.innerHeight }} /></div>
          <div className='Bg_img' ><img src='./index_2.jpg' style={{ width:window.innerWidth, height:window.innerHeight }} /></div>
          <div className='Bg_img' ><img src='./index_3.jpg' style={{ width:window.innerWidth, height:window.innerHeight }} /></div>
          <div className='Bg_img' ><img src='./index_4.jpg' style={{ width:window.innerWidth, height:window.innerHeight }} /></div>
        </Carousel>
        <div style={{ position:'fixed', top:(window.innerHeight - 500) / 3, left:0, width:'100%', height:'100%' }}>
          <Row className='loginre'><Col xs={1} md={12} lg={15} ><div /></Col>
            <Col xs={20} md={8} lg={6} className='loginre_div'>
              <LoginRe />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default HomeView
