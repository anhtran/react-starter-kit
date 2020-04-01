import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { PageLoader } from '../Loaders'
import { connect } from 'react-redux'
import MyStore from '../reducers/MyStore'
import styled from '@emotion/styled'

const Box = styled.div`
  padding: 1rem;
`

class Home extends Component {
  render () {
    const { username } = this.props.MyStore

    return (
      <Box>
        {username ? (
          <div className='container'>
            <h1 className='h3'>Hello {username}</h1>

            <ul className='list-group'>
              <li className='list-group-item'>
                <Link to='/'>Home</Link>
              </li>

              <li className='list-group-item'>
                <Link to='/TrixEditorSample/'>WYSIWYG Editor (Trix)</Link>
              </li>

              <li className='list-group-item'>
                <Link to='/ItemListSample/'>XPagination</Link>
              </li>
            </ul>

            <div className='my-3 text-center'>
              &copy; 2020 anhtran.net
            </div>
          </div>
        ) : (
          <PageLoader />
        )}
      </Box>
    )
  }
}

export default withRouter(
  connect(MyStore)(Home)
)
