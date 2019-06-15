import Socket from './Socket'
import { GET_USER_DETAILS, LOGOUT } from '../auth/actions'
import { CREATE_COMMENT } from '../comments/actions'
import {
  JOIN_COHORT_STRETCH_ROOM,
  JOIN_COHORT_STRETCH_ROOM_ADMIN
} from './actions'
import {
  START_STRETCH_TIMER,
  UPDATE_COHORT_STRETCH
} from '../cohort-stretches/actions'

const socketMiddleware = storeAPI => {
  let socket
  return next => action => {
    switch (action.type) {
      case GET_USER_DETAILS:
        socket = new Socket(action.userDetails, storeAPI)
        break
      case CREATE_COMMENT:
        socket.sendMessage(action.newComment, action.emitObject)
        break
      case LOGOUT:
        socket.disconnectUser()
        break
      case JOIN_COHORT_STRETCH_ROOM:
        socket.joinCohortStretchRoom(action.cohortStretchId)
        break
      case JOIN_COHORT_STRETCH_ROOM_ADMIN:
        socket.joinCohortStretchRoomAdmin(action.cohortStretch)
        break
      case UPDATE_COHORT_STRETCH:
        socket.startStretchTimer(action.updatedCohortStretch)
        break
      default:
        break
    }

    return next(action)
  }
}

export default socketMiddleware
