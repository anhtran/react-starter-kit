import axios from 'axios'
import { setup } from 'axios-cache-adapter'
// Polyfill Promises for IE and older browsers.
require('es6-promise').polyfill()

/* eslint-disable */
export const apiObject                 = window.__STARTER_KIT_CONTANTS__
export const baseURL                   = apiObject.baseURL
export const userDetailURL             = apiObject.userDetailURL
export const itemListURL               = apiObject.itemListURL
/* eslint-enable */

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
// axios.defaults.withCredentials = true // enable this if using cookies

const api = setup({
  cache: {
    maxAge: 15 * 60 * 1000
  }
})

export function getUserDetailAPI () {
  return api.get(userDetailURL)
}

export function getItemListAPI (page) {
  return axios.get(`${itemListURL}/${page}`)
}
