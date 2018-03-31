import * as ActionConstants from './actionTypes';

export function setSearchResult(searchResult){
  return {
    type: ActionConstants.SET_SEARCH_RESULT,
    searchResult: searchResult
  }
}
