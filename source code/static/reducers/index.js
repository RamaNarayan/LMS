import {Map} from 'immutable';

import app from './app'
import borrowerManagement from './borrowerManagement'
import searchBook from './searchBook'
import checkin from './checkin'
import fines from './fines'

export default function rootReducer(state = Map(), action) {
 const nextState = state.merge({
   app: app(state.get('app'),action),
   borrowerManagement: borrowerManagement(state.get('borrowerManagement'),action),
   searchBook: searchBook(state.get('searchBook'),action),
   checkin: checkin(state.get('checkin'),action),
   fines: fines(state.get('fines'),action)

 });
  return nextState
}
