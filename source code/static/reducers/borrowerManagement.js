import * as ActionTypes from '../actionCreators/actionTypes';
import {Map, List, fromJS} from 'immutable';

const initalState = fromJS({
  borrowerId:null
});


export default function(state = initalState, action) {
 return state;
}
