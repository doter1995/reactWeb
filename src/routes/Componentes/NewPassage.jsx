import React, { Component } from 'react'

import { Editor } from 'react-draft-editor-ch'
import 'react-draft-editor-ch/dist/react-draft-editor-ch.css'
import './NewPassage.scss'
class NewPassage extends Component {
  constructor (props) {
    super(props)
    this.state = { editorState:'' }
    this.onChange = (editorState) => this.setState({ editorState })
    this.onSubmit = () => { console.log('jieguo', this.state.editorState) }
  }

 

  render () {
    return (
      <div style={{ width:'100%' }}>
        <Editor
          toolbarClassName='home-toolbar'
          wrapperClassName='home-wrapper'
          editorClassName='passage_editor'
          onChange={this.onEditorChange}
          lang='zh'
              />
        <hr />
      </div>
    )
  }
}

export default NewPassage
