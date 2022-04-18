interface State {
  conuste: number
  imgsNum?: number
}

let ImagsNum = 0
const defaultState = {
  conuste: 0,
  imgsNum: 0
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'prev':
      var index = state.conuste - 1
      return { ...state, conuste: index < 0 ? ImagsNum - 1 : index }
    case 'next':
      var index = state.conuste + 1
      return { ...state, conuste: index >= ImagsNum ? 0 : index }
    case 'select':
      return { ...state, conuste: action.index }
    case 'imgsNum':
      ImagsNum = action.imgsNum
      return state
    default:
      return state
  }
}

export { defaultState, reducer }
