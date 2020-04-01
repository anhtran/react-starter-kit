import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchItemListData } from '../actions'
import { List } from 'antd-mobile'
import MyStore from '../reducers/MyStore'
import XPagination from './XPagination'
import { Link } from 'react-router-dom'

const { Item } = List

class ItemListSample extends Component {
  componentDidMount () {
    this.props.fetchItemListData(1)
  }

  changePage = (page) => {
    console.log(page)
    this.props.fetchItemListData(page)
  }

  render () {
    const { items, pagination } = this.props.MyStore.itemObj
    return (
      <div>
        <List renderHeader={<Header />} className='my-list'>
          {items.map(item => (
            <Item arrow='horizontal' multipleLine key={item.id}>
              {item.name}
            </Item>
          ))}
        </List>

        <XPagination pagination={pagination} changePage={this.changePage} />
      </div>
    )
  }
}

export default connect(MyStore, { fetchItemListData })(ItemListSample)

const Header = props => {
  return (
    <div className='d-flex'>
      <Link to='/'><i className='fa fa-chevron-left' /></Link>
      <div className='ml-2'>Title</div>
    </div>
  )
}
