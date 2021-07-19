export const BOOK_ADD = 'book/ADD'
export const BOOK_REMOVE = 'book/REMOVE'
export const BOOK_UPDATE = 'book/UPDATE'

const initialState = {
  items: [],
}

export default (state = initialState, action) => {
  const items = state.items

  switch (action.type) {
    case BOOK_ADD:
      items.push(action.payload)

      return {
        ...state,
        items,
      }

    case BOOK_REMOVE:
      items.splice(action.payload, 1)

      return {
        ...state,
        items,
      }

    case BOOK_UPDATE:
      const index = items.findIndex(e => e.id == action.payload.id)
      items[index] = action.payload

      return {
        ...state,
        items,
      }

    default:
      return state
  }
}

export const add = (item) => {
  return dispatch => {
    dispatch({
      type: BOOK_ADD,
      payload: item,
    })
  }
}

export const remove = (index) => {
  return dispatch => {
    dispatch({
      type: BOOK_REMOVE,
      payload: index,
    })
  }
}

export const update = (item) => {
  return dispatch => {
    dispatch({
      type: BOOK_UPDATE,
      payload: item,
    })
  }
}