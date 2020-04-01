import React, { Component } from 'react'
import { Modal } from 'antd-mobile'
import PropTypes from 'prop-types'
import closest from 'antd-mobile/es/_util/closest'
import '../css/XOperation.scss'

function onWrapTouchStart (e) {
  if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
    return
  }
  const pNode = closest(e.target, `.am-modal-footer`)
  if (!pNode) {
    e.preventDefault()
  }
}

class XOperation extends Component {
  static propTypes = {
    actions: PropTypes.array.isRequired,
    platform: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired
  }

  footer = this.props.actions.map((button) => {
    const orginPress = button.onPress || function () { }
    const { visible, onClose } = this.props
    button.onPress = () => {
      if (visible) {
        return
      }
      const res = orginPress()
      if (res && res.then) {
        res
          .then(() => {
            onClose()
          })
          .catch(() => { })
      } else {
        onClose()
      }
    }
    return button
  })

  render () {
    const { platform, visible, onClose } = this.props
    return (
      <>
        <Modal
          visible={visible}
          operation
          transparent
          prefixCls='am-modal'
          transitionName='am-zoom'
          closable={false}
          maskClosable
          onClose={onClose}
          footer={this.footer}
          maskTransitionName='am-fade'
          className='am-modal-operation'
          platform={platform}
          wrapProps={{ onTouchStart: onWrapTouchStart }}
          wrapClassName={'XOperationModalWrapper'}
        />
      </>
    )
  }
}

export default XOperation
