import * as ActionConstants from './actionTypes';

export function setPage(page){
  return {
    type: ActionConstants.SET_PAGE,
    page: page
  }
}
