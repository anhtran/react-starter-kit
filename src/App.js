import React, { Component } from 'react'
import { ConfigProvider } from 'antd'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { baseURL } from './apis'
import AppLayout from './AppLayout'
import Home from './Components/Home'
import TrixEditorSample from './Components/TrixEditorSample'
import ItemListSample from './Components/ItemListSample'

class App extends Component {
  render () {
    return (
      <BrowserRouter basename={baseURL}>
        <ConfigProvider prefixCls='antd'>
          <AppLayout>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/TrixEditorSample/' exact component={TrixEditorSample} />
              <Route path='/ItemListSample/' exact component={ItemListSample} />
            </Switch>
          </AppLayout>
        </ConfigProvider>
      </BrowserRouter>
    )
  }
}

export default App
