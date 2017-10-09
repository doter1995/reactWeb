import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Input, Select, Button } from 'antd'
const Group = Input.Group
const Option = Select.Option

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'U',
      v: ''
    }
  }
  render () {
    var State = this.state
    return (
      <Card style={{ width: '80%', marginLeft: '10%', marginTop: 20, backgroundColor: '#eee', marginBottom: 40 }}>
        <Group compact size='large'>
          <Select size='large' style={{ width: 80 }}
            onChange={(v) => { this.setState({ type : v }) }}
            defaultValue={State.type ? State.type : 'U'}>
            <Option value='U'>用户</Option>
            <Option value='P'>标题</Option>
          </Select>
          <Input size='large' style={{ width: '80%' }} onChange={(v) => { this.setState({ v : v.target.value }) }} />
          <Button icon='search' size='large' type='primary' style={{ width: 80 }}
            onClick={() => { this.props.OnSearch(State) }}
            >搜索</Button>
        </Group>
      </Card >
    )
  }
}
Search.propTypes = {
  OnSearch : PropTypes.func.isRequired
}
export default Search
