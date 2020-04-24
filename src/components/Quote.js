import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export class QuoteRender extends React.Component{

  constructor(props){
    super(props);
    this.state={currentSymbol:this.props.symbolGiven,startDate:this.props.startGiven,endDate:this.props.endGiven,loading:true,foundData:false}
  }

  async componentWillReceiveProps(props){
    this.setState({loading:true});

    this.setState({startDate:props.startGiven});
    this.setState({endDate:props.endGiven});

    const start = encodeURIComponent(this.state.startDate.toISOString())
    const end = encodeURIComponent(this.state.endDate.toISOString())

    const url = `http://131.181.190.87:3000/stocks/authed/${props.currentSymbol}?from=${start}&to=${end}`;
    console.log(url);


    const responce = await fetch(url,{
      headers:{
        Authorization: "Bearer " + this.props.token,
      },})
    
      const data = await responce.json();

      console.log(data);
    
  }




  render(){
    return(
      <div>hi</div>
    );
    
  }
  
}

export class QuoteSearch extends React.Component{




    state={loading:false,startDate:new Date(),endDate:new Date(),searchTerm:"",quoteData:[]};
 
    handleChange = date => {
      console.log(encodeURIComponent(date.toISOString()))
      this.setState({
        startDate: date
      });
    };

    handleChange1 = date => {
      console.log(encodeURIComponent(date.toISOString()))
      this.setState({
        endDate: date
      });
    };




render(){
return(
<div>
  <p>bulding search key:{this.props.authToken}</p>
<DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
<DatePicker
        selected={this.state.endDate}
        onChange={this.handleChange1}
      />

        <label htmlFor="name">Stock Symbol&nbsp;</label>
        <input type="text" id="name" name="name" value={this.state.searchTerm} onChange={(event) => {

            const x = event.target.value.trim().toUpperCase().slice(0,5);
            console.log(x);
            
            if(/[0-9]/.test(x)){
                this.setState({error:"no numbers"});
            }else{
                this.setState({error:null});
            }
            this.setState({searchTerm:x});


        }} />

        <QuoteRender currentSymbol={this.state.searchTerm}startGiven={this.state.startDate}endGiven={this.state.endDate} token={this.props.authToken}></QuoteRender>
</div>




);
}

}
