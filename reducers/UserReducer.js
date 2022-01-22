import {
    USER_INFO_TYPE
} from '../actions/types'

const INITIAL_STATE = {
    user_value: {},
}

export default function (state = INITIAL_STATE, action) {
    // console.log('redux-OOOOOKKKKKK',action.payload)
    switch (action.type) {
        case USER_INFO_TYPE:
            return { user_value: action.payload }

        default:
            return state
    }
}