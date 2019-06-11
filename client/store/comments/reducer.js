import { GET_COMMENTS, CREATE_COMMENT, ADD_COMMENT } from './actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return action.comments
    case CREATE_COMMENT:
      return [...state, action.newComment]
    case ADD_COMMENT:
      return [...state, action.comment]
    default:
      return state
  }
}
