import React, { Component } from 'react'
import * as SearchA from '../../Componentes/Search'
import { Card } from 'antd'
import Users from './Users'
import Passages from './Passages'
import Recommend from './Recommend'
import { POST } from '../../Componentes/NetApi'
export default class Search extends Component {
  constructor (Props) {
    super(Props)
    this.state = {
      search:{
        type:null,
        v:''
      },
      uData:null,
      pData:null
    }
  }
  onSearch (v) {
    let search = v
    if (search.type === 'U') {
      this.getUser(search.v)
    } else {
      this.getPassage(search.v)
    }
    this.setState({ search:search })
  }
  getUser (name) {
    POST('/user/userLike', { name:name }, (re) => {
      re.state === 1 ? this.setState({ uData:re.data }) : ''
    })
  }
  getPassage (name) {
    POST('/user/passageLike', { name:name }, (re) => {
      re.state === 1 ? this.setState({ pData:re.data }) : ''
    })
  }
  render () {
    var search = this.state.search
    var uData = this.state.uData
    var pData = this.state.pData
    return (
      <Card style={{ width: '90%', marginLeft: '5%' }}>
        <SearchA.default OnSearch={this.onSearch.bind(this)} />
        {search.type == null ? <Recommend /> : search.type === 'U' ? <Users data={uData} /> : <Passages data={pData} />}
      </Card>
    )
  }
}

