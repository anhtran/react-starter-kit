import React from 'react'
import { List } from 'react-content-loader'

export class ListLoader extends React.Component {
  render () {
    return (
      <List
        backgroundColor='#ddd'
        foregroundColor='#ccc'
      />
    )
  }
}

export const PageLoader = () => (
  <div className='d-flex align-items-center justify-content-center' style={{ width: '100%', height: '100%', minHeight: 300 }}>
    <i className='fa fa-circle-notch fa-spin fa-2x' style={{ color: '#aaa' }} />
  </div>
)
