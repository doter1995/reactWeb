import Fetch from './Fetch.js'

import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
const BASE_URL = 'http://112.74.203.143:3001'
import { message } from 'antd'
const info = () => {
  message.info('发生了错误，请刷新页面')
}

export var POST = (Url, data, trueF, errorF = (e) => { info() }, timeout = 5000) => {
  Fetch(fetch(BASE_URL + Url, {
    mode: 'cors',
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then((req) => req.json())
    .then((re) => {
      if (re.state === -4) {
        sessionStorage.setItem('isLogin', false)
        browserHistory.push('/login')
      } else {
        trueF(re)
      }
    }).catch((e) => {
      errorF(e)
    }), timeout)
}
export var GetKey = (F = (e) => { console.log('the key', e) }) => {
  Fetch(fetch(BASE_URL + '/getKey')
    .then((re) => re.json())
    .then((re) => {
      F(re)
    }).catch(e => { console.log('获取key失败，请联系管理员') }), 5000)
}
