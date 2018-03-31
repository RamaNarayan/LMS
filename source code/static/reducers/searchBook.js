import * as ActionTypes from '../actionCreators/actionTypes';
import {Map, List, fromJS} from 'immutable';

const initalState = fromJS({
  searchResult:null
});

function setSearchResult(state,searchResult){
  return state.set('searchResult',fromJS(searchResult))
}

export default function(state = initalState, action) {
  switch (action.type) {
    case ActionTypes.SET_SEARCH_RESULT:
      return setSearchResult(state,action.searchResult)
  }
 return state;
}
