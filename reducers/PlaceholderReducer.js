import {
    PLACEHOLDER_TYPE
  } from '../actions/types'
  
  const INITIAL_STATE = {
    value: {},
  }
  
  export default function( state = INITIAL_STATE, action ) {
      // console.log('redux-OOOOOKKKKKK',action.payload)
    switch ( action.type ) {
      case PLACEHOLDER_TYPE:
        return {value: action.payload.value} 
  
      default:
        return state
    }
  }