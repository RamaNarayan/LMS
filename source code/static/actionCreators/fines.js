import * as ActionConstants from './actionTypes';

export function setFineData(finesData){
  return {
    type: ActionConstants.SET_FINE_DATA,
    finesData: finesData
  }
}
