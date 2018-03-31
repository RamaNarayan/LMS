import * as ActionTypes from '../actionCreators/actionTypes';
import {Map, List, fromJS} from 'immutable';

const initalState = fromJS({
  searchLoanResult:null
});

function setLoanSearchResult(state,searchLoanResult){
  return state.set('searchLoanResult',fromJS(searchLoanResult))
}

export default function(state = initalState, action) {
  switch (action.type) {
    case ActionTypes.SET_LOAN_SEARCH_RESULT:
      return setLoanSearchResult(state,action.searchLoanResult)
  }
 return state;
}
