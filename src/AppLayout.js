import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProfileDetailData } from './actions'
import { withRouter } from 'react-router-dom'
import './css/MyProject.scss'

class AppLayout extends Component {
  componentDidMount () {
    this.props.fetchProfileDetailData()
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const { pathname } = this.props.location
    if (pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render () {
    return (
      <div className='CreatorStudio'>
        {this.props.children}
      </div>
    )
  }
}

export default withRouter(connect(null, { fetchProfileDetailData })(AppLayout))
