import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classes from './PageNotFound.scss'
import { withRouter } from 'react-router'
import { Row, Col } from 'antd'
class PageNotFound extends Component {
  render () {
    return (
      <div className='notFound' style={{ height:window.innerHeight }}>
        <Row className='notFound_back' style={{ paddingTop:window.innerHeight / 3 }}>
          <Col span={12} ><div style={{ float:'right', lineHeight:2 }}>此处已进入外太空,<br />请立即
            <a className={classes.link} onClick={this.props.router.goBack}>返回</a></div>
          </Col>
          <Col span={12} ><div style={{ float:'left' }}><img src='./404_2.png' style={{ width:240, height:240 }} />
          </div></Col></Row>
      </div>
    )
  }
}

PageNotFound.propTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(PageNotFound)
