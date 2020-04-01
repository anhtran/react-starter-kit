import { getItemListAPI, getUserDetailAPI } from './apis'
import { Toast } from 'antd-mobile'

export const updateData = (payload) => ({
  type: 'UPDATE',
  payload: {
    ...payload
  }
})

export function fetchProfileDetailData () {
  return function (dispatch) {
    return getUserDetailAPI().then(r => {
      dispatch(updateData(r.data))
    }).catch(e => {
      if (e.response && e.response.status >= 400 && e.response.status < 500) {
        dispatch(updateData({ isAuth: false, username: 'Guest' }))
      }
    })
  }
}

export function fetchItemListData (page) {
  return function (dispatch) {
    Toast.loading('Loading...')
    return getItemListAPI(page).then(r => {
      dispatch(updateData({ itemObj: r.data }))
    }).finally(() => {
      Toast.hide()
    })
  }
}
