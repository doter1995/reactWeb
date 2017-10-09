import React, { Component } from 'react'
import Passage from '../Componentes/Passage'
class PassageOne extends Component {

  componentWillMount () {
    console.log()
  }
  render () {
    return (
      <div>
        <Passage pid={this.props.location.query.id} />
      </div>
    )
  }
}

export default PassageOne
