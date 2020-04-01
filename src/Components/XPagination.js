import React, { Component } from 'react'
import '../css/XPagination.scss'
import { Button, Drawer } from 'antd'
import PropTypes from 'prop-types'

class XPagination extends Component {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    changePage: PropTypes.func.isRequired
  }

  state = {
    visible: false
  }

  handleVisibleChange = visible => {
    this.setState({ visible })
  }

  changePage = page => {
    this.props.changePage(page)
  }

  render () {
    const { pagination } = this.props
    const { total, current, numPages } = pagination
    const Content = () => {
      const pages = Array(numPages - 0).fill().map((_, idx) => 1 + idx)
      return (
        <>
          <p>
            Page <b className='mr-2'>{current}/{numPages}</b> of {total} items
          </p>

          <div className='d-flex mb-3'>
            <Button disabled={current === 1} onClick={() => this.changePage(1)}>First Page</Button>
            <Button className='ml-2' disabled={current === numPages} onClick={() => this.changePage(numPages)}>Last Page</Button>
          </div>

          <ul className='list-unstyled XPaginationPopover-page-list'>
            {pages.map(i => (
              <li key={i} className={`XPaginationPopover-page-list-item ${i === current ? 'active' : ''}`}>
                <button onClick={() => this.changePage(i)}>{i}</button>
              </li>
            ))}
          </ul>
        </>
      )
    }

    return (
      <>
        <nav className='XPagination'>
          <div className='XPagination-Inner'>
            <Button aria-label='Previous' disabled={current === 1} onClick={() => this.changePage(parseInt(current) - 1)}><i className='fa fa-chevron-left' /></Button>
            <Button type='primary' aria-label='Next' className='ml-2' disabled={current === numPages} onClick={() => this.changePage(parseInt(current) + 1)}>
              <span className='mr-2'>Next</span>
              <i className='fa fa-chevron-right' />
            </Button>

            <span className='ml-2'>
              <b className='mr-2'>{current}/{numPages}</b> Page
            </span>

            <Button type='primary' className='ml-auto' title='Jump To' aria-label='Jump To' onClick={() => this.handleVisibleChange(true)}>
              <i className='fa fa-angle-double-right' />
            </Button>
          </div>
        </nav>

        <Drawer
          closable={false}
          placement='bottom'
          title='Jump to page'
          visible={this.state.visible}
          onClose={() => this.handleVisibleChange(false)}
          className='XPaginationPopover'
        >
          <Content />
        </Drawer>
      </>
    )
  }
}

export default XPagination
