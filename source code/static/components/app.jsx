import React from 'react';
import { connect } from 'react-redux';
import {setPage} from '../actionCreators/app'
import {BorrowerManagementContainer} from './borrowerManagement'
import {SearchBookContainer} from './searchBook'
import {CheckInContainer} from './checkin'
import {FineContainer} from './fine'

window.$ = window.jQuery = require('jquery');

class App extends React.Component {
 constructor(props){
   super(props);
   this.getRenderComponents = this.getRenderComponents.bind(this)
   this.handleTabClick = this.handleTabClick.bind(this)
 }

 handleTabClick(page){
   this.props.setPage(page)
 }

 getRenderComponents(){
   let {page} = this.props
   switch(page){
     case 'borrower': return <BorrowerManagementContainer />
      break;
     case 'searchBook': return <SearchBookContainer />
      break;
     case 'checkin' : return <CheckInContainer />
      break;
     case 'fines': return <FineContainer />
      break;
     default:return <SearchBookContainer />
   }
 }


 render(){
   let {title} = this.props;
   let highlightOption = 'itemClicked';
   return <div className = 'reactApp'>
        <div className = 'titleBlock'>
          <h1 className = 'pageHeader'>{title}</h1>
        </div>
        <nav className="navbar navigation">
        <a className={this.props.page  == 'searchBook' ? "navbar-item "+highlightOption : "navbar-item"} href="#" onClick={()=>this.handleTabClick('searchBook')}>
          <span>Book Search</span>
        </a>
        <a className={this.props.page  == 'checkin' ? "navbar-item "+highlightOption : "navbar-item"} href="#" onClick={()=>this.handleTabClick('checkin')}>
          <span>Book Checkin</span>
        </a>
        <a className={this.props.page  == 'fines' ? "navbar-item "+highlightOption : "navbar-item"} href="#" onClick={()=>this.handleTabClick('fines')}>
          <span>Fines</span>
        </a>
        <a className={this.props.page  == 'borrower' ? "navbar-item "+highlightOption : "navbar-item"} href="#" onClick={()=>this.handleTabClick('borrower')}>
          <span>Borrower Management</span>
        </a>
      </nav>
      {this.getRenderComponents()}
   </div>
 }
}

App.propTypes = {
  title: React.PropTypes.string,
  setPage: React.PropTypes.func
}

const mapStateToProps = (state) => {
 return {
   title: state.getIn(['app','title']),
   page: state.getIn(['app','page'])
 };
}

const mapDispatchToProps = (dispatch) => {
 return {
   setPage: (page) => {
     dispatch(setPage(page))
   }
 };
}

export const AppContainer = connect(mapStateToProps,
 mapDispatchToProps)(App);
