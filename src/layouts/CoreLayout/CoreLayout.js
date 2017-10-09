import React from 'react'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'
import 'antd/dist/antd.css'

class CoreLayout extends React.Component {
  render () {
    var children = this.props.children
    return (
      <div >
        <Header />
        <div style={{ marginTop: 60 }}>
          {children}
        </div>
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
