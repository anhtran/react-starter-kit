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
import replace from 'lodash/replace'

const sanitizeHtml = require('sanitize-html')
const removeFormat = (html) => {
  return sanitizeHtml(html, {
    // allowedTags: ['b', 'i', 'em', 'strong', 'blockquote', 'del', 'ins', 'hr', 'p', 'ul', 'ol', 'li']
    allowedTags: ['p']
  })
}

Trix.config.blockAttributes.default.tagName = 'p'
Trix.config.blockAttributes.default.breakOnReturn = true
Trix.config.css.paragraph = 'trix-p'
Trix.config.toolbar.getDefaultHTML = () => {
  // language=HTML
  return `
        <div class="trix-button-row">
      <span class="trix-button-group trix-button-group--text-tools" data-trix-button-group="text-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-bold" data-trix-attribute="bold" title="Bold" tabindex="-1">Bold</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-italic" data-trix-attribute="italic" title="Italic" tabindex="-1">Italic</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-strike" data-trix-attribute="strike" title="Strike" tabindex="-1">Strike</button>
        <button type='button' class='trix-button trix-button--icon trix-button--icon-quote' data-trix-attribute='quote' title='Quote' tabIndex='-1'>Quote</button>
      </span>

      <span class='trix-button-group trix-button-group--history-tools ml-2' data-trix-button-group='history-tools'>
        <button type='button' class='trix-button trix-button--icon trix-button--icon-undo' disabled data-trix-action="undo" title='Undo' tabIndex='-1'>Undo</button>
        <button type='button' class='trix-button trix-button--icon trix-button--icon-redo' disabled data-trix-action="redo" title='Redo' tabIndex='-1'>Redo</button>
      </span>
      
      <span class='trix-button-group ml-auto mr-0'>
        <button
            type='button' class='trix-button' 
            title='Remove Format' tabIndex='-1' 
            data-trix-action="x-remove-format"
            style="height: 32px; width: 32px; padding: 0;"
            aria-label="Remove Format"
        >
            <i class="fa fa-remove-format fa-lg"></i>
        </button>
      </span>
    </div>
      `
}

class TrixEditorSample extends Component {
  constructor (props) {
    super(props)
    this.trix = React.createRef()
  }

  state = {
    visibleDrawer: false,
    content: '',
    loading: false,
    files: [],
    imageUrl: ''
  }

  componentDidMount () {
    document.addEventListener('trix-action-invoke', event => {
      if (event.actionName === 'x-remove-format') {
        let clean = removeFormat(this.state.content)
        clean = replace(clean, new RegExp('<p></p>', 'g'), '')
        this.trix.current.editor.loadHTML('')
        this.trix.current.editor.insertHTML(clean)
      }
    })
  }

  handleTrixChange = val => {
    this.setState({ content: val })
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
            value={this.state.content}
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
