import React from 'react';
import { connect } from 'react-redux';

class BorrowerManagement extends React.Component {
 constructor(props){
   super(props);
   this.state = {name: "",address:"",phone:"",ssn:"",message:"",success:null };
   this.handleNameChange = this.handleNameChange.bind(this);
   this.handleSsnChange = this.handleSsnChange.bind(this);
   this.handleAddressChange = this.handleAddressChange.bind(this);
   this.handlePhoneChange = this.handlePhoneChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }

 componentDidMount(){
 }

 componentDidUpdate(prevProps,prevState){
 }

 handleNameChange(event){
    this.setState({name: event.target.value});
 }

 handleSsnChange(event){
    this.setState({ssn: event.target.value});
 }

 handleAddressChange(event){
    this.setState({address: event.target.value});
 }

 handlePhoneChange(event){
    this.setState({phone: event.target.value});
 }

 handleSubmit(event){
   event.preventDefault()
   let borrowerData = this.state
   this.setState({message:'',success:null})
   this.setState({name: '',address:'',ssn:'',phone:''});
   $.ajax({
            url: 'http://localhost:5000/addBorrower',
            type: 'POST',
            data: JSON.stringify(borrowerData),
            success: function(response) {
                this.setState({message:response.message,success:response.success})
            }.bind(this),
            error: function(error) {
                this.setState({message:response.message,success:response.success})
            }.bind(this)
        });

 }

 render(){
   return <div className='borrowerManagement'>
     <div className = 'container-fluid'>

     <form onSubmit={this.handleSubmit} action = '#'>
       <div className = 'row-fluid'>
         <div className = 'col-md-6'>
       <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" id="name" placeholder="Enter name" value= {this.state.name} onChange={this.handleNameChange} required />
  </div>
</div>
</div>

  <div className = 'row-fluid'>
    <div className = 'col-md-6'>
  <div className="form-group">
    <label htmlFor="ssn">SSN</label>
    <input type="text" className="form-control" id="ssn" placeholder="Enter SSN" value= {this.state.ssn} onChange={this.handleSsnChange} pattern="^\d{9,9}$" title='SSN should have 9 digits only' required  />
    <small id="ssnHelp" className="form-text text-muted">We'll never share your ssn with anyone else.</small>
  </div>
</div>
</div>

  <div className = 'row-fluid'>
    <div className = 'col-md-6'>
  <div className="form-group">
    <label htmlFor="address">Address</label>
    <textarea className="form-control" id="address" rows="3" value= {this.state.address} placeholder="Enter address" onChange={this.handleAddressChange} required ></textarea>
  </div>
</div>
</div>

  <div className = 'row-fluid'>
    <div className = 'col-md-6'>
  <div className="form-group">
    <label htmlFor="phone">Phone</label>
    <input type="text" className="form-control" id="phone" placeholder="Enter phone number" value= {this.state.phone} onChange={this.handlePhoneChange} pattern="[0-9]{10}" title='phone number should be 10 digits'/>
  </div>
</div>
</div>
  {
    this.state.success == true ?  <div className="col-md-3 alertSuccess">  <strong>Success!</strong> {this.state.message}  </div>
  : this.state.success == false ? <div className="col-md-3 alertDanger">
      <strong>Failed!</strong> {this.state.message}
    </div>
    : null
  }
  <div className = 'row-fluid'>
    <div className = 'col-md-6'>
  <div className='checkOutButton'><button type="submit" className="btn btn-primary">Add</button></div>
  </div>
</div>

</form>
</div>
   </div>
 }
}

BorrowerManagement.propTypes = {
}

const mapStateToProps = (state) => {
 return {
 };
}

const mapDispatchToProps = (dispatch) => {
 return {
 };
}

export const BorrowerManagementContainer = connect(mapStateToProps,
 mapDispatchToProps)(BorrowerManagement);
