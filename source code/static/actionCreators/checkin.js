import * as ActionConstants from './actionTypes';

export function setLoanSearchResult(searchLoanResult){
  return {
    type: ActionConstants.SET_LOAN_SEARCH_RESULT,
    searchLoanResult: searchLoanResult
  }
}
