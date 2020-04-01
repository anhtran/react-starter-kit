import React, { Component } from 'react'
import TimeAgo from 'react-timeago'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import en from 'react-timeago/lib/language-strings/en-short'
import PropTypes from 'prop-types'
import moment from 'moment'

class XTimeAgo extends Component {
  state = {
    viStrings: {
      prefixAgo: 'cách đây',
      prefixFromNow: null,
      suffixAgo: null,
      suffixFromNow: 'trước',
      seconds: 'chưa đến 1 phút',
      minute: '1 phút',
      minutes: '%d phút',
      hour: '1 tiếng',
      hours: '%d tiếng',
      day: '1 ngày',
      days: '%d ngày',
      month: '1 tháng',
      months: '%d tháng',
      year: '1 năm',
      years: '%d năm',
      wordSeparator: ' '
    }
  }

  componentDidMount () {
    const viStrings = {
      ...this.state.viStrings,
      ...this.props.strings
    }
    this.setState({
      viStrings
    })
  }

  render () {
    const { cutoff, lang, date } = this.props
    const viStrings = this.state.viStrings
    let formatter = buildFormatter(en)

    if (lang === 'vi') {
      formatter = buildFormatter(viStrings)
    }

    const date_ = moment(date)
    if (cutoff) {
      if (moment() >= date_.add(cutoff, 'days')) {
        return date_.format('HH:mm DD/MM/YYYY')
      }
    }
    return (
      <TimeAgo {...this.props} formatter={formatter} />
    )
  }
}

XTimeAgo.propTypes = {
  date: PropTypes.string.isRequired,
  lang: PropTypes.string,
  cutoff: PropTypes.number
}

export default XTimeAgo
