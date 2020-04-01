export const initState = {
  username: '',
  name: '',
  email: '',
  dateJoined: '',
  lastLogin: '',
  itemObj: {
    items: [],
    pagination: {}
  }
}

const MyStore = (state = initState, action) => {
  if (action.type === 'UPDATE') {
    return {
      ...state,
      ...action.payload
    }
  }

  if (action.type === 'RESET') {
    return {
      ...state,
      ...initState
    }
  }

  return state
}

export default MyStore
