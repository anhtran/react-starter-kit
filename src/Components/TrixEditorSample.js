/** @jsx jsx */
import { css, jsx } from '@emotion/core'
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import { NavBar } from 'antd-mobile'
import { Button, Popover } from 'antd'
import { withRouter } from 'react-router-dom'
import { TrixEditor } from 'react-trix'
import Trix from 'trix/dist/trix'
import 'trix/dist/trix.css'
import HTMLReactParser from 'html-react-parser'

Trix.config.blockAttributes.default.tagName = 'p'
Trix.config.blockAttributes.default.breakOnReturn = true
Trix.config.css.paragraph = 'trix-p'

class TrixEditorSample extends Component {
  constructor (props) {
    super(props)
    this.trix = React.createRef()
  }

  state = {
    visibleDrawer: false
  }

  componentDidMount () {
  }

  handleTrixChange = val => {
    console.log(val)
  }

  render () {
    const { history } = this.props

    return (
      <div>
        <NavBar
          mode='light'
          icon={<i className='fa fa-chevron-left' />}
          onLeftClick={() => history.push('/')}
          rightContent={[
            <Info key='info' />
          ]}
        >
          <div>New Item</div>
        </NavBar>

        <div className='trix'>
          <TrixEditor
            ref={this.trix}
            mergeTags={null}
            onChange={this.handleTrixChange}
            placeholder='Write content here'
          />
        </div>
      </div>
    )
  }
}

export default withRouter(TrixEditorSample)

const Info = props => {
  // language=HTML
  const content = `
    <ul class="pl-3">
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda atque beatae commodi ducimus ea earum eligendi eos ipsa labore magni maiores minima nulla qui quibusdam quod, quos saepe vel voluptas!</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, accusamus autem consectetur consequuntur deleniti dolore ea earum est eum fugit, ipsum laudantium neque numquam obcaecati optio perferendis placeat quae reiciendis?</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam assumenda distinctio doloremque, eligendi eos error, in nemo quasi quis quod repellendus temporibus velit vero voluptas voluptates. Ea illum ipsam voluptatibus.</li>
    </ul>
  `
  return (
    <div css={css`
      .antd-popover-open {
        color: #0066C2;
      }
    `}
    >
      <Popover placement='bottomRight' content={HTMLReactParser(content)} trigger='click' overlayStyle={{ maxWidth: 300 }}>
        <Button type='link' aria-label='Info'><i className='fa fa-info' /></Button>
      </Popover>
    </div>
  )
}
