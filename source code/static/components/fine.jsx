import React from 'react';
import { connect } from 'react-redux';
import {setFineData} from '../actionCreators/fines'
import ReactDOM from 'react-dom'

class Fine extends React.Component {
 constructor(props){
   super(props);
   this.state = {success:null,message:"",cardId:"",settleFineForCardId:false,loanId:[]}
   this.handleCalculateFines = this.handleCalculateFines.bind(this);
   this.handleSettleFines = this.handleSettleFines.bind(this);
   this.handleCardSelectionChange = this.handleCardSelectionChange.bind(this);
   this.refreshFinesData = this.refreshFinesData.bind(this);
   this.handleSettleFineForCardId = this.handleSettleFineForCardId.bind(this);
   this.handleCardInternalSelectionChange = this.handleCardInternalSelectionChange.bind(this);
   this.calculateFines = this.calculateFines.bind(this);
 }

 componentDidMount(){
   this.calculateFines();
 }

 componentWillUnmount(){
   this.props.setFineData(null)
 }

 handleCalculateFines(event){
   this.calculateFines();
 }

 calculateFines(){
   let calculateFineJson = {'isCalculateFine':true}
   $.ajax({
            url: 'http://localhost:5000/calculateFines',
            type: 'POST',
            data: JSON.stringify(calculateFineJson),
            success: function(response) {
                this.refreshFinesData()
            }.bind(this),
            error: function(error) {
            }.bind(this)
        });
 }

 refreshFinesData(){
   $.ajax({
            url: 'http://localhost:5000/fetchFines',
            type: 'POST',
            data: JSON.stringify({}),
            success: function(response) {
                this.props.setFineData(response);
            }.bind(this),
            error: function(error) {
            }.bind(this)
        });
 }

 handleCardSelectionChange(event){
   this.setState({cardId: event.target.value});
 }

 handleSettleFineForCardId(event){
   this.setState({settleFineForCardId: true})
   ReactDOM.findDOMNode(this.loanTable).scrollIntoView(true);
 }

 handleCardInternalSelectionChange(event){
   let newList = this.state.loanId
   if(this.state.loanId.includes(event.target.value.toString())){
     newList.pop(event.target.value)
   }
   else{
     newList.push(event.target.value)
   }
   this.setState({loanId: newList})
 }

 handleSettleFines(event){
   if(this.state.cardId){
     let settleFineJson = {loanId:this.state.loanId}
     $.ajax({
              url: 'http://localhost:5000/settleFines',
              type: 'POST',
              data: JSON.stringify(settleFineJson),
              success: function(response) {
                  this.setState({message:response.message,success:response.success})
                  this.refreshFinesData()
              }.bind(this),
              error: function(error) {
                  this.setState({message:response.message,success:response.success})
              }.bind(this)
          });
   }
 }

 render(){
   console.log(this.props.finesData)
   return <div className='fines'>
     <div className ='container-fluid'>
     <div className ='row-fluid'>
       <div className = 'col-md-12'>
         <div className='checkOutButton pull-right'><button className = 'btn btn-primary btn-sm' onClick={this.refreshFinesData}>Refresh Fines</button></div>
       </div>
     </div>
     <div className = 'row-fluid'>
       <div className = 'col-md-12'>
       {
         this.props.finesData ? this.props.finesData.get('aggregateData').size>0 ? <div className='isbnTable' ref={(input)=>{this.loanTable = input}}><table className="table defaultTable">
           <thead>
             <tr>
               <th scope="col">Card_id</th>
               <th scope="col">Name</th>
               <th scope="col">Total Fine</th>
             </tr>
           </thead>
           <tbody>
         {
           this.props.finesData.get('aggregateData').map((data,id) => {
                  let cardId = data.get(0)
                   return <tr key={cardId}>
                     <td scope="row">
                       <div className="radio">
                        <label><input type="radio" value={cardId} name="cardIdradio" onChange={this.handleCardSelectionChange} checked={cardId == this.state.cardId } />{'ID '+cardId}</label>
                       </div>
                     </td>
                     <td>{data.get(1)}</td>
                     <td>{data.get(2)}</td>
                   </tr>
           })
         }
       </tbody>
       </table>
       <br/>
       <button type = 'button' className = 'btn btn-primary' onClick={this.handleSettleFineForCardId} disabled={this.state.cardId.length>0 ? false : true}>Show Overdue Loans</button><br/><br/>

         {
           this.state.settleFineForCardId == true ? <div> <table className="table defaultTable">
             <thead>
               <tr>
                 <th scope="col">Loan_id</th>
                 <th scope="col">Name</th>
                 <th scope="col">Fine</th>
                 <th scope="col">Book Returned</th>
               </tr>
             </thead>
             <tbody>
           {
             this.props.finesData.get('finesDataForCardId').get(this.state.cardId).map((data,id) => {
                     return <tr key={data.get(0)}>
                       <td scope="row">
                         <div className="checkbox">
                          <label><input type="checkbox" value={data.get(0)} name="loanIdcheckbox" onChange={this.handleCardInternalSelectionChange} checked={this.state.loanId.includes(data.get(0).toString())} disabled={data.get(3)?false:true}/>{data.get(0)}</label>
                         </div>
                       </td>
                       <td>{data.get(1)}</td>
                       <td>{data.get(2)}</td>
                       <td>{data.get(3)?'Yes':'No'}</td>
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
         <div className='checkOutButton'><button type = 'button' className = 'btn btn-primary' onClick={this.handleSettleFines} disabled={this.state.loanId.length>0 ? false : true}>Settle</button></div>

         </div>
           : null
         }
          </div>
          : <div className='noResultsFine'><span>No results found</span></div> : <span>Loading...</span>

       }
     </div>
   </div>
 </div>
      </div>
    }
}

Fine.propTypes = {
  finesData: React.PropTypes.object
}

const mapStateToProps = (state) => {
 return {
   finesData: state.getIn(['fines','finesData'])
 };
}

const mapDispatchToProps = (dispatch) => {
 return {
   setFineData: (finesData) => {
     dispatch(setFineData(finesData))
   }
 };
}

export const FineContainer = connect(mapStateToProps,
 mapDispatchToProps)(Fine);
