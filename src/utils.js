import React from 'react'
import NumberFormat from 'react-number-format'
import moment from 'moment'
import 'moment/locale/vi'
import 'moment-timezone'
import { message } from 'antd'

const _ = require('underscore')

export const sizes = {
  1: [12, 20],
  2: [16, 28],
  3: [18, 32],
  4: [24, 44],
  5: [32, 50]
}

export const formatDate = (date, tz = 'UTC', format_ = 'HH:mm DD/MM/YYYY Z') => {
  if (date) {
    return moment(date).tz(tz).format(format_)
  }
  return '-'
}

export const untilDeleteDate = (deleteDate) => {
  if (deleteDate) {
    return moment(deleteDate).add(30, 'days').fromNow()
  }
  return ''
}

export const formatCurrency = (value, unit = '₫') => {
  return (
    <>
      <NumberFormat value={value} displayType='text' thousandSeparator /> {unit}
    </>
  )
}

export const convertQuerySearch = (search_) => {
  const search = search_.substring(1)
  if (search) {
    return JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === '' ? value : decodeURIComponent(value) })
  } else {
    return null
  }
}

export function addURLParameter (url, parameter, value) {
  let loc = removeURLParameter(url, parameter)
  loc += loc.indexOf('?') === -1 ? '?' : '&'
  return loc + parameter + '=' + value
}

export function removeURLParameter (url, parameter) {
  const urlparts = url.split('?')
  if (urlparts.length >= 2) {
    const prefix = encodeURIComponent(parameter) + '='
    const pars = urlparts[1].split(/[&;]/g)

    for (let i = pars.length; i-- > 0;) {
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1)
      }
    }
    url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '')
    return url
  } else {
    return url
  }
}

export function validateEmail (email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

message.config({ prefixCls: 'khoibut-message', maxCount: 3 })
export const showAntMessage = message

export function containsObject (obj, list) {
  const res = _.find(list, function (val) { return _.isEqual(obj, val) })
  return !!(_.isObject(res))
}

export function getFullURL (url) {
  if (process.env.NODE_ENV !== 'production') {
    if (url.startsWith('http')) {
      return url
    } else {
      return `http://localhost:8000${url}`
    }
  }
  return url
}

export function removeDuplicateObject (things, paramName) {
  return things.filter((thing, index, self) =>
    index === self.findIndex((t) => (
      t[paramName] === thing[paramName]
    ))
  )
}
