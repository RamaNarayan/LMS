import React from 'react';
import { connect } from 'react-redux';
import { setLoanSearchResult } from '../actionCreators/checkin'

class CheckIn extends React.Component {
 constructor(props){
   super(props);
   this.state = {loanId:[],checkin:false,success:null,message:'',searchQuery:'',isLoading:false};
   this.handleSearch = this.handleSearch.bind(this);
   this.handleCheckin = this.handleCheckin.bind(this);
   this.handleLoanSelectionChange = this.handleLoanSelectionChange.bind(this);
 }

 componentWillUnmount(){
   this.props.setLoanSearchResult(null)
 }


 handleSearch(event){
   this.setState({loanId:[],checkin:false,success:null,message:''});

   let bool = event.target.name == 'search' ? this.searchInput.value.length > 0 && event.which == 13 : this.searchInput.value.length > 0
   if(bool){
     this.props.setLoanSearchResult(null)
     this.setState({isLoading:true})
     this.setState({'searchQuery':this.searchInput.value})
     let searchJson = {'searchQuery': this.searchInput.value};
     $.ajax({
              url: 'http://localhost:5000/searchBookLoan',
              type: 'POST',
              data: JSON.stringify(searchJson),
              success: function(response) {
                  this.props.setLoanSearchResult(response)
                  this.setState({isLoading:false})
              }.bind(this),
              error: function(error) {
                this.setState({isLoading:false})
              }.bind(this)
          });
   }
   else{
     this.props.setLoanSearchResult(null)
   }
 }

 refreshLoanSearch(searchQuery){
   this.setState({isLoading:true})
   let searchJson = {'searchQuery': searchQuery};
   $.ajax({
            url: 'http://localhost:5000/searchBookLoan',
            type: 'POST',
            data: JSON.stringify(searchJson),
            success: function(response) {
                this.props.setLoanSearchResult(response)
                this.setState({isLoading:false})
            }.bind(this),
            error: function(error) {
              this.setState({isLoading:false})
            }.bind(this)
        });
 }

 handleCheckin(event){
   if(this.state.loanId){
     let checkinJson = {'loanId':this.state.loanId}
     $.ajax({
              url: 'http://localhost:5000/checkinBook',
              type: 'POST',
              data: JSON.stringify(checkinJson),
              success: function(response) {
                  this.setState({message:response.message,success:response.success})
                  this.refreshLoanSearch(this.state.searchQuery)
              }.bind(this),
              error: function(error) {
                  this.setState({message:response.message,success:response.success})
                  this.refreshLoanSearch(this.state.searchQuery)
              }.bind(this)
          });
   }
   else{
     alert('No record selected')
   }
 }

 handleLoanSelectionChange(event){
   let newList = this.state.loanId
   if(this.state.loanId.includes(event.target.value.toString())){
     newList.pop(event.target.value)
   }
   else{
     newList.push(event.target.value)
   }
   this.setState({loanId: newList})
 }

 render(){
   let bookSearchClassName = this.props.searchLoanResult ? 'afterResult' : 'bookSearchBox'
   return <div className='checkIn'>
    <div className = 'container-fluid'>
     <div className ='row-fluid'>
      <div className ='col-md-6'>
    <div className={"input-group "+bookSearchClassName}>
     <input type="text" className="form-control" placeholder="enter keywords to search for check in" name='search' onKeyPress={this.handleSearch} ref={(input)=>{this.searchInput=input}} / >
       <span className="input-group-btn">
         <button className="btn btn-primary" type="button" name = 'go' onClick={this.handleSearch}> Go </button>
       </span>
    </div>
    </div>
    </div>
    <div className ='row-fluid'>
      <div className = 'col-md-12'>
    {
      this.props.searchLoanResult ? this.props.searchLoanResult.get('searchResult').size > 0 ? <div className='isbnTable'><table className="table defaultTable">
        <thead>
          <tr>
            <th scope="col">Loan_id</th>
            <th scope="col">ISBN</th>
            <th scope="col">Card_id</th>
            <th scope="col">Borrower</th>
            <th scope="col">Date_Out</th>
            <th scope="col">Due_Date</th>
          </tr>
        </thead>
        <tbody>
      {
        this.props.searchLoanResult.get('searchResult').map((data,id) => {
                let loanId = data.get(0)
                return <tr key={loanId}>
                  <td scope="row">
                    <div className="checkbox">
                     <label><input type="checkbox" value={loanId} name="isbncheckbox" onChange={this.handleLoanSelectionChange} checked={this.state.loanId.includes(data.get(0).toString())} />{loanId}</label>
                    </div>
                  </td>
                  <td>{data.get(1)}</td>
                  <td>{data.get(2)}</td>
                  <td>{data.get(3)}</td>
                  <td>{data.get(4)}</td>
                  <td>{data.get(5)}</td>
                </tr>
        })
      }
    </tbody>
    </table>

    {
      this.state.success == true ?  <div className="alertSuccess">  <strong>Success!</strong> {this.state.message}  </div>
    : this.state.success == false ? <div className="alertDanger">
        <strong>Failed!</strong> {this.state.message}
      </div>
      : null
    }

  <div className = 'checkOutButton'><button type = 'button' className = 'btn btn-primary' onClick={this.handleCheckin} disabled={this.state.loanId.length > 0 ? false : true}>Check In</button></div>

    </div>
       :<div className='noResults'><span>No results found</span></div> : this.state.isLoading == true ? <div className = 'loadingSearch'><span>Loading...</span></div> : null
    }
   </div>
 </div>
</div>
</div>
 }
}

CheckIn.propTypes = {
  setLoanSearchResult: React.PropTypes.func,
  searchLoanResult: React.PropTypes.object
}

const mapStateToProps = (state) => {
 return {
   searchLoanResult: state.getIn(['checkin','searchLoanResult'])
 };
}

const mapDispatchToProps = (dispatch) => {
 return {
   setLoanSearchResult: (searchLoanResult) => {
     dispatch(setLoanSearchResult(searchLoanResult));
   }
 };
}

export const CheckInContainer = connect(mapStateToProps,
 mapDispatchToProps)(CheckIn);
