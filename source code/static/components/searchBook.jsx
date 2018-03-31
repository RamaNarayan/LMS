import React from 'react';
import { connect } from 'react-redux';
import { setSearchResult } from '../actionCreators/searchBook'

class SearchBook extends React.Component {
 constructor(props){
   super(props);
   this.state = {isbn:null,checkout:false,borrowerId:'',success:null,message:'',searchQuery:'',isLoading:false};
   this.handleSearch = this.handleSearch.bind(this);
   this.handleCheckout = this.handleCheckout.bind(this);
   this.handleSelectionChange = this.handleSelectionChange.bind(this);
   this.handleBorrowerId = this.handleBorrowerId.bind(this);
   this.refreshSearch = this.refreshSearch.bind(this);
 }

 componentWillUnmount(){
   this.props.setSearchResult(null)
 }

 handleSearch(event){
   this.setState({isbn:null,checkout:false,borrowerId:'',success:null,message:''});
   let bool = event.target.name == 'searchBook' ? this.searchInput.value.length > 0 && event.which == 13 : this.searchInput.value.length > 0
   if(bool){
     this.props.setSearchResult(null)
     this.setState({isLoading:true})
     this.setState({searchQuery:this.searchInput.value})
     let searchJson = {'searchQuery': this.searchInput.value};
     $.ajax({
              url: 'http://localhost:5000/searchBook',
              type: 'POST',
              data: JSON.stringify(searchJson),
              success: function(response) {
                  this.props.setSearchResult(response)
                  this.setState({isLoading:false})
              }.bind(this),
              error: function(error) {
                this.setState({isLoading:false})
              }.bind(this)
          });
   }
   else{
     this.props.setSearchResult(null)
   }
 }

 refreshSearch(searchQuery){
   this.setState({isLoading:true})
   let searchJson = {'searchQuery': searchQuery};
   $.ajax({
            url: 'http://localhost:5000/searchBook',
            type: 'POST',
            data: JSON.stringify(searchJson),
            success: function(response) {
                this.props.setSearchResult(response)
                this.setState({isLoading:false})
            }.bind(this),
            error: function(error) {
              this.setState({isLoading:false})
            }.bind(this)
        });
  }

 handleCheckout(event){
   if(this.state.isbn && this.state.borrowerId.length>0){
     let checkoutJson = {'isbn':this.state.isbn,borrowerId:this.state.borrowerId.toUpperCase()}
     $.ajax({
              url: 'http://localhost:5000/checkoutBook',
              type: 'POST',
              data: JSON.stringify(checkoutJson),
              success: function(response) {
                  this.setState({isbn:null,checkout:false,borrowerId:''});
                  this.setState({message:response.message,success:response.success})
                  this.refreshSearch(this.state.searchQuery)
              }.bind(this),
              error: function(error) {
                  this.setState({isbn:null,checkout:false,borrowerId:''});
                  this.setState({message:response.message,success:response.success})
                  this.refreshSearch(this.state.searchQuery)
              }.bind(this)
          });
   }
   else{
     alert('card id cannot be null')
   }
 }

 handleSelectionChange(event){
   this.setState({isbn: event.target.value});
 }

 handleBorrowerId(event){
   this.setState({borrowerId: event.target.value});
 }

 render(){
   let bookSearchClassName = this.props.searchResult ? 'afterResult' : 'bookSearchBox'
   return <div className='searchBook'>
    <div className = 'container-fluid'>
    <div className ='row-fluid'>
      <div className ='col-md-6'>
    <div className={"input-group "+bookSearchClassName}>
     <input type="text" className="form-control" placeholder="enter keywords to search" name='searchBook' ref={(input)=>{this.searchInput=input}} onKeyPress = {this.handleSearch} / >
       <span className="input-group-btn">
         <button className="btn btn-primary" name ='goBook' type="button" onClick={this.handleSearch}> Go </button>
       </span>
    </div>
    </div>
    </div>
    <div className ='row-fluid'>
      <div className = 'col-md-12'>
    {
      this.props.searchResult ? this.props.searchResult.get('searchResult') ? <div className='isbnTable'><table className="table defaultTable">

        <thead>
          <tr>
            <th scope="col">ISBN</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Availability</th>
          </tr>
        </thead>
        <tbody>
      {
        this.props.searchResult.get('searchResult').map((data,id) => {
                let isbn = data.get(0)
                return <tr key={isbn}>
                  <td scope="row" width="11%">
                    <div className="radio">
                     <label><input type="radio" value={isbn} name="isbnradio" onChange={this.handleSelectionChange} checked={this.state.isbn == isbn} disabled={data.get(3)==1} />{isbn}</label>
                    </div>
                  </td>
                  <td>{data.get(1)}</td>
                  <td>{data.get(2)}</td>
                  <td>{data.get(3)?'No':'Yes'}</td>
                </tr>
        })
      }
    </tbody>
    </table>
    <label htmlFor="borrowerId">Card Id</label>
    <input type="text" title='select a book to check out and enter card id' className="form-control col-md-3" id="borrowerId" placeholder="Enter card id" value= {this.state.borrowerId} onChange={this.handleBorrowerId} disabled={!this.state.isbn ? true : false} required  />

      {
          this.state.success == true ?  <div className="alertSuccess">  <strong>Success!</strong> {this.state.message}  </div>
        : this.state.success == false ? <div className="alertDanger">
            <strong>Failed!</strong> {this.state.message}
          </div>
          : null
        }

    <div className='checkOutButton'><button type = 'button' className = 'btn btn-primary' onClick={this.handleCheckout} disabled={this.state.borrowerId.length > 0 ? false : true}>Check-out</button></div>


      </div>

       : <div className='noResults'><span>No results found</span></div> : this.state.isLoading == true ?<div className='loadingSearch'> <span>Loading...</span> </div>:null
    }
  </div>
  </div>
   </div>
 </div>
 }
}

SearchBook.propTypes = {
  setSearchResult: React.PropTypes.func,
  searchResult: React.PropTypes.object
}

const mapStateToProps = (state) => {
 return {
   searchResult: state.getIn(['searchBook','searchResult'])
 };
}

const mapDispatchToProps = (dispatch) => {
 return {
   setSearchResult: (searchResult) => {
     dispatch(setSearchResult(searchResult));
   }
 };
}

export const SearchBookContainer = connect(mapStateToProps,
 mapDispatchToProps)(SearchBook);
