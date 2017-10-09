import React from 'react'
import './HomeView.scss'
import { BackTop, Pagination } from 'antd'
import { POST } from '../../Componentes/NetApi/'
import Passage from '../../Componentes/Passage'
class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      topData: null,
      index: 1
    }
    this.getData.bind(this)
  }
  componentDidMount () {
    this.getData(1, 10)
  }
  getData (idex, length = 10) {
    if (idex == 1) {
      POST('/getTop', {},
        (re) => {
          if (re.state === 1) {
            this.setState({ topData: re.data })
          }
        })
    } else {
      this.setState({ topData:null })
    }
    POST('/getIndex', { idex: idex, length: 10 },
      (re) => {
        console.log('re', re)
        if (re.state === 1) {
          console.log('change data')
          this.setState({ data: re.data, index: idex })
          console.log('change data')
        }
      })
  }


  render () {
    var data = this.state.data
    var topData = this.state.topData
    console.log('dadadsas topData', topData)
    return (
      <div style={{ marginTop: 60 }}>
        {topData ? topData.rows.map((item, i) => {
          return (<div key={i}><Passage pid={item.id} uid={item.uid} top />
          </div>)
        }) : ''}
        {data ? data.rows.map((item, i) => {
          return (<div key={i}><Passage pid={item.id} uid={item.uid} />
          </div>)
        }
        ) : ''
        }{
          this.state.data ? <div style={{ width: '80%', margin: '15px auto' }}><Pagination size='large' onChange={(re) => { this.getData(re) }}
            Current={this.state.index} total={data.count} /></div> : ''
        }
        <BackTop />
      </div>
    )
  }
}
export default HomeView
