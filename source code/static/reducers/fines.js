import * as ActionTypes from '../actionCreators/actionTypes';
import {Map, List, fromJS} from 'immutable';

const initalState = fromJS({
  finesData:null
});

function setFineData(state,finesData){
  return state.set('finesData',fromJS(finesData))
}

export default function(state = initalState, action) {
  switch (action.type) {
    case ActionTypes.SET_FINE_DATA:
      return setFineData(state,action.finesData)
  }
 return state;
}
