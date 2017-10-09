import React, { Component } from 'react'
import './New.scss'

import { Card, Button } from 'antd'

import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { POST } from '../../Componentes/NetApi'
import { browserHistory } from 'react-router'

import draftToHtml from 'draftjs-to-html'
import { convertToRaw } from 'draft-js'

class New extends Component {
  constructor (props) {
    super(props)
    this.state = { editorState:'' }
  }
  componentWillMount () {
    POST('/getState', {}, () => {})
  }
  onSubmit () {
    console.log('this.state.editorState', this.state.editorState)
    console.log(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
    POST('/user/newPassage', { title:this.refs.title.value, text:draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())) },
    (re) => {
      if (re.state == 1) {
        alert('发布成功！前往首页')
        browserHistory.push('/')
      }
    })
  }
  onChange (editorState) {
    this.setState({ editorState:editorState })
  }
  render () {
    return (
      <Card style={{ width:'80%', marginLeft:'10%', backgroundColor:'#eee' }}>
        <Card style={{ width:'90%', marginLeft:'5%', backgroundColor:'#eee' }}>
          <div className='new_title'><input ref='title' placeholder='请输入标题' /></div>
          <hr style={{ margin: '25px 0' }} />
          <div style={{ width:'100%' }}>
            <Editor
              hashtag={{}}
              editorState={this.state.editorState}
              toolbarClassName='home-toolbar'
              wrapperClassName='home-wrapper'
              editorClassName='passage_editor'
              onEditorStateChange={this.onChange.bind(this)}
              lang='zh'
              />
            <hr />
          </div>
          <Button type='primary'style={{ float:'right', marginTop:20, marginBottom:30 }} size='large' onClick={this.onSubmit.bind(this)}>发布</Button>
        </Card>
      </Card>
    )
  }
}

export default New
